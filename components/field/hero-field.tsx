'use client';

import { useEffect, useRef, type RefObject } from 'react';
import Image from 'next/image';
import s from './field.module.css';

interface Zergling {
  el: HTMLImageElement;
  i: number;
  x: number;
  vx: number;
  z: number;
  vz: number;
  w: number;
  h: number;
  phase: number;
  cool: number;
  flee: number;
  fleeT: number;
  hitT: number;
  flashOn: boolean;
  face: number;
  off: number;
}

interface HeroFieldProps {
  heroRef: RefObject<HTMLElement | null>;
  frameRef: RefObject<HTMLElement | null>;
}

/* Marching-squares lookup: for each cell corner pattern, the pairs of edges (0 top, 1 right, 2 bottom, 3 left) a contour joins. */
const SEG: Array<number[] | null> = [null, [3, 2], [2, 1], [3, 1], [0, 1], [0, 3, 2, 1], [0, 2], [0, 3], [0, 3], [0, 2], [0, 1, 3, 2], [0, 1], [3, 1], [2, 1], [3, 2], null];

const SVG_NS = 'http://www.w3.org/2000/svg';
const GRAVITY = 900;
const CELL = 16;
const STEP = 0.2;
/* Where the rifle tip sits on the marine sprite, as a share of its size, and the resting angle of the sprite. */
const MUZZLE = { x: 0.012, y: 0.336, rest: -0.297 };

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * Contour lines that bend around the cursor, plus a marine and three zerglings on the hero floor.
 * Everything is drawn imperatively from one requestAnimationFrame loop that sleeps while the hero is off screen.
 */
export function HeroField({ heroRef, frameRef }: HeroFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const crittersRef = useRef<HTMLDivElement>(null);
  const marineRef = useRef<HTMLImageElement>(null);
  const shotsRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const frameEl = frameRef.current;
    const cv = canvasRef.current;
    const critters = crittersRef.current;
    const marine = marineRef.current;
    const shots = shotsRef.current;
    const cx = cv?.getContext('2d');
    if (!hero || !frameEl || !cv || !critters || !marine || !shots || !cx) return;

    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timers = new Set<ReturnType<typeof setTimeout>>();

    /* ---------- contour field ---------- */
    let CW = 0;
    let CH = 0;
    let DPR = 1;
    let nodes = new Float32Array(0);
    let staticDirty = true;
    let fieldRGB = [95, 208, 220];
    const ptr = { x: -999, y: -999, sx: 0, sy: 0, amp: 0, in: false, overPhoto: false };

    function readTheme() {
      const f = getComputedStyle(document.documentElement).getPropertyValue('--f-field').trim().split(/\s+/).map(Number);
      if (f.length === 3 && f.every((n) => !isNaN(n))) fieldRGB = f;
      staticDirty = true;
    }

    function sizeContours() {
      const r = hero!.getBoundingClientRect();
      DPR = Math.min(1.5, devicePixelRatio || 1);
      CW = r.width;
      CH = r.height;
      cv!.width = Math.round(CW * DPR);
      cv!.height = Math.round(CH * DPR);
      nodes = new Float32Array((Math.ceil(CW / CELL) + 1) * (Math.ceil(CH / CELL) + 1));
      staticDirty = true;
    }

    function field(x: number, y: number, t: number) {
      let v =
        0.55 * Math.sin(x * 0.0042 + t * 0.1) +
        0.5 * Math.sin(y * 0.0055 - x * 0.0016 + t * 0.08 + 1.3) +
        0.35 * Math.sin((x + y) * 0.0031 + 2.1 - t * 0.06) +
        0.22 * Math.sin(x * 0.011 - y * 0.008 + 0.7);
      if (ptr.amp > 0.01) {
        const dx = x - ptr.sx;
        const dy = y - ptr.sy;
        v += 1.5 * ptr.amp * Math.exp(-(dx * dx + dy * dy) / (2 * 150 * 150));
      }
      return v;
    }

    let px = 0;
    let py = 0;
    function edge(e: number, x0: number, y0: number, tl: number, tr: number, br: number, bl: number, L: number) {
      if (e === 0) { px = x0 + (CELL * (L - tl)) / (tr - tl); py = y0; }
      else if (e === 1) { px = x0 + CELL; py = y0 + (CELL * (L - tr)) / (br - tr); }
      else if (e === 2) { px = x0 + (CELL * (L - bl)) / (br - bl); py = y0 + CELL; }
      else { px = x0; py = y0 + (CELL * (L - tl)) / (bl - tl); }
    }

    /* One pass over the cells; each cell only visits the levels it crosses. Two Path2D objects, two strokes. */
    function drawContours(t: number) {
      if (!CW) return;
      if (ptr.in) {
        ptr.sx = lerp(ptr.sx, ptr.x, 0.25);
        ptr.sy = lerp(ptr.sy, ptr.y, 0.25);
      }
      ptr.amp = lerp(ptr.amp, ptr.in && !ptr.overPhoto ? 1 : 0, 0.12);
      const C = Math.ceil(CW / CELL) + 1;
      const R = Math.ceil(CH / CELL) + 1;
      const n = nodes;
      for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) n[r * C + c] = field(c * CELL, r * CELL, t);
      const pN = new Path2D();
      const pI = new Path2D();
      for (let rr = 0; rr < R - 1; rr++) {
        for (let cc = 0; cc < C - 1; cc++) {
          const tl = n[rr * C + cc];
          const tr = n[rr * C + cc + 1];
          const br = n[(rr + 1) * C + cc + 1];
          const bl = n[(rr + 1) * C + cc];
          const l0 = Math.ceil(Math.min(tl, tr, br, bl) / STEP);
          const l1 = Math.floor(Math.max(tl, tr, br, bl) / STEP);
          const x0 = cc * CELL;
          const y0 = rr * CELL;
          for (let li = l0; li <= l1; li++) {
            const L = li * STEP;
            const k = (tl > L ? 8 : 0) | (tr > L ? 4 : 0) | (br > L ? 2 : 0) | (bl > L ? 1 : 0);
            const seg = SEG[k];
            if (!seg) continue;
            const P = ((li % 5) + 5) % 5 === 0 ? pI : pN;
            for (let m = 0; m < seg.length; m += 2) {
              edge(seg[m], x0, y0, tl, tr, br, bl, L);
              P.moveTo(px, py);
              edge(seg[m + 1], x0, y0, tl, tr, br, bl, L);
              P.lineTo(px, py);
            }
          }
        }
      }
      cx!.setTransform(DPR, 0, 0, DPR, 0, 0);
      cx!.clearRect(0, 0, CW, CH);
      cx!.lineJoin = 'round';
      const rgb = Math.round(fieldRGB[0]) + ',' + Math.round(fieldRGB[1]) + ',' + Math.round(fieldRGB[2]);
      cx!.strokeStyle = 'rgba(' + rgb + ',.11)';
      cx!.lineWidth = 0.8;
      cx!.stroke(pN);
      cx!.strokeStyle = 'rgba(' + rgb + ',.26)';
      cx!.lineWidth = 1.2;
      cx!.stroke(pI);
    }

    function onPointerMove(e: PointerEvent) {
      const r = hero!.getBoundingClientRect();
      const was = ptr.in;
      ptr.in = e.clientY >= r.top && e.clientY <= r.bottom && e.clientX >= r.left && e.clientX <= r.right;
      if (ptr.in) {
        ptr.x = e.clientX - r.left;
        ptr.y = e.clientY - r.top;
        if (!was) { ptr.sx = ptr.x; ptr.sy = ptr.y; }
        const fr = frameEl!.getBoundingClientRect();
        ptr.overPhoto = e.clientX >= fr.left && e.clientX <= fr.right && e.clientY >= fr.top && e.clientY <= fr.bottom;
      }
    }
    function onPointerLeave() { ptr.in = false; }

    /* ---------- marine and zerglings ---------- */
    let HW = 0;
    let HH = 0;
    const Z: Zergling[] = Array.from(critters.querySelectorAll<HTMLImageElement>('[data-zl]')).map((el, i) => ({
      el, i, x: 0, vx: 0, z: 0, vz: 0, w: 0, h: 0, phase: Math.random() * 6, cool: 1 + Math.random() * 1.5,
      flee: 0, fleeT: 0, hitT: 0, flashOn: false, face: 1, off: [-72, 0, 72][i] ?? 0,
    }));
    const M = { x: 0, w: 0, h: 0, a: 0, recoil: 0 };
    const homeX = (z: Zergling) => Math.max(70, HW - 64 - z.i * 84);

    function sizeCritters() {
      const first = HW === 0;
      HW = hero!.clientWidth;
      HH = hero!.clientHeight;
      Z.forEach((z) => {
        z.w = z.el.offsetWidth;
        z.h = z.el.offsetHeight;
        if (first) z.x = homeX(z);
        z.x = clamp(z.x, z.w / 2, HW - z.w / 2);
      });
      M.w = marine!.offsetWidth;
      M.h = marine!.offsetHeight;
      M.x = Math.max(16, (HW - 1200) / 2 + 16) + M.w / 2;
    }

    /* Screen position of the rifle tip. The sprite is drawn as translate(T) rotate(a) scaleX(-1) about origin (50%, 66%),
       so the tip is found by mirroring, rotating and translating the same way. */
    function muzzle() {
      const ox = M.w * 0.5;
      const oy = M.h * 0.66;
      const dx = -(MUZZLE.x * M.w - ox);
      const dy = MUZZLE.y * M.h - oy;
      const ca = Math.cos(M.a);
      const sa = Math.sin(M.a);
      return { x: ox + (M.x - M.w / 2 - M.recoil) + ca * dx - sa * dy, y: oy + (HH - M.h) + sa * dx + ca * dy };
    }

    function stepCritters(dt: number, t: number) {
      if (!HW) return;
      const inHero = ptr.in && !reduce;
      Z.forEach((z) => {
        let desired: number;
        if (z.hitT > 0) z.hitT = Math.max(0, z.hitT - dt);
        if (z.fleeT > 0) {
          z.fleeT -= dt;
          desired = z.flee * 430;
        } else {
          const target = inHero ? clamp(ptr.x + z.off, z.w / 2, HW - z.w / 2) : homeX(z);
          const dx = target - z.x;
          const max = inHero ? 300 : 120;
          desired = Math.abs(dx) < 6 ? 0 : clamp(dx * 3.2, -max, max);
        }
        if (reduce) desired = 0;
        z.vx += (desired - z.vx) * Math.min(1, dt * 9);
        z.x = clamp(z.x + z.vx * dt, z.w / 2, HW - z.w / 2);
        if (Math.abs(z.vx) > 25) z.face = z.vx > 0 ? -1 : 1;
        const running = Math.abs(z.vx) > 25 && z.z <= 0.01;
        if (running) z.phase += dt * Math.abs(z.vx) * 0.05;
        const hop = running ? Math.abs(Math.sin(z.phase)) * 6 : 0;
        z.cool -= dt;
        if (inHero && z.cool <= 0 && z.z <= 0.01 && Math.abs(ptr.x - z.x) < 110 && ptr.y < HH - 90) {
          z.vz = Math.sqrt(2 * GRAVITY * Math.min(36, (HH - ptr.y) * 0.3));
          z.cool = 1.3 + Math.random() * 1.2;
        }
        z.vz -= GRAVITY * dt;
        z.z += z.vz * dt;
        if (z.z < 0) { z.z = 0; if (z.vz < 0) z.vz = 0; }
        let sy = z.z > 0.5 ? 1 + Math.min(0.08, Math.abs(z.vz) / 1800) : Math.abs(z.vx) > 25 ? 1 : 1 + 0.025 * Math.sin(t * 2.2 + z.i * 1.7);
        let sx = 1;
        let shake = 0;
        if (z.hitT > 0) { sy = 0.86; sx = 1.12; shake = Math.sin(t * 90) * 3 * (z.hitT / 0.34); }
        const flash = z.hitT > 0.22;
        if (flash !== z.flashOn) { z.flashOn = flash; z.el.classList.toggle(s.flash, flash); }
        z.el.style.transform = 'translate3d(' + (z.x - z.w / 2 + shake).toFixed(1) + 'px,' + (HH - z.h - z.z - hop).toFixed(1) + 'px,0) scale(' + (z.face * sx).toFixed(3) + ',' + sy.toFixed(3) + ')';
      });
      const mu = muzzle();
      let ang = -MUZZLE.rest;
      if (inHero && ptr.x - mu.x > 40) ang = clamp(Math.atan2(ptr.y - mu.y, ptr.x - mu.x), -0.6, 0.6) - MUZZLE.rest;
      M.a = lerp(M.a, ang, 1 - Math.exp(-dt * 8));
      M.recoil *= Math.exp(-dt * 14);
      marine!.style.transform = 'translate3d(' + (M.x - M.w / 2 - M.recoil).toFixed(1) + 'px,' + (HH - M.h).toFixed(1) + 'px,0) rotate(' + M.a.toFixed(3) + 'rad) scaleX(-1)';
    }

    function mk(tag: string, cls: string, attrs: Record<string, string | number>, life: number) {
      const el = document.createElementNS(SVG_NS, tag);
      el.setAttribute('class', cls);
      for (const k in attrs) el.setAttribute(k, String(attrs[k]));
      shots!.appendChild(el);
      const id = setTimeout(() => { el.remove(); timers.delete(id); }, life);
      timers.add(id);
    }

    function fire(cxp: number, cyp: number) {
      const mu = muzzle();
      mk('line', s.shot, { x1: mu.x, y1: mu.y, x2: cxp, y2: cyp }, 300);
      mk('circle', s.muzzle, { cx: mu.x, cy: mu.y, r: 6 }, 220);
      mk('circle', s.hit, { cx: cxp, cy: cyp, r: 14 }, 460);
      M.recoil = 7;
      let best: Zergling | undefined;
      let bd = 1e9;
      for (const z of Z) {
        const d = Math.hypot(z.x - cxp, HH - z.h / 2 - z.z - cyp);
        if (d < bd) { bd = d; best = z; }
      }
      Z.forEach((z) => {
        if (z === best && bd < 160) {
          z.hitT = 0.34; z.flee = 1; z.fleeT = 0.7; z.vx = 520;
          if (z.z <= 0.01) z.vz = 300;
          const zx = z.x;
          const zy = HH - z.h / 2 - z.z;
          for (let i = 0; i < 8; i++) {
            const a = Math.random() * Math.PI * 2;
            const d = 26 + Math.random() * 34;
            mk('circle', s.spark, { cx: zx, cy: zy, r: 2 + Math.random() * 2, style: '--dx:' + (Math.cos(a) * d).toFixed(0) + 'px;--dy:' + (Math.sin(a) * d - 10).toFixed(0) + 'px' }, 600);
          }
        } else if (Math.abs(z.x - cxp) < 320) {
          z.flee = z.x >= cxp ? 1 : -1;
          z.fleeT = 0.45;
          if (z.z <= 0.01) z.vz = 170 + Math.random() * 60;
        }
      });
    }

    function onPointerDown(e: PointerEvent) {
      if (reduce || e.button > 0 || (e.target as Element).closest('a,button,figure')) return;
      const r = hero!.getBoundingClientRect();
      fire(e.clientX - r.left, e.clientY - r.top);
    }

    /* ---------- main loop ---------- */
    let heroVisible = true;
    let lastC = 0;
    let lastF = 0;
    let raf = 0;
    function loop(ms: number) {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(0.05, (ms - lastF) / 1000);
      lastF = ms;
      if (!heroVisible) return;
      if (reduce) {
        if (staticDirty) { staticDirty = false; drawContours(3); }
      } else if (ptr.in || ptr.amp > 0.012 || staticDirty || ms - lastC > 120) {
        lastC = ms;
        staticDirty = false;
        drawContours(ms / 1000);
      }
      stepCritters(dt, ms / 1000);
    }

    function sizeAll() { sizeContours(); sizeCritters(); }

    const io = new IntersectionObserver((en) => { heroVisible = en[0].isIntersecting; }, { threshold: 0 });
    io.observe(hero);
    const ro = new ResizeObserver(sizeAll);
    ro.observe(hero);
    const themeObserver = new MutationObserver(readTheme);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    addEventListener('pointermove', onPointerMove, { passive: true });
    hero.addEventListener('pointerleave', onPointerLeave);
    hero.addEventListener('pointerdown', onPointerDown);
    const sprites = Array.from(critters.querySelectorAll('img'));
    sprites.forEach((im) => { if (!im.complete) im.addEventListener('load', sizeCritters); });
    document.fonts?.ready.then(sizeAll);

    readTheme();
    sizeAll();
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      themeObserver.disconnect();
      removeEventListener('pointermove', onPointerMove);
      hero.removeEventListener('pointerleave', onPointerLeave);
      hero.removeEventListener('pointerdown', onPointerDown);
      sprites.forEach((im) => im.removeEventListener('load', sizeCritters));
      timers.forEach(clearTimeout);
    };
  }, [heroRef, frameRef]);

  return (
    <>
      <canvas ref={canvasRef} className={s.contours} aria-hidden="true" />
      <div ref={crittersRef} className={s.critters} aria-hidden="true">
        <Image className={`${s.zl} ${s.z0}`} data-zl="" src="/field/z1.png" alt="" width={260} height={230} draggable={false} />
        <Image className={`${s.zl} ${s.z1}`} data-zl="" src="/field/z2.png" alt="" width={260} height={241} draggable={false} />
        <Image className={`${s.zl} ${s.z2}`} data-zl="" src="/field/z3.png" alt="" width={260} height={336} draggable={false} />
        <Image ref={marineRef} className={s.marine} src="/field/marine.png" alt="" width={420} height={435} draggable={false} />
      </div>
      <svg ref={shotsRef} className={s.shots} aria-hidden="true" />
    </>
  );
}
