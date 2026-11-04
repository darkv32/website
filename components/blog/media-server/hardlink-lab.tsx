'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { CAPS, MOMENTS, MOMENT_TITLES } from './data';
import { Rich } from './rich';
import styles from './media-server.module.css';

const GB = 4;
const SCALE_GB = 10;

export function HardlinkLab() {
  const [step, setStep] = useState(0);
  const [same, setSame] = useState(true);

  const m = MOMENTS[step];
  const names = m.dl + m.lib;
  const hasData1 = same ? m.dl || m.lib : m.dl;
  const hasData2 = !same && m.lib;
  const used1 = same ? (hasData1 ? GB : 0) : m.dl * GB;
  const used2 = same ? 0 : m.lib * GB;
  const off = (v: unknown) => !v && styles.off;

  return (
    <div className={styles.try}>
      <div className={styles.tag}><span>Try it · one download, four moments</span><span>moment {step + 1} of {MOMENTS.length}</span></div>
      <div className={styles.body}>
        <div className={styles.hlTop}>
          <div className={styles.seg} role="group" aria-label="Mount layout">
            <button type="button" aria-pressed={same} onClick={() => setSame(true)}>Same /data mount</button>
            <button type="button" aria-pressed={!same} onClick={() => setSame(false)}>Separate mounts</button>
          </div>
        </div>
        <div className={styles.tabs} role="group" aria-label="Moment">
          {MOMENT_TITLES.map((title, i) => (
            <button key={title} type="button" aria-pressed={step === i} onClick={() => setStep(i)}>{i + 1} · {title}</button>
          ))}
        </div>

        <svg className={styles.hlsvg} viewBox="0 0 560 250" role="img" aria-label="File names on the left pointing at file data on the drive on the right">
          <text className={styles.rlab} x="16" y="26">DOWNLOADS FOLDER</text>
          <text className={styles.rlab} x="16" y="154">LIBRARY FOLDER</text>

          <rect className={cn(styles.region, off(same))} x="304" y="14" width="236" height="222" />
          <text className={cn(styles.rlab, off(same))} x="316" y="228">ONE MOUNT · /DATA</text>
          <rect className={cn(styles.region, off(!same))} x="304" y="14" width="236" height="100" />
          <text className={cn(styles.rlab, off(!same))} x="316" y="106">MOUNT A</text>
          <rect className={cn(styles.region, off(!same))} x="304" y="134" width="236" height="102" />
          <text className={cn(styles.rlab, off(!same))} x="316" y="228">MOUNT B</text>

          <path className={cn(styles.ln, off(m.dl && hasData1))} d="M252 54 H316" />
          <path className={cn(styles.ln, off(same && m.lib))} d="M252 182 C284 182 284 74 316 74" />
          <path className={cn(styles.ln, off(!same && m.lib))} d="M252 182 H316" />

          <g className={cn(styles.fname, !m.dl && styles.gone)}><rect x="16" y="34" width="236" height="40" /><text x="30" y="58">/data/downloads/movie.mkv</text></g>
          <g className={cn(styles.fname, !m.lib && styles.gone)}><rect x="16" y="162" width="236" height="40" /><text x="30" y="186">/data/media/movies/movie.mkv</text></g>

          <g className={cn(styles.blk, off(hasData1))}>
            <rect x="320" y="22" width="200" height="64" />
            <text className={styles.bn} x="336" y="50">movie.mkv</text>
            <text className={styles.bs} x="336" y="70">{GB} GB · {same && names === 2 ? '2 names, 1 file' : '1 name'}</text>
          </g>
          <g className={cn(styles.blk, styles.blk2, off(hasData2))}>
            <rect x="320" y="150" width="200" height="64" />
            <text className={styles.bn} x="336" y="178">movie.mkv (copy)</text>
            <text className={styles.bs} x="336" y="198">{GB} GB · 1 name</text>
          </g>
        </svg>

        <div className={styles.disk}>
          <span className={styles.label}>Disk used by this movie</span>
          <div className={styles.track} role="img" aria-label={`${used1 + used2} gigabytes used`}>
            <div className={styles.seg1} style={{ width: `${(used1 / SCALE_GB) * 100}%` }} />
            <div className={styles.seg2} style={{ width: `${(used2 / SCALE_GB) * 100}%` }} />
          </div>
          <div className={styles.nums}><span><strong>{used1 + used2} GB</strong> used</span><span>scale 0 to {SCALE_GB} GB</span></div>
        </div>
        <p className={styles.cap} aria-live="polite"><Rich text={CAPS[step][same ? 0 : 1]} /></p>
      </div>
    </div>
  );
}
