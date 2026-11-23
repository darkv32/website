import Link from 'next/link';
import type { Heading } from '@/lib/headings';
import styles from './transcoding.module.css';
import { Chain } from './chain';
import { FormatGuide } from './format-guide';
import { ReleaseName } from './release-name';
import { SettingsSteps, StreamerFlow } from './flows';
import { PlayModes } from './play-modes';
import { SessionCard } from './session-card';

/** The contents list for this post: short names, in the order the sections appear. */
export const TRANSCODING_HEADINGS: Heading[] = [
  { id: 'the-stutter', text: 'The stutter', level: 2 },
  { id: 'look-at-the-session', text: 'Look at the session', level: 2 },
  { id: 'formats', text: 'Formats and TVs', level: 2 },
  { id: 'what-arr-downloads', text: 'What Radarr and Sonarr download', level: 2 },
  { id: 'the-real-cost', text: 'The expensive part', level: 2 },
  { id: 'the-fix', text: 'The fix', level: 2 },
  { id: 'the-fallback', text: 'The fallback', level: 2 },
  { id: 'streamer', text: 'A TV streamer', level: 2 },
  { id: 'graphs', text: 'A graph to look at', level: 2 },
];

const H2 = ({ id, children }: { id: string; children: string }) => <h2 id={id}>{children}</h2>;

/** The body of the Jellyfin transcoding post. The page around it (hero, contents, author) comes from BlogArticle. */
export function TranscodingPost() {
  return (
    <>
      <p>
        At the end of my <Link href="/blog/raspberry-pi-media-server">arr stack post</Link> I wrote that the TVs &quot;can stream pretty smoothly most of the time&quot; and that transcoding was outside the scope of the blog. This is the blog about the transcoding part, now that I&apos;ve had the setup running for a few weeks.
      </p>
      <p>
        I would say that transcoding is one of the biggest pain points of running the arr stack on a Raspberry Pi instead of a mini PC. To sum up transcoding: a video file is a bundle of a video format, one or more audio formats, and a container around them. A TV can only play the formats its hardware and app understand, and older TVs understand fewer of them. Jellyfin handles that in one of three ways:
      </p>
      <PlayModes />
      <p>This one is more of a notes post than a tutorial.</p>

      <H2 id="the-stutter">The stutter</H2>
      <p>
        One night my parents put on <i>Fury</i> on the TV and it stuttered badly. Not a dropped frame here and there, but stop-start playback, as if the network was lagging. There were a few guesses as to why that was happening, for example the Ethernet being too slow for the 4K movie that was being streamed, transcoding, and so on, but it was only one movie, so I shrugged and moved on.
      </p>
      <p>The next night <i>The Departed</i> did the same thing. The movie was borderline unwatchable, so I went looking.</p>

      <H2 id="look-at-the-session">Look at the session, not the device</H2>
      <p>
        Jellyfin&apos;s dashboard shows every live session (Profile → Dashboard), and for each one it tells you whether it is &quot;Direct playing&quot; or transcoding, and why. Open it while the stutter is happening and the reason is usually right there in the live session information.
      </p>
      <p>Here is what it showed for the TV (running the Jellyfin Android TV app 0.20.0):</p>
      <SessionCard />

      <H2 id="formats">Why one TV converts what another plays</H2>
      <p>
        The TV, or really the Jellyfin app running on it, tells Jellyfin which formats it can decode. Jellyfin checks every part of the file against that list. Whatever is on the list plays as it is, and whatever is missing gets converted. That is why the same file can direct play on one TV and transcode on another. The file doesn&apos;t change, the list does.
      </p>
      <p>
        A file has several things in it: the container around everything, the video, the HDR on top of it, the audio and any subtitles. Each comes in several formats, and the TV has to understand each one it meets.
      </p>
      <FormatGuide />
      <p>
        So the cheap, easy combination is H.264 video with AAC audio, because nearly everything plays it. The risky one is the opposite end: Dolby Vision video with a Dolby or DTS audio track. Any one of those can be the thing a particular TV doesn&apos;t understand.
      </p>

      <H2 id="what-arr-downloads">What Radarr and Sonarr will actually download</H2>
      <p>
        Radarr (movies) and Sonarr (TV) know nothing about your TVs. They pick a release using the quality profile you give them, and a quality profile is mostly about resolution and source (for example 1080p Blu-ray or 2160p WEB-DL), with a size range. It says nothing about the video codec or the audio.
      </p>
      <p>
        Custom formats are where you can be pickier. A custom format matches words in the release name, like x265, DV, Atmos or TrueHD, and gives it a score. Give a format a positive score to prefer it, or a negative one to avoid it. Without any, a 4K profile will happily grab whichever release ranks best for that quality, Dolby Vision and Dolby audio included. That is how a file like this one ended up on the Pi. Radarr and Sonarr also never convert anything. They download the release as it is.
      </p>
      <p>The tags in a release name are what you can match on. Here are two made-up examples, taken apart:</p>
      <ReleaseName />
      <H2 id="the-real-cost">The audio was cheap, the video wasn&apos;t</H2>
      <p>Converting audio on its own is cheap, even for a Pi. If AC3 to AAC was the only thing happening, I&apos;d never have noticed.</p>
      <p>
        The expensive part was the video. The session showed the picture being re-encoded as well, and the Raspberry Pi 5 has no hardware video encoder, so that happens in software on the CPU. The CPU can only manage 12 frames per second, which is half of real time.
      </p>
      <p>
        Converting AC3 doesn&apos;t normally force a video re-encode, so the picture was probably being converted for its own reason, most likely the Dolby Vision or HDR handling. The dashboard lists the transcoding reason for each stream, so that is the place to confirm it. Either way, this is what happened to this file:
      </p>
      <Chain />
      <p>
        That also explains why my other TV was fine. It direct-played <i>No Time to Die</i> because that file&apos;s audio is AAC, so there was nothing to convert.
      </p>

      <H2 id="the-fix">The fix: get the TV to accept AC3</H2>
      <p>
        If the TV plays AC3 as it is, nothing gets converted and the Pi never has to touch the video. All of this is in the TV&apos;s Jellyfin app, under Settings → Playback:
      </p>
      <SettingsSteps />

      <H2 id="the-fallback">The fallback: stop downloading Dolby Vision</H2>
      <p>If none of those settings work, then that TV can&apos;t play Dolby audio through this app, and I can&apos;t fix that from the Pi.</p>
      <p>
        What I can do is change what comes in. In my case, the Dolby Vision release is the one where the video got re-encoded as well, so the fallback is to tell Radarr to avoid them. A 4K HDR10 or a 1080p release with the same audio would at worst cost the Pi an audio conversion.
      </p>
      <H2 id="streamer">On the other hand, a TV streamer is coming</H2>
      <p>
        The house is getting a TV streamer, and the hope is that it takes some of the transcoding off the Pi and lets us play more video formats. That is mostly true, but not quite the way I first pictured it.
      </p>
      <p>
        A streamer doesn&apos;t transcode anything on the Pi&apos;s behalf. What it does is run the Jellyfin app on better hardware, with a decoder that understands more formats (HEVC, Dolby Vision, Dolby Digital and so on) and usually the licences for them. When the app tells Jellyfin &quot;I can play that&quot;, Jellyfin direct plays and the Pi just sends the file. So the conversion doesn&apos;t move to the streamer, it stops being needed.
      </p>
      <StreamerFlow />
      <p>
        There are catches. Streamers differ a lot, so check the specs for the formats from the guide above (HEVC, Dolby Vision, Dolby Digital and Digital Plus) before buying. The TV and soundbar still matter, since the streamer can decode Dolby Vision but the TV has to be able to show it, and lossless audio like TrueHD needs a soundbar or receiver to handle it. And whatever the streamer still can&apos;t play will still land on the Pi.
      </p>
      <H2 id="graphs">A graph I can look at without opening a terminal</H2>
      <p>
        While I was at it, I wanted something nicer than SSH to see what the Pi was doing. I set up Beszel, a lightweight monitoring dashboard, and it showed the Pi straight away. It&apos;s at port 8090 on the Pi.
      </p>
      <p>
        For &quot;what happened last night&quot;, I pick 12 or 24 hours and look at the CPU and the disk charts.
      </p>
      <p>Beszel can also send alerts when a threshold is crossed, but it needs a notification method such as email set up first, which I haven&apos;t done yet.</p>
    </>
  );
}
