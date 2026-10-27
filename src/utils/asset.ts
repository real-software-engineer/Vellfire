declare const __ASSET_BASE__: string;

/**
 * URL for a file in /public. Uses the configured base, which is relative ("./"),
 * so the same build works at a domain root and under a GitHub Pages repository
 * path — and in the prerendered HTML, which is why images live in /public rather
 * than being imported.
 */
export function asset(path: string): string {
  return `${__ASSET_BASE__}${path}`;
}
