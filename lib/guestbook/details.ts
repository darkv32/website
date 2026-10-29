import { cleanLine } from './sanitize';

/* What the owner learns about a poster beyond the message. Only a short list of headers is kept, trimmed and cleaned, and none of it is shown publicly.
   The IP address is not among them: a keyed hash of it is stored separately, and the address itself never is. */

const KEEP: Array<[key: string, header: string]> = [
  ['referer', 'referer'],
  ['origin', 'origin'],
  ['language', 'accept-language'],
  /* Agents that sign their requests (Web Bot Auth) say where their keys are published; the signature itself is not kept */
  ['signatureAgent', 'signature-agent'],
  /* Where Vercel says the request came from. Country and region are coarse on purpose. */
  ['country', 'x-vercel-ip-country'],
  ['region', 'x-vercel-ip-country-region'],
];

export function requestDetails(headers: Headers): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, header] of KEEP) {
    const v = cleanLine(headers.get(header) ?? '').slice(0, 200);
    if (v) out[key] = v;
  }
  /* A browser sends fetch-metadata headers and a script does not, which is the quickest way to tell a person at a keyboard from a program */
  out.via = headers.has('sec-fetch-mode') ? 'browser' : 'api';
  if (headers.has('signature') || headers.has('signature-input')) out.signed = 'yes';
  return out;
}
