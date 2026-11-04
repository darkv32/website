'use client';

import { useEffect, useId, useState, type KeyboardEvent, type MouseEvent } from 'react';
import { cn } from '@/lib/utils';
import { CopyButton } from './copy-button';
import { EDGES, JOURNEY, MAP_ROWS, NODES, PI_IP, type NodeId } from './data';
import { EDGE_GEOMETRY } from './geometry';
import { Rich } from './rich';
import styles from './media-server.module.css';

type View = { kind: 'all' } | { kind: 'journey'; step: number } | { kind: 'app'; id: NodeId };

const NODE_IDS = Object.keys(NODES) as NodeId[];
const LAST_STEP = JOURNEY.length - 1;
const edgesOf = (id: NodeId) => EDGES.filter((e) => e.from === id || e.to === id);

/** Which boxes and arrows each view lights up. */
function describe(view: View) {
  const litNodes = new Set<NodeId>();
  const relNodes = new Set<NodeId>();
  const litEdges = new Set<string>();
  let hot: Set<NodeId>;

  if (view.kind === 'journey') {
    JOURNEY[view.step].nodes.forEach((n) => litNodes.add(n));
    JOURNEY[view.step].edges.forEach((e) => litEdges.add(e));
    hot = litNodes;
  } else if (view.kind === 'app') {
    for (const e of edgesOf(view.id)) {
      litEdges.add(e.id);
      relNodes.add(e.from === view.id ? e.to : e.from);
    }
    /* The drive has no arrows of its own: tapping it lights every app that uses it, and tapping one of those lights the drive. */
    if (view.id === 'drive') NODE_IDS.forEach((id) => NODES[id].disk && relNodes.add(id));
    else if (NODES[view.id].disk) relNodes.add('drive');
    hot = new Set([view.id, ...relNodes]);
  } else {
    hot = new Set(NODE_IDS);
  }
  return { litNodes, relNodes, litEdges, hot };
}

export function StackMap() {
  const uid = useId().replace(/:/g, '');
  const [view, setView] = useState<View>({ kind: 'all' });
  const [playing, setPlaying] = useState(false);
  const step = view.kind === 'journey' ? view.step : 0;

  /* Autoplay: hold each step, then move on; stop at the end. */
  useEffect(() => {
    if (!playing || view.kind !== 'journey') return;
    const timer = setTimeout(() => {
      if (view.step >= LAST_STEP) setPlaying(false);
      else setView({ kind: 'journey', step: view.step + 1 });
    }, 2600);
    return () => clearTimeout(timer);
  }, [playing, view]);

  const goStep = (i: number) => setView({ kind: 'journey', step: (i + JOURNEY.length) % JOURNEY.length });
  const pick = (id: NodeId) => { setPlaying(false); setView({ kind: 'app', id }); };
  const overview = () => { setPlaying(false); setView({ kind: 'all' }); };

  const { litNodes, relNodes, litEdges, hot } = describe(view);
  const all = view.kind === 'all';

  const onSvgClick = (e: MouseEvent<SVGSVGElement>) => {
    if (!(e.target as Element).closest('[data-node]')) overview();
  };
  const onNodeKey = (e: KeyboardEvent, id: NodeId) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(id); }
  };

  const state = view.kind === 'all' ? 'Overview' : view.kind === 'journey' ? `Journey · step ${view.step + 1} of ${JOURNEY.length}` : `App · ${NODES[view.id].name}`;

  return (
    <div className={styles.try}>
      <div className={styles.tag}><span>Try it · stack map</span><span>{state}</span></div>
      <div className={styles.body}>
        <div className={styles.stack}>
          <svg className={styles.gsvg} viewBox="0 0 560 590" role="group" aria-label="Map of the nine apps, the drive and how they connect" onClick={onSvgClick}>
            <defs>
              <marker id={`${uid}-arr`} viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto-start-reverse"><path className={styles.mk} d="M0 1 L9 5 L0 9 z" /></marker>
              <marker id={`${uid}-arrOn`} viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="13" markerHeight="13" orient="auto-start-reverse"><path className={cn(styles.mk, styles.mkOn)} d="M0 1 L9 5 L0 9 z" /></marker>
            </defs>

            <g>
              {MAP_ROWS.map(([label, y]) => <text key={label} x={22} y={y} className={styles.rowlab}>{label}</text>)}
              <rect x={22} y={562} width={11} height={11} className={styles.dbadge} />
              <text x={40} y={571} className={styles.rowlab}>TOUCHES THE DRIVE</text>
              <rect x={200} y={562} width={11} height={11} className={styles.optkey} />
              <text x={218} y={571} className={styles.rowlab}>OPTIONAL EXTRA</text>
            </g>

            {/* The grey line for every arrow, then an accent copy that fades in over it so line and arrowhead change colour together. */}
            <g>
              {EDGES.map((e) => {
                const on = litEdges.has(e.id);
                const dim = all ? !e.main : !on;
                return <path key={e.id} d={EDGE_GEOMETRY[e.id].d} markerEnd={`url(#${uid}-arr)`} className={cn(styles.edge, e.main && styles.main, dim && styles.dim)} />;
              })}
            </g>
            <g>
              {EDGES.map((e) => (
                <path key={e.id} d={EDGE_GEOMETRY[e.id].d} markerEnd={`url(#${uid}-arrOn)`} className={cn(styles.edge, styles.hi, !all && litEdges.has(e.id) && styles.on)} />
              ))}
            </g>

            <g>
              {NODE_IDS.map((id) => {
                const n = NODES[id];
                const selected = view.kind === 'app' && view.id === id;
                return (
                  <g
                    key={id}
                    data-node
                    tabIndex={0}
                    role="button"
                    aria-label={`${n.name}, ${n.role}`}
                    aria-pressed={selected}
                    className={cn(styles.node, n.store && styles.store, n.opt && styles.opt, view.kind === 'journey' && litNodes.has(id) && styles.lit, view.kind === 'app' && relNodes.has(id) && styles.rel, selected && styles.sel, !hot.has(id) && styles.dimNode)}
                    onClick={() => pick(id)}
                    onKeyDown={(e) => onNodeKey(e, id)}
                  >
                    <rect x={n.x - n.w / 2} y={n.y - n.h / 2} width={n.w} height={n.h} />
                    <text x={n.x} y={n.y - 2} className={styles.n1}>{n.name}</text>
                    <text x={n.x} y={n.y + 14} className={styles.n2}>{n.sub ?? `:${n.port}`}</text>
                    {n.disk && <rect x={n.x + n.w / 2 - 10} y={n.y + n.h / 2 - 6} width={12} height={12} className={styles.dbadge} />}
                  </g>
                );
              })}
            </g>

            <g>
              {EDGES.map((e) => {
                const g = EDGE_GEOMETRY[e.id];
                const show = all ? !!e.main : litEdges.has(e.id);
                return <text key={e.id} x={g.lx} y={g.ly} style={{ textAnchor: g.anchor }} className={cn(styles.elab, show && styles.on, all && styles.soft)}>{e.label}</text>;
              })}
            </g>
          </svg>

          <div className={styles.panel} aria-live="polite">
            <div key={`${view.kind}-${view.kind === 'journey' ? view.step : view.kind === 'app' ? view.id : ''}`} className={styles.panelIn}>
              <Panel view={view} />
            </div>
          </div>
        </div>

        <div className={styles.steps}>
          <button type="button" className={styles.btn} aria-label="Previous step" onClick={() => { setPlaying(false); goStep(view.kind === 'journey' ? step - 1 : 0); }}>Back</button>
          <button
            type="button"
            className={cn(styles.btn, styles.pri)}
            onClick={() => {
              if (playing) { setPlaying(false); return; }
              if (view.kind !== 'journey' || step >= LAST_STEP) goStep(0);
              setPlaying(true);
            }}
          >
            {playing ? 'Pause' : 'Play'}
          </button>
          <button type="button" className={styles.btn} aria-label="Next step" onClick={() => { setPlaying(false); goStep(view.kind === 'journey' ? step + 1 : 0); }}>Next</button>
          {JOURNEY.map((j, i) => (
            <button
              key={j.title}
              type="button"
              className={styles.n}
              aria-label={`Step ${i + 1}: ${j.title}`}
              aria-current={view.kind === 'journey' && step === i ? 'step' : undefined}
              onClick={() => { setPlaying(false); goStep(i); }}
            >
              {i + 1}
            </button>
          ))}
          <span className={styles.spacer} />
          <button type="button" className={styles.btn} onClick={overview}>Overview</button>
        </div>
      </div>
    </div>
  );
}

function Panel({ view }: { view: View }) {
  if (view.kind === 'all') {
    return (
      <>
        <span className={styles.label}>Overview</span>
        <div className={styles.ptitle}>Nine apps, one drive, one Pi</div>
        <p>Each box is a Docker container on the Pi, and the arrows show the main path a request takes. Dashed boxes are optional extras, and a green square means the app reads or writes the shared drive.</p>
        <p>Tap a box to see all of its connections, or press Play to follow a single movie from request to TV.</p>
        <div className={styles.chips}><span className={styles.chip}>9 containers</span><span className={styles.chip}>1 network</span><span className={styles.chip}>1 drive</span></div>
      </>
    );
  }
  if (view.kind === 'journey') {
    const j = JOURNEY[view.step];
    return (
      <>
        <span className={styles.label}>Step {view.step + 1} of {JOURNEY.length}</span>
        <div className={styles.ptitle}>{j.title}</div>
        <p><Rich text={j.text} /></p>
        <div className={styles.chips}>{j.nodes.map((id) => <span key={id} className={styles.chip}>{NODES[id].name}</span>)}</div>
      </>
    );
  }

  const n = NODES[view.id];
  const links = edgesOf(view.id);
  const direct = links.some((e) => e.from === 'drive' || e.to === 'drive');
  const users = view.id === 'drive' ? NODE_IDS.filter((id) => NODES[id].disk) : [];
  const url = n.port ? `http://${PI_IP}:${n.port}` : '';
  return (
    <>
      <span className={styles.label}>{n.role}</span>
      <div className={styles.ptitle}>{n.name}</div>
      <p><Rich text={n.desc} /></p>
      {url && (
        <div className={styles.url}>
          <span>{url}</span>
          <CopyButton text={url} className={styles.small} />
        </div>
      )}
      {(links.length > 0 || (n.disk && view.id !== 'drive' && !direct)) && (
        <>
          <span className={styles.label}>Talks to</span>
          <div className={styles.tl}>
            {links.map((e) => {
              const out = e.from === view.id;
              return (
                <div key={e.id}><span className={styles.ar}>{out ? '→' : '←'}</span><b>{NODES[out ? e.to : e.from].name}</b> <span className={styles.note}>{e.note ?? e.label}</span></div>
              );
            })}
            {n.disk && view.id !== 'drive' && !direct && (
              <div><span className={styles.ar}>▪</span><b>The drive</b> <span className={styles.note}>{n.disk}</span></div>
            )}
          </div>
        </>
      )}
      {users.length > 0 && (
        <>
          <span className={styles.label}>Used by</span>
          <div className={styles.chips}>{users.map((id) => <span key={id} className={styles.chip}>{NODES[id].name}</span>)}</div>
        </>
      )}
    </>
  );
}
