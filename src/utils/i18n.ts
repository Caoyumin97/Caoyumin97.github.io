/**
 * i18n helpers for pairing bilingual content.
 *
 * Convention: English file = `slug.md`, Chinese file = `slug.zh.md`.
 * Astro's glob loader strips dots, so `slug.zh.md` → ID `slugzh`.
 * We use the `lang` frontmatter field to determine language,
 * and strip the trailing `zh` from Chinese entry IDs to get the pair key.
 */

/**
 * Group a flat list of content entries into bilingual pairs.
 * Returns a Map of pairKey → { en?, zh? }.
 */
export function pairByLang<T extends { id: string; data: { lang: string } }>(
  entries: T[],
): Map<string, { en?: T; zh?: T }> {
  const map = new Map<string, { en?: T; zh?: T }>();
  for (const entry of entries) {
    // Chinese entries have IDs ending in "zh" (from `slug.zh.md` → `slugzh`)
    // English entries have clean IDs (from `slug.md` → `slug`)
    const isZh = entry.data.lang === 'zh';
    const key = isZh ? entry.id.replace(/zh$/, '') : entry.id;
    const pair = map.get(key) ?? {};
    if (isZh) {
      pair.zh = entry;
    } else {
      pair.en = entry;
    }
    map.set(key, pair);
  }
  return map;
}
