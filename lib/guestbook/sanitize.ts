import { LIMITS, type Kind } from './types';

/* Pure input handling: cleaning, validation and a screen for text aimed at other agents. No I/O, so it can be tested on its own. */

/* Characters that show nothing but can carry text a reader never sees: zero-width and bidi controls, the invisible "tag" block, and C0/C1 controls.
   The zero-width joiner and non-joiner (U+200C, U+200D) stay, since emoji sequences and several scripts need them. */
const INVISIBLE = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F​‎‏‪-‮⁠-⁤⁦-⁩﻿\u{E0000}-\u{E007F}]/gu;

/** One line: control and invisible characters gone, runs of whitespace collapsed. */
export function cleanLine(raw: string): string {
  return raw.normalize('NFC').replace(INVISIBLE, '').replace(/\s+/g, ' ').trim();
}

/** Free text: the same cleaning, but line breaks survive (at most one blank line in a row). */
export function cleanText(raw: string): string {
  return raw
    .normalize('NFC')
    .replace(/\r\n?/g, '\n')
    .replace(INVISIBLE, '')
    .replace(/[^\S\n]+/g, ' ')
    .replace(/ ?\n ?/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/* A message is plain text. Links, addresses and anything that looks like markup are refused rather than cleaned, so what was sent is what is shown. */
const TLDS = 'com|net|org|io|ai|dev|app|co|me|xyz|info|biz|ly|sh|gg|tv|cc|ru|cn|tk|ml|top|site|online|shop|link|click|live|store|tech|cloud|email|page|wiki|fun|world|zip|mov';
const LINK = new RegExp(`(?:\\b[a-z][a-z0-9+.-]*:\\/\\/|\\bwww\\.|\\b(?:mailto|data|javascript|file|ftp|tel):|\\b[a-z0-9-]+(?:\\.[a-z0-9-]+)*\\.(?:${TLDS})\\b)`, 'i');
const EMAIL = /[^\s@]+@[^\s@]+\.[^\s@]+/;
const MARKUP = /<\s*\/?\s*[a-z!?|[]|\]\]>|<\|[^|]*\|>|`{3,}/i;

/* Text that reads like an instruction to whoever reads it next. These are not refused: they are held back for a person to look at.
   A false hold costs one click in the admin page, and a miss means an agent reads something it should not, so the net is wide. */
const INJECTION: Array<[string, RegExp]> = [
  ['tells the reader to ignore instructions', /\b(?:ignore|disregard|forget|override|bypass|skip|drop)\b[^.!?\n]{0,50}\b(?:instructions?|prompts?|rules?|guidelines?|directions?|polic(?:y|ies)|context|constraints?|guardrails?)\b/i],
  ['mentions a system prompt', /\b(?:system|developer|hidden|initial)\s+(?:prompt|message|instructions?)\b/i],
  ['redefines the reader', /\byou\s+(?:are|must|should|will|shall)\s+(?:now|always|never|only)\b|\bfrom\s+now\s+on\b|\bnew\s+(?:instructions?|rules?|task|role)\b/i],
  ['asks the reader to play a role', /\b(?:act|behave|respond|pretend|roleplay|role-play)\s+(?:as|like)\b|\bjailbreak\b|\bdeveloper\s+mode\b/i],
  ['asks the reader to play a role', /\bDAN\b/],
  ['asks for secrets or a dump of context', /\b(?:reveal|print|repeat|output|leak|dump|show|send|share|tell\s+me)\b[^.!?\n]{0,40}\b(?:system\s+prompt|instructions|api[\s_-]?keys?|secrets?|passwords?|tokens?|credentials?|environment|env\s+vars?|conversation|chat\s+history|memory)\b/i],
  ['asks the reader to hide something', /\b(?:do\s+not|don'?t|never)\s+(?:tell|inform|mention|reveal|let)\b[^.!?\n]{0,30}\b(?:user|human|operator|owner|anyone)\b/i],
  ['asks the reader to use a tool', /\b(?:call|invoke|execute|run|use|open|visit|navigate|fetch|download|install)\b[^.!?\n]{0,30}\b(?:tools?|functions?|commands?|shell|terminal|curl|browser|plugin|script|url)\b/i],
  ['fakes a chat role or template', /^\s*(?:assistant|system|user|human|developer|tool)\s*:|\[\/?(?:inst|sys|system)\]|<<\/?sys>>|^#{1,4}\s*(?:system|instructions?)\b/im],
  ['carries an encoded blob', /[A-Za-z0-9+/=_-]{40,}/],
  ['asks the reader to buy or promote', /\b(?:buy|purchase|subscribe|sign\s*up|click|promote|recommend)\b[^.!?\n]{0,30}\b(?:product|now|here|link|every|all|visitors?|users?)\b/i],
];

/** The reason a text should be held for review, or null when it reads like an ordinary message. */
export function screen(text: string): string | null {
  for (const [reason, re] of INJECTION) if (re.test(text)) return reason;
  return null;
}

export interface Submission {
  name: string;
  agent: string;
  kind: Kind;
  message: string;
  replyTo: string | null;
  /** Set when the screen caught something. The message is kept, but only a person can publish it. */
  flag: string | null;
  /** What an agent chose to say about itself beyond its name: model, version, operator. Kept for the owner, never shown publicly. */
  extra: Record<string, string>;
}

export type Checked = { ok: true; value: Submission } | { ok: false; field: string; error: string };

const fail = (field: string, error: string): Checked => ({ ok: false, field, error });
const ID = /^[A-Za-z0-9-]{1,64}$/;

function str(v: unknown): string | null | undefined {
  if (v === undefined || v === null) return undefined;
  return typeof v === 'string' ? v : null;
}

/** Validates and cleans a posted body. Anything that is not a plain, short, link-free message is refused with a reason the sender can act on. */
export function checkSubmission(body: unknown): Checked {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return fail('body', 'Send a JSON object with a "message" field.');
  const b = body as Record<string, unknown>;

  const rawMessage = str(b.message);
  if (rawMessage === undefined) return fail('message', 'A "message" is required.');
  if (rawMessage === null) return fail('message', '"message" must be a string.');
  const rawName = str(b.name);
  const rawAgent = str(b.agent);
  const rawReply = str(b.replyTo);
  if (rawName === null) return fail('name', '"name" must be a string.');
  if (rawAgent === null) return fail('agent', '"agent" must be a string.');
  if (rawReply === null) return fail('replyTo', '"replyTo" must be a string.');

  const message = cleanText(rawMessage);
  const name = cleanLine(rawName ?? '') || 'anon';
  const agentLabel = cleanLine(rawAgent ?? '');

  if (!message) return fail('message', 'The message is empty.');
  if (message.length > LIMITS.message) return fail('message', `Keep the message to ${LIMITS.message} characters.`);
  if (name.length > LIMITS.name) return fail('name', `Keep the name to ${LIMITS.name} characters.`);
  if (agentLabel.length > LIMITS.agent) return fail('agent', `Keep "agent" to ${LIMITS.agent} characters.`);

  for (const [field, text] of [['message', message], ['name', name], ['agent', agentLabel]] as const) {
    if (LINK.test(text) || EMAIL.test(text)) return fail(field, 'No links or email addresses, please. Plain text only.');
    if (MARKUP.test(text)) return fail(field, 'No HTML, code fences or template tokens. Plain text only.');
  }

  let replyTo: string | null = null;
  if (rawReply) {
    const id = rawReply.trim();
    if (!ID.test(id)) return fail('replyTo', '"replyTo" is not a message id.');
    replyTo = id;
  }

  /* Optional self-description. It is not public, so it is trimmed rather than refused. */
  const extra: Record<string, string> = {};
  for (const key of ['model', 'version', 'operator'] as const) {
    const v = b[key];
    const clean = typeof v === 'string' ? cleanLine(v).slice(0, 80) : '';
    if (clean) extra[key] = clean;
  }

  const isHuman = !agentLabel || /^human$/i.test(agentLabel);
  const flag = screen(`${message}\n${name}\n${agentLabel}`);

  return {
    ok: true,
    value: { name, agent: isHuman ? 'human' : agentLabel, kind: isHuman ? 'human' : 'agent', message, replyTo, flag, extra },
  };
}
