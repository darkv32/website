'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import styles from './media-server.module.css';

/** Copies `text`, then shows a tick for a moment. Children are the label; the icon is always there. */
export function CopyButton({ text, className, children = 'Copy' }: { text: string; className?: string; children?: ReactNode }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      return;
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1400);
  }

  return (
    <button type="button" onClick={copy} className={cn(styles.cp, className)} data-copied={copied || undefined}>
      {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
      <span aria-live="polite">{copied ? 'Copied' : children}</span>
    </button>
  );
}

/** A dark code block with a copy button. */
export function CodeBlock({ text, display, className, maxHeight }: { text: string; display?: ReactNode; className?: string; maxHeight?: number }) {
  return (
    <div className={cn(styles.code, className)}>
      <CopyButton text={text} className={styles.codeCopy} />
      <pre className={styles.pre} style={maxHeight ? { maxHeight } : undefined}>
        {display ?? text}
      </pre>
    </div>
  );
}
