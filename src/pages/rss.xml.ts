import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { pairByLang } from '../utils/i18n';

export async function GET(context: { site: URL }) {
  const posts = await getCollection('blog');
  const pairs = pairByLang(posts);

  const items = [...pairs.entries()]
    .filter(([_, pair]) => !(pair.en?.data.draft ?? pair.zh?.data.draft ?? false))
    .map(([key, pair]) => {
      const entry = pair.en ?? pair.zh!;
      return {
        title: entry.data.title,
        pubDate: entry.data.date,
        description: entry.data.excerpt,
        link: `/blog/${key}/`,
      };
    })
    .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: 'Yumin Cao',
    description: 'AI agent engineer at Xiaomi. Building agents, writing about what that means. | 小米 AI Agent 工程师',
    site: context.site?.href ?? 'https://caoyumin97.github.io',
    items,
  });
}
