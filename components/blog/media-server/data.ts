/* Content and layout data for the media server post. Text uses a tiny markup: **bold** and `code`. */

/** The address I reserved for the Pi in the router. */
export const PI_IP = '192.168.0.22';

export type NodeId =
  | 'seerr'
  | 'radarr'
  | 'prowlarr'
  | 'sonarr'
  | 'bazarr'
  | 'flaresolverr'
  | 'maintainerr'
  | 'qbittorrent'
  | 'jellyfin'
  | 'drive';
export type AppId = Exclude<NodeId, 'drive'>;

/* ---------- stack map ---------- */

export interface MapNode {
  name: string;
  role: string;
  /** Centre and size in the 560 x 590 map. */
  x: number;
  y: number;
  w: number;
  h: number;
  port?: number;
  sub?: string;
  /** Optional extra: drawn dashed. */
  opt?: boolean;
  store?: boolean;
  /** What the app does on the drive; a green square marks it. */
  disk?: string;
  desc: string;
}

export const NODES: Record<NodeId, MapNode> = {
  seerr: { name: 'Seerr', role: 'The menu', port: 5055, x: 280, y: 65, w: 118, h: 46, desc: 'The request site, basically the menu. I search for a title and press Request. It signs in through Jellyfin.' },
  radarr: { name: 'Radarr', role: 'Movies', port: 7878, x: 80, y: 185, w: 118, h: 46, disk: 'hardlinks finished movies into the library', desc: 'Finds, grabs and files movies. It asks Prowlarr where to look and qBittorrent to download.' },
  prowlarr: { name: 'Prowlarr', role: 'Indexers', port: 9696, x: 280, y: 185, w: 118, h: 46, desc: 'Keeps all your indexers in one place and feeds them to Radarr and Sonarr.' },
  sonarr: { name: 'Sonarr', role: 'TV shows', port: 8989, x: 480, y: 185, w: 118, h: 46, disk: 'hardlinks finished episodes into the library', desc: 'The same job as Radarr, for TV episodes and seasons.' },
  bazarr: { name: 'Bazarr', role: 'Subtitles', port: 6767, x: 80, y: 305, w: 118, h: 46, opt: true, disk: 'saves .srt files next to the video', desc: 'Finds a subtitle (SRT) for each new title and saves it beside the video.' },
  flaresolverr: { name: 'FlareSolverr', role: 'Anti-bot helper', port: 8191, x: 280, y: 305, w: 118, h: 46, opt: true, desc: 'Gets Prowlarr past anti-bot check pages. No screen of its own worth visiting.' },
  maintainerr: { name: 'Maintainerr', role: 'The janitor', port: 6246, x: 480, y: 305, w: 118, h: 46, opt: true, desc: 'Deletes old, unwatched media so the drive does not fill up. Always run new rules in dry-run first.' },
  qbittorrent: { name: 'qBittorrent', role: 'Downloader', port: 8080, x: 280, y: 420, w: 118, h: 46, disk: 'saves downloads', desc: 'Downloads the actual files into `/data/downloads`, and seeds until your limit removes them.' },
  jellyfin: { name: 'Jellyfin', role: 'The player', port: 8096, x: 480, y: 420, w: 118, h: 46, disk: 'reads the library', desc: 'The Netflix screen. It spots the new file on the drive and shows it in the TV app or a browser.' },
  drive: { name: '1TB external drive', sub: '/mnt/media', role: 'Where the files live', store: true, x: 280, y: 515, w: 500, h: 44, desc: 'Mounted at `/mnt/media` on the Pi. Downloads, the library and subtitles all live here, under one `/data` folder so hardlinks work. The green squares mark every app that reads or writes it.' },
};

export const MAP_ROWS: Array<[label: string, y: number]> = [
  ['ASK', 69],
  ['FIND', 152],
  ['EXTRAS', 272],
  ['GET & WATCH', 424],
];

export interface MapEdge {
  id: string;
  from: NodeId;
  to: NodeId;
  /** Short text on the arrow. */
  label: string;
  /** Longer wording for the side panel. */
  note?: string;
  /** Drawn in the overview; the rest appear when you tap an app or play the journey. */
  main?: boolean;
  /** Slides the start or end sideways along a wide box. */
  sx?: number;
  ax?: number;
}

export const EDGES: MapEdge[] = [
  { id: 'e2', from: 'seerr', to: 'radarr', label: 'movie request', main: true },
  { id: 'e3', from: 'seerr', to: 'sonarr', label: 'show request', main: true },
  { id: 'e5', from: 'prowlarr', to: 'radarr', label: 'indexers', main: true },
  { id: 'e6', from: 'prowlarr', to: 'sonarr', label: 'indexers', main: true },
  { id: 'e7', from: 'flaresolverr', to: 'prowlarr', label: 'beats anti-bot', main: true },
  { id: 'e8', from: 'radarr', to: 'qbittorrent', label: 'download', note: 'sends the download', main: true },
  { id: 'e9', from: 'sonarr', to: 'qbittorrent', label: 'download', note: 'sends the download', main: true },
  { id: 'e10', from: 'qbittorrent', to: 'drive', label: 'saves files', main: true },
  { id: 'e13', from: 'drive', to: 'jellyfin', label: 'plays', note: 'plays the library', sx: 200, main: true },
  { id: 'e14', from: 'bazarr', to: 'radarr', label: 'movies', note: 'reads movies' },
  { id: 'e15', from: 'bazarr', to: 'sonarr', label: 'shows', note: 'reads shows' },
  { id: 'e17', from: 'maintainerr', to: 'jellyfin', label: 'history', note: 'reads watch history' },
  { id: 'e18', from: 'maintainerr', to: 'radarr', label: 'deletes' },
  { id: 'e19', from: 'maintainerr', to: 'sonarr', label: 'deletes' },
];

export interface JourneyStep {
  title: string;
  nodes: NodeId[];
  edges: string[];
  text: string;
}

export const JOURNEY: JourneyStep[] = [
  { title: 'Request', nodes: ['seerr'], edges: [], text: 'I search for the movie in **Seerr** and press Request. That is the last thing I do by hand.' },
  { title: 'Hand-off', nodes: ['seerr', 'radarr', 'sonarr'], edges: ['e2', 'e3'], text: 'Seerr passes the request to **Radarr** for a movie, or **Sonarr** for a show.' },
  { title: 'Search', nodes: ['radarr', 'sonarr', 'prowlarr', 'flaresolverr'], edges: ['e5', 'e6', 'e7'], text: 'Radarr or Sonarr asks **Prowlarr** to search every indexer. **FlareSolverr** helps Prowlarr past anti-bot pages.' },
  { title: 'Download', nodes: ['radarr', 'sonarr', 'qbittorrent', 'drive'], edges: ['e8', 'e9', 'e10'], text: 'The best match goes to **qBittorrent**, which saves it in `/data/downloads` on the drive.' },
  { title: 'Import', nodes: ['radarr', 'sonarr', 'drive'], edges: [], text: 'When it finishes, Radarr or Sonarr hardlinks the file into `/data/media/movies` or `/data/media/tv` on the same drive. No extra space used.' },
  { title: 'Subtitles', nodes: ['bazarr', 'radarr', 'sonarr', 'drive'], edges: ['e14', 'e15'], text: '**Bazarr** sees the new title through Radarr and Sonarr, finds a subtitle and saves an SRT file next to the video on the drive.' },
  { title: 'Watch', nodes: ['jellyfin', 'drive'], edges: ['e13'], text: '**Jellyfin** sees the new file on the drive and shows it. I open the TV app or a browser and press play.' },
  { title: 'Clean up', nodes: ['maintainerr', 'jellyfin', 'radarr', 'sonarr'], edges: ['e17', 'e18', 'e19'], text: "Weeks later, **Maintainerr** reads Jellyfin's watch history and deletes old, unwatched titles through Radarr and Sonarr." },
];

/* ---------- the nine apps, in the order the post builds them ---------- */

export const ROLES: Array<[name: string, text: string]> = [
  ['Jellyfin', 'The media player, my "Netflix" screen'],
  ['Seerr', 'The request website, my "menu"'],
  ['qBittorrent', 'Downloads the files'],
  ['Radarr', 'Searches for and manages movies'],
  ['Sonarr', 'Searches for and manages TV shows'],
  ['Prowlarr', 'Manages the indexers and feeds Sonarr and Radarr'],
  ['Bazarr', 'Downloads subtitles'],
  ['FlareSolverr', 'Gets Prowlarr past anti-bot checks'],
  ['Maintainerr', 'Auto-deletes old media to free up space'],
];

/* ---------- alternatives ---------- */

export interface AltRow {
  role: string;
  pick: string;
  alts: string[];
  /** Set when the app can be skipped altogether. */
  optional?: boolean;
  /** Set when nothing else can take its place. */
  locked?: string;
}

const KEYSTONE = 'No easy swap: Seerr, Bazarr, Prowlarr and Maintainerr expect it';

export const ALTERNATIVES: AltRow[] = [
  { role: 'The menu', pick: 'Seerr', alts: ['Jellyseerr', 'Overseerr'] },
  { role: 'The player', pick: 'Jellyfin', alts: ['Plex', 'Emby'] },
  { role: 'Downloader', pick: 'qBittorrent', alts: ['Deluge', 'Transmission'] },
  { role: 'Movies', pick: 'Radarr', alts: [], locked: KEYSTONE },
  { role: 'TV shows', pick: 'Sonarr', alts: [], locked: KEYSTONE },
  { role: 'Indexers', pick: 'Prowlarr', alts: ['Jackett'] },
  { role: 'Subtitles', pick: 'Bazarr', alts: ['Jellyfin OpenSubtitles plugin'], optional: true },
  { role: 'Anti-bot helper', pick: 'FlareSolverr', alts: ['Byparr'], optional: true },
  { role: 'The janitor', pick: 'Maintainerr', alts: ['Janitorr'], optional: true },
];

/* ---------- shopping list ---------- */

export interface Buy {
  name: string;
  why: string;
  where: string;
  price: string;
  /** A line that is not a product (GST). */
  sub?: boolean;
}

export const BUYS: Buy[] = [
  { name: 'Raspberry Pi 5 (8GB)', why: 'The brain. It runs all nine containers.', where: 'element14 SG', price: 'S$236.32' },
  { name: 'Official case', why: 'Keeps dust and fingers off the board.', where: 'element14 SG', price: 'S$13.51' },
  { name: 'Official 27W USB-C power supply', why: 'The Pi 5 wants 5V/5A so the USB drive gets full power.', where: 'element14 SG', price: 'S$16.21' },
  { name: 'GST (9%) on the order above', why: 'The three prices above are before GST.', where: 'element14 SG', price: 'S$23.94', sub: true },
  { name: '32GB microSD card', why: "Only holds the OS and each app's settings. The heavy writing goes to the drive.", where: 'Shopee', price: 'S$19.94' },
  { name: 'USB-C microSD card reader', why: 'Needed to write the OS onto the microSD card from a laptop.', where: 'Shopee', price: 'S$4.39' },
  { name: '1TB external hard drive', why: 'The library. Movies and shows live here.', where: 'A spare one I had lying around', price: 'S$0' },
];

export const BUYS_TOTAL = 'S$314.31';

/* ---------- setup flow ---------- */

export interface Step {
  /** Group heading shown above this step. */
  group?: string;
  title: string;
  port?: string | number;
  body: string;
  /** Callout shown before the body. */
  warn?: string;
  code?: string;
  done: string;
  /** Optional apps come in any time after launch. */
  optional?: boolean;
  needs?: string[];
}

export const STEPS: Step[] = [
  { group: 'Prepare the Pi', title: 'Flash and boot', body: `I flash Raspberry Pi OS Lite (64-bit) with Raspberry Pi Imager. Fill in the OS settings before writing the card: hostname \`mediapi\`, your user and password, SSH on, timezone Asia/Singapore. Plug in Ethernet, boot, then reserve ${PI_IP} for the Pi in the router so the address never changes. Every URL later on depends on it.`, code: 'ssh youruser@mediapi.local\nsudo apt update && sudo apt full-upgrade -y\nsudo reboot', done: `ssh connects and your router lists the Pi at ${PI_IP}.` },
  { title: 'Install Docker', body: 'One script installs Docker and the Compose plugin. Log out and back in so the group change applies.', code: 'curl -fsSL https://get.docker.com | sudo sh\nsudo usermod -aG docker $USER\n# log out, log back in, then:\ndocker compose version\ndocker run --rm hello-world', done: 'hello-world prints its greeting.' },
  { title: 'Format and mount the drive', warn: 'Formatting erases the drive. Check the device name with `lsblk` first. `/dev/sda1` below is only an example.', body: 'Use ext4: NTFS and exFAT break hardlinks and Linux permissions. The `nofail` option stops the Pi hanging at boot if the drive is unplugged.', code: "lsblk\nsudo mkfs.ext4 -L media /dev/sda1\nsudo mkdir -p /mnt/media\nsudo blkid /dev/sda1\necho 'UUID=PASTE-UUID-HERE /mnt/media ext4 defaults,nofail 0 2' | sudo tee -a /etc/fstab\nsudo mount -a\ndf -h /mnt/media", done: 'df shows the drive mounted at /mnt/media.' },
  { title: 'Make the folders', body: 'Downloads and the library sit side by side under one root so they share a filesystem. The hardlink lab below shows why that matters.', code: 'sudo mkdir -p /mnt/media/data/downloads /mnt/media/data/media/tv /mnt/media/data/media/movies\nsudo chown -R 1000:1000 /mnt/media/data\nmkdir -p ~/stack/config', done: 'ls /mnt/media/data lists downloads and media.' },
  { group: 'Launch', title: 'Write the compose file and start', body: 'Build your file in the compose builder, save it as `~/stack/docker-compose.yml`, then start everything.', code: 'cd ~/stack\ndocker compose up -d\ndocker compose ps', done: 'compose ps lists your containers as running.' },
  { group: 'Connect the core apps', title: 'qBittorrent', port: 8080, body: 'Log in with the temporary password from the container log, set your own, and set the default save path to `/data/downloads`. Add a seeding limit whose action is to remove the torrent and its files, so space comes back.', code: 'docker logs qbittorrent 2>&1 | grep -i password', done: 'The save path is /data/downloads and a seeding limit is set.' },
  { title: 'Radarr and Sonarr', port: '7878 / 8989', body: 'Add a root folder (`/data/media/movies` in Radarr, `/data/media/tv` in Sonarr). Keep "Use Hardlinks instead of Copy" on. Add qBittorrent as the download client with the category `radarr` or `sonarr`, and copy each app\'s API key from Settings, General.', done: 'Test passes on the qBittorrent download client in both.' },
  { title: 'Prowlarr', port: 9696, body: "Add your indexers, then add Radarr and Sonarr under Settings, Apps, and sync. Use each app's API key, and the container name as the host.", done: 'Your indexers appear inside Radarr and Sonarr.' },
  { title: 'Jellyfin', port: 8096, body: 'Run the wizard and add two libraries: Movies at `/data/media/movies` and Shows at `/data/media/tv`. Then create an API key under Dashboard, API Keys for the helper apps.', done: 'Both libraries have scanned.' },
  { optional: true, title: 'Seerr', port: 5055, needs: ['Jellyfin', 'Radarr', 'Sonarr'], body: 'Sign in with Jellyfin, pick the libraries, and add Radarr and Sonarr as destinations with their root folders.', done: 'A test request travels all the way to Jellyfin.' },
  { optional: true, title: 'Bazarr', port: 6767, needs: ['Radarr', 'Sonarr'], body: 'Link Sonarr and Radarr with their API keys, add a subtitle provider, and set a default language profile that outputs SRT.', done: 'A test search returns a subtitle.' },
  { optional: true, title: 'FlareSolverr', port: 8191, needs: ['Prowlarr'], body: 'Only needed if an indexer sits behind a Cloudflare check page. In Prowlarr, add FlareSolverr as an indexer proxy (`http://flaresolverr:8191/`) with the tag `flaresolverr`, then put that tag on the indexers that need it.', done: 'A test on a Cloudflare-protected indexer passes.' },
  { optional: true, title: 'Maintainerr', port: 6246, needs: ['Jellyfin', 'Radarr', 'Sonarr'], warn: 'It deletes for real, with no undo. Run every rule in dry-run first.', body: 'Connect Jellyfin, Radarr, Sonarr and Seerr, then build a gentle rule, such as "added more than 180 days ago and not watched in 90 days". Turn on the grace period so titles sit in a Jellyfin collection first.', done: 'The dry-run list contains only titles you expected.' },
];

/* ---------- compose builder ---------- */

export interface Svc {
  image: string;
  /** linuxserver.io images take PUID, PGID and TZ. */
  ls?: boolean;
  init?: boolean;
  user?: boolean;
  env?: string[];
  vols?: string[];
  ports: string[];
}

export const SVCS: Record<AppId, Svc> = {
  jellyfin: { image: 'lscr.io/linuxserver/jellyfin:latest', ls: true, vols: ['./config/jellyfin:/config', '/mnt/media/data/media:/data/media'], ports: ['8096:8096'] },
  seerr: { image: 'ghcr.io/seerr-team/seerr:latest', init: true, env: ['TZ', 'PORT=5055', 'LOG_LEVEL=info'], vols: ['./config/seerr:/app/config'], ports: ['5055:5055'] },
  qbittorrent: { image: 'lscr.io/linuxserver/qbittorrent:latest', ls: true, env: ['WEBUI_PORT=8080'], vols: ['./config/qbittorrent:/config', '/mnt/media/data:/data'], ports: ['8080:8080', '6881:6881', '6881:6881/udp'] },
  radarr: { image: 'lscr.io/linuxserver/radarr:latest', ls: true, vols: ['./config/radarr:/config', '/mnt/media/data:/data'], ports: ['7878:7878'] },
  sonarr: { image: 'lscr.io/linuxserver/sonarr:latest', ls: true, vols: ['./config/sonarr:/config', '/mnt/media/data:/data'], ports: ['8989:8989'] },
  prowlarr: { image: 'lscr.io/linuxserver/prowlarr:latest', ls: true, vols: ['./config/prowlarr:/config'], ports: ['9696:9696'] },
  bazarr: { image: 'lscr.io/linuxserver/bazarr:latest', ls: true, vols: ['./config/bazarr:/config', '/mnt/media/data/media:/data/media'], ports: ['6767:6767'] },
  flaresolverr: { image: 'ghcr.io/flaresolverr/flaresolverr:latest', env: ['TZ', 'LOG_LEVEL=info'], ports: ['8191:8191'] },
  maintainerr: { image: 'ghcr.io/maintainerr/maintainerr:latest', user: true, env: ['TZ'], vols: ['./config/maintainerr:/opt/data'], ports: ['6246:6246'] },
};

/** The order the containers appear in the file and the picker. */
export const SORT: AppId[] = ['jellyfin', 'seerr', 'qbittorrent', 'radarr', 'sonarr', 'prowlarr', 'bazarr', 'flaresolverr', 'maintainerr'];
export const CORE_FIVE: AppId[] = ['jellyfin', 'qbittorrent', 'radarr', 'sonarr', 'prowlarr'];

/* ---------- hardlink lab ---------- */

export const MOMENTS = [
  { dl: 1, lib: 0 },
  { dl: 1, lib: 1 },
  { dl: 1, lib: 0 },
  { dl: 0, lib: 0 },
];

export const MOMENT_TITLES = ['Downloaded', 'Imported', 'Library copy deleted', 'Torrent removed'];

/** [same mount, separate mounts] */
export const CAPS: Array<[string, string]> = [
  ['qBittorrent finishes the download. The file sits in `downloads` and nothing else has happened yet.', 'qBittorrent finishes the download. The file sits in `downloads` and nothing else has happened yet.'],
  ['Radarr imports it as a hardlink. Two names, one file, and the disk does not grow. The torrent keeps seeding.', 'Radarr cannot hardlink across mounts, so it copies the whole file. The disk now holds the movie twice.'],
  ['Maintainerr deletes the library copy. The space is not freed: the download name still points at the same data.', 'Maintainerr deletes the library copy. You are back to one copy, but the torrent is still seeding the other.'],
  ['The seeding limit removes the torrent and its files. The last name goes, and the space comes back.', 'The seeding limit removes the torrent and its files. The space comes back, after a stretch of double usage.'],
];

/* ---------- troubleshooter ---------- */

export interface Snag {
  symptom: string;
  cause: string;
  fix: string;
  code?: string;
}

export const SNAGS: Snag[] = [
  { symptom: 'One app cannot reach another', cause: 'You entered localhost as the host. Inside a container, that is the container itself.', fix: "Use the container name, such as http://qbittorrent:8080, or the Pi's reserved IP." },
  { symptom: 'Downloads finish but never reach Jellyfin', cause: 'Mismatched paths or a missing mount.', fix: 'Make qBittorrent, Radarr and Sonarr all mount /mnt/media/data as /data.' },
  { symptom: 'Files copy instead of hardlink and the disk fills fast', cause: 'Download and library are on different mounts.', fix: 'Use the same /data root everywhere and keep hardlinks turned on.' },
  { symptom: 'Seerr or Maintainerr will not start', cause: 'The config folder is owned by root, so you get permission denied.', fix: 'Give the folders back to your user, then start again.', code: 'sudo chown -R 1000:1000 ~/stack/config/seerr ~/stack/config/maintainerr' },
  { symptom: 'Prowlarr indexer fails on a Cloudflare page', cause: 'FlareSolverr is not attached to that indexer.', fix: 'Check the proxy address http://flaresolverr:8191/ and that the indexer carries the same tag.' },
  { symptom: 'No subtitles appear', cause: 'Bazarr has no provider or no language profile.', fix: 'Add a provider, set a default profile, then search again.' },
  { symptom: 'Deleted titles still use disk space', cause: 'The torrent is still seeding the hardlink.', fix: 'Add a qBittorrent seeding limit whose action removes the torrent and its files.' },
  { symptom: 'TV stutters or buffers', cause: 'The Pi is transcoding, or the link runs at 100 Mbps.', fix: 'Pick formats your TV plays natively, use SRT subtitles, and check the cable speed. It should print 1000.', code: 'cat /sys/class/net/eth0/speed' },
  { symptom: 'Everything is gone after a reboot', cause: 'The drive was not mounted.', fix: 'Mount it, then bring the stack back up.', code: 'sudo mount -a && docker compose up -d' },
];

export const UPDATE_COMMANDS = 'cd ~/stack && docker compose pull && docker compose up -d\ndocker compose ps\ndocker logs --tail 50 sonarr\ndf -h /mnt/media';
