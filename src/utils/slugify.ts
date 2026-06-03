/** Slugify a tag/category for use in URLs.
 * Supports Unicode characters natively using ECMAScript Unicode property escapes.
 */
export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^\p{L}\p{N}\p{M}-]+/gu, '') // Keep Unicode letters, numbers, marks, and hyphens
    .replace(/--+/g, '-') // Replace multiple hyphens with a single hyphen
    .replace(/^-+|-+$/g, ''); // Trim hyphens from start and end
}
