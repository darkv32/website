import Link from 'next/link';
import type { Heading } from '@/lib/headings';
import { CodeBlock } from '../media-server/copy-button';
import styles from '../media-server/media-server.module.css';
import { Checks, QueueFix, SharedCores } from './graphics';

/** The contents list for this post: short names, in the order the sections appear. */
export const HEAVY_PROCESSING_HEADINGS: Heading[] = [
  { id: 'direct-play-still-stutters', text: 'Direct play, still stuttering', level: 2 },
  { id: 'look-at-the-cpu', text: 'Look at the CPU', level: 2 },
  { id: 'who-was-using-it', text: 'Who was using it', level: 2 },
  { id: 'the-fix', text: 'The fix', level: 2 },
  { id: 'watching-it', text: 'Watching it without SSH', level: 2 },
];

const H2 = ({ id, children }: { id: string; children: string }) => <h2 id={id}>{children}</h2>;

/** The body of the Jellyfin heavy processing post. The page around it (hero, contents, author) comes from BlogArticle. */
export function HeavyProcessingPost() {
  return (
    <>
      <p>
        In my last blog about <Link href="/blog/jellyfin-stutter-transcoding-raspberry-pi">transcoding</Link>, the stutter came down to the Pi converting a 4K Dolby Vision file it couldn&apos;t keep up with. Then it stuttered again, and this time nothing was being transcoded.
      </p>

      <H2 id="direct-play-still-stutters">Direct play, and still stuttering</H2>
      <p>
        By now I knew where to look first, so I opened the Jellyfin dashboard while it was stuttering. The session said &quot;Direct playing&quot;. Nothing was being converted, the TV understood every part of the file and the Pi was just sending it over.
      </p>
      <p>
        That ruled out everything from the last post. If the formats were fine and it still stuttered, then something else was keeping the Pi from sending the file fast enough.
      </p>

      <H2 id="look-at-the-cpu">Look at the CPU</H2>
      <p>
        So I SSHed into the Pi and looked at what it was doing. The CPU usage was sitting at 90% or more, which is a lot for a Pi that is supposed to be just playing a file. If your stack runs in Docker, this shows which container is busy:
      </p>
      <div className={styles.try}><CodeBlock text="docker stats --no-stream" /></div>
      <Checks />

      <H2 id="who-was-using-it">Who was using it</H2>
      <p>
        After digging around, it was Bazarr and qBittorrent. Seerr had been instructed to request a show with four seasons, Tulsa King, and had all of it queued up, and both of them were churning through all of it at once.
      </p>
      <p>
        Seerr hadn&apos;t done anything wrong. The person who requested the show wanted all the seasons, so it asked for all four.
      </p>
      <p>
        Everything in the stack lives on the same Pi, with the same four cores. qBittorrent is busy for as long as it has many active torrents, and Bazarr is busy for as long as it has a pile of episodes to look at. Jellyfin only needed a small share to direct play one file, but when two apps take most of the CPU, that share gets squeezed.
      </p>
      <SharedCores />

      <H2 id="the-fix">The fix: one torrent at a time</H2>
      <p>
        I limited qBittorrent to one active torrent. The rest of the season now waits in the queue and gets worked on one after another, so there is much less going on at any moment. While playing a movie or show, the CPU is back to around 20 to 30%, and the stutter is gone.
      </p>
      <QueueFix />
      <p>
        In qBittorrent this is in the options, under BitTorrent and then Torrent Queueing. Set the maximum active torrents to 1. The labels might differ a little on your version.
      </p>
      <p>It does mean a whole show takes longer to arrive, since the episodes are no longer downloading side by side.</p>

      <H2 id="watching-it">Watching it without SSH</H2>
      <p>
        This is the second time a stutter turned out to be the Pi working too hard, so a graph is easier than SSHing in every time. Beszel, the monitoring dashboard from the <Link href="/blog/jellyfin-stutter-transcoding-raspberry-pi">last post</Link>, shows the CPU chart too. Picking 12 or 24 hours shows what happened last night.
      </p>
    </>
  );
}
