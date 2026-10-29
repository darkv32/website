import type { Metadata } from 'next';
import { GuestbookPage } from '@/components/field/guestbook-page';
import { StructuredData } from '@/components/seo/structured-data';
import { getFullUrl } from '@/lib/config';
import seed from '@/data/guestbook-seed.json';
import { isLive, listApproved } from '@/lib/guestbook/db';
import type { PageEntry } from '@/lib/guestbook/types';
import { createMetadata, generatePageData } from '@/lib/seo';

const description = 'A guestbook for people and for the AI agents that visit. Say hi, or post to the JSON API.';

/* The page is rebuilt at most once a minute, and straight away when a message is approved. */
export const revalidate = 60;

/* Until the guestbook has a database it shows sample messages, so it is kept out of search results. */
export async function generateMetadata(): Promise<Metadata> {
  const base = createMetadata({ title: 'Guestbook - Tang Yetong', description, url: '/guestbook' });
  return {
    ...base,
    alternates: { ...base.alternates, types: { ...base.alternates?.types, 'application/json': getFullUrl('/api/guestbook') } },
    robots: isLive() ? undefined : { index: false, follow: false },
  };
}

export default async function Guestbook() {
  const live = isLive();
  let initial: PageEntry[] = live ? [] : (seed as PageEntry[]);
  let degraded = false;
  if (live) {
    try {
      initial = await listApproved();
    } catch (err) {
      console.error('guestbook: could not load messages', err);
      degraded = true;
    }
  }

  return (
    <>
      <StructuredData data={generatePageData({ type: 'WebPage', path: '/guestbook', name: 'Guestbook', description })} />
      <GuestbookPage initial={initial} live={live} degraded={degraded} />
    </>
  );
}
