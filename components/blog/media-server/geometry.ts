import { EDGES, NODES, type MapEdge, type MapNode } from './data';

export interface EdgeGeometry {
  d: string;
  /** Where the label sits, and which side of that point the text grows to. */
  lx: number;
  ly: number;
  anchor: 'start' | 'middle' | 'end';
}

const inside = (n: MapNode, x: number, y: number, pad: number) =>
  Math.abs(x - n.x) <= n.w / 2 + pad && Math.abs(y - n.y) <= n.h / 2 + pad;

/** A line between two boxes, trimmed to where it leaves one box and enters the other so the arrowheads stay visible. */
function edgeGeometry(e: MapEdge): EdgeGeometry {
  const a = NODES[e.from];
  const b = NODES[e.to];
  const p0 = { x: a.x + (e.sx ?? 0), y: a.y };
  const p2 = { x: b.x + (e.ax ?? 0), y: b.y };
  const at = (t: number) => ({ x: p0.x + (p2.x - p0.x) * t, y: p0.y + (p2.y - p0.y) * t });

  let t0 = 0;
  let t1 = 1;
  for (let i = 0; i <= 200; i++) {
    const p = at(i / 200);
    if (!inside(a, p.x, p.y, 3)) { t0 = i / 200; break; }
  }
  for (let i = 200; i >= 0; i--) {
    const p = at(i / 200);
    if (!inside(b, p.x, p.y, 3)) { t1 = i / 200; break; }
  }
  const start = at(t0);
  const end = at(t1);
  const mid = at((t0 + t1) / 2);
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const length = Math.hypot(dx, dy) || 1;

  /* Labels sit beside straight vertical or horizontal lines so they never cover the arrow; on diagonals they sit on the line. */
  let lx = mid.x;
  let ly = mid.y + 3.5;
  let anchor: EdgeGeometry['anchor'] = 'middle';
  if (Math.abs(dx) < 0.2 * length) {
    anchor = mid.x < 280 ? 'end' : 'start';
    lx = mid.x + (mid.x < 280 ? -8 : 8);
  } else if (Math.abs(dy) < 0.2 * length) {
    ly = mid.y - 7;
  }
  return { d: `M${start.x.toFixed(1)} ${start.y.toFixed(1)} L${end.x.toFixed(1)} ${end.y.toFixed(1)}`, lx, ly, anchor };
}

/** Computed once: the layout never changes. */
export const EDGE_GEOMETRY: Record<string, EdgeGeometry> = Object.fromEntries(EDGES.map((e) => [e.id, edgeGeometry(e)]));
