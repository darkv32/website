import type { Heading } from '@/lib/headings';
import { Alternatives } from './alternatives';
import { CodeBlock } from './copy-button';
import { ComposeBuilder } from './compose-builder';
import { ROLES, UPDATE_COMMANDS } from './data';
import { HardlinkLab } from './hardlink-lab';
import { HostBox } from './host-box';
import { SetupFlow } from './setup-flow';
import { ShoppingList } from './shopping-list';
import { StackMap } from './stack-map';
import { Troubleshooter } from './troubleshooter';
import styles from './media-server.module.css';

/** The contents list for this post: short names, in the order the sections appear. */
export const MEDIA_SERVER_HEADINGS: Heading[] = [
  { id: 'the-story', text: 'The story', level: 2 },
  { id: 'the-stack', text: 'The stack', level: 2 },
  { id: 'why-so-many-apps', text: 'Why so many apps', level: 2 },
  { id: 'shopping-list', text: 'Shopping list', level: 2 },
  { id: 'build-it', text: 'Build it', level: 2 },
  { id: 'compose-builder', text: 'Compose builder', level: 2 },
  { id: 'hardlink-lab', text: 'Hardlink lab', level: 2 },
  { id: 'wire-it-up', text: 'Wire it up', level: 2 },
  { id: 'when-it-breaks', text: 'When it breaks', level: 2 },
  { id: 'day-to-day', text: 'Day to day', level: 2 },
];

const H2 = ({ id, children }: { id: string; children: string }) => <h2 id={id}>{children}</h2>;

/** The body of "Jellyfin: Avoiding subscriptions like the plague". The page around it (hero, contents, author) comes from BlogArticle. */
export function MediaServerPost() {
  return (
    <>
      <p id="the-story" className="scroll-mt-24">
        A few weeks ago, I got tired of constantly asking my girlfriend to bring her iPad over to my house just to watch shows and movies. I have a TV at home, and constantly using the iPad never felt right.
      </p>
      <p>
        I&apos;ve never had a Netflix subscription, because I never knew if I could make it worth it. Would I really watch at least $20 of shows every month?
      </p>
      <p>
        Then I stumbled onto some YouTube Shorts about setting up an *arr stack (Radarr, Sonarr, Jellyfin and friends), and it piqued my interest. It didn&apos;t look difficult or complicated, and it sounded like a fun weekend project.
      </p>
      <p>This post is how I set it up, in the order that worked for me, with bits you can click on as you read.</p>

      <H2 id="the-stack">What I&apos;m actually building</H2>
      <p>
        The setup itself looked pretty straightforward. One Raspberry Pi runs all of the software, and the movies and series sit on an external hard drive. I&apos;d say it&apos;s straightforward even with nine pieces that fit together, because each one has a pretty simple purpose:
      </p>
      <div className={styles.roles}>
        {ROLES.map(([name, text]) => (
          <div key={name} className={styles.role}><b>{name}</b><span>{text}</span></div>
        ))}
      </div>
      <p>Here&apos;s how they all connect together. Tap an app to see who it talks to, or press Play to follow one movie from request to TV.</p>
      <StackMap />

      <H2 id="why-so-many-apps">Why isn&apos;t this just one plug-and-play app?</H2>
      <p>
        Nine containers is a lot of moving parts for &quot;watch a movie&quot;. It makes sense when you think about it: each app does exactly one job, and they talk to each other through plain web addresses and API keys.
      </p>
      <p>
        The upside is the flexibility to swap, update or switch off any single piece without touching the rest. For a stack like this, being able to swap out an unmaintained app for an alternative matters, since they are all community-maintained. If you really wanted to, you could even write your own app and hook it into the stack. I&apos;d say this is an essential part of what makes the *arr stack work as a whole.
      </p>
      <Alternatives />
      <p>You will feel the downside while setting everything up, though: more things to set up and keep updated. Debugging can also be a hassle.</p>

      <H2 id="shopping-list">Picking the Pi, and everything else I needed</H2>
      <p>
        A bit of digging around landed me on the Raspberry Pi 5 8GB. The price gap between the Pi 4 and the Pi 5 isn&apos;t big, so I went with the newer one, and the 8GB gives me some leeway for smaller side projects later.
      </p>
      <div className={styles.facts}>
        <div className={styles.fact}>
          <span className={styles.label}>Raspberry Pi 4 · 8GB</span>
          <dl className={styles.factRow}><dt>US price</dt><dd>$165</dd><dt>CPU</dt><dd>4× Cortex-A72, 1.8 GHz</dd><dt>Power</dt><dd>15W USB-C</dd></dl>
        </div>
        <div className={`${styles.fact} ${styles.mine}`}>
          <span className={styles.label}>Raspberry Pi 5 · 8GB · my pick</span>
          <dl className={styles.factRow}><dt>US price</dt><dd className={styles.hot}>$175</dd><dt>CPU</dt><dd className={styles.hot}>4× Cortex-A76, 2.4 GHz</dd><dt>Power</dt><dd>27W USB-C</dd></dl>
        </div>
      </div>
      <ul>
        <li><b>The gap:</b> about $10 in the US when I checked on 29 Oct 2026.</li>
        <li><b>Prices keep moving.</b> The Pi 5 8GB launched at $80 in 2023. Raspberry Pi has raised prices several times since because of memory costs, most recently on 1 April 2026.</li>
      </ul>
      <p>With the Pi picked, this is what I actually bought.</p>
      <ShoppingList />
      <p>It took about a week for everything to arrive, since some of the parts came from London.</p>

      <H2 id="build-it">Setting it up, step by step</H2>
      <p>This was the flow I followed when setting everything up. The core components are quite linear, and the optional apps come in any time.</p>
      <SetupFlow />

      <H2 id="compose-builder">My compose file, with your pick of containers</H2>
      <p>This is my stack written as a docker-compose file. Switch containers on and off and the file changes with it. The checker complains if something depends on an app you left out.</p>
      <ComposeBuilder />

      <H2 id="hardlink-lab">Why every app mounts the same /data</H2>
      <p>
        Radarr and Sonarr don&apos;t copy a finished download into the library, they hardlink it: one file on disk, two names. That only works if both names live on the same mount. Try it with each setting and watch the disk.
      </p>
      <HardlinkLab />

      <H2 id="wire-it-up">Getting the apps to talk to each other</H2>
      <p>
        Every connection screen asks for a host. Pick what goes in the host box and press Test. The containers all share one Docker network, so the most reliable way is to use the container name. I reserved 192.168.0.22 as the Pi&apos;s IP address, so I can swap the container name for 192.168.0.22 without any real problems as well.
      </p>
      <HostBox />

      <H2 id="when-it-breaks">Things that usually go wrong</H2>
      <p>Nearly every problem I had comes down to a wrong address, a wrong path or a missing permission.</p>
      <Troubleshooter />

      <H2 id="day-to-day">Day to day</H2>
      <p>
        Day to day it&apos;s just: open Seerr, request something, wait. When it shows up in Jellyfin it already has subtitles, unless Bazarr couldn&apos;t find any. The microSD card only holds the OS and app settings, and all the heavy writing goes to the 1TB drive. Back up <code>~/stack/config</code> every now and then, and remember the drive isn&apos;t a backup.
      </p>
      <div className={styles.try}><CodeBlock text={UPDATE_COMMANDS} /></div>
      <p>
        Now, all of the TVs have the Jellyfin TV app installed, and can stream pretty smoothly most of the time. There are some slight issues like transcoding, since the Pi can&apos;t transcode on its own, but those are outside the scope of this blog.
      </p>
      <p>Pretty good convenience overall, and I think it&apos;s pretty worth it 👍</p>
      <p className={styles.legal}>I only use this for content I&apos;m legally entitled to download. 👍</p>
    </>
  );
}
