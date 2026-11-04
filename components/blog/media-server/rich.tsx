import { Fragment } from 'react';

/** Renders the small markup the post data uses: **bold** and `code`. */
export function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part, i) => {
        if (part.startsWith('**')) return <b key={i}>{part.slice(2, -2)}</b>;
        if (part.startsWith('`')) return <code key={i}>{part.slice(1, -1)}</code>;
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
