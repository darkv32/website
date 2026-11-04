/* What the guestbook needs to know about its database, from the environment alone. It imports nothing, so the proxy and the sitemap can ask whether the guestbook is open without loading the database client. */

export const url = () => process.env.TURSO_DATABASE_URL?.trim() ?? '';
export const token = () => process.env.TURSO_AUTH_TOKEN?.trim() ?? '';

/** True once there is somewhere to store messages: a Turso URL with its token, or a local `file:` database for development. */
export function isLive(): boolean {
  const u = url();
  return !!u && (u.startsWith('file:') || !!token());
}
