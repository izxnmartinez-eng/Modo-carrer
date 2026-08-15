/**
 * Tiny dependency-free fuzzy matcher.
 *
 * Scoring, highest first:
 *   1000  exact match on a field
 *    800  field starts with the query
 *    600  a word inside the field starts with the query
 *    400  the field contains the query
 *   1-300 subsequence match ("mstn" → "Mastantuono"), scored by how tight it is
 */

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

function subsequenceScore(haystack: string, needle: string): number {
  let hi = 0;
  let firstHit = -1;
  let lastHit = -1;
  for (let ni = 0; ni < needle.length; ni++) {
    const ch = needle[ni]!;
    let found = -1;
    while (hi < haystack.length) {
      if (haystack[hi] === ch) {
        found = hi;
        hi++;
        break;
      }
      hi++;
    }
    if (found === -1) return 0;
    if (firstHit === -1) firstHit = found;
    lastHit = found;
  }
  // Tighter spans and earlier starts score better.
  const span = lastHit - firstHit + 1;
  const density = needle.length / span;
  const earliness = 1 - firstHit / Math.max(haystack.length, 1);
  return Math.round(density * 220 + earliness * 80);
}

/** Score one field against a query. Returns 0 when there is no match at all. */
export function scoreField(field: string, query: string): number {
  if (!query) return 0;
  const h = normalize(field);
  const n = normalize(query);
  if (!h) return 0;
  if (h === n) return 1000;
  if (h.startsWith(n)) return 800;
  if (h.split(/[\s\-'.]+/).some((word) => word.startsWith(n))) return 600;
  if (h.includes(n)) return 400;
  return subsequenceScore(h, n);
}

/** Best score across several fields, with per-field weights applied. */
export function scoreRecord(fields: { value: string | null; weight: number }[], query: string): number {
  let best = 0;
  for (const { value, weight } of fields) {
    if (!value) continue;
    const score = scoreField(value, query) * weight;
    if (score > best) best = score;
  }
  return best;
}
