const OPENF1 = 'https://api.openf1.org/v1';
const NEWS_FEED = 'https://www.autosport.com/rss/f1/news/';

async function getJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Falha ao consultar dados (${response.status})`);
  return response.json();
}

export async function getLatestSession() {
  const sessions = await getJson(`${OPENF1}/sessions?session_key=latest`);
  const session = sessions?.[0];
  if (!session) return { session: null, positions: [], live: false };

  const [positions, drivers] = await Promise.all([
    getJson(`${OPENF1}/position?session_key=${session.session_key}`).catch(() => []),
    getJson(`${OPENF1}/drivers?session_key=${session.session_key}`).catch(() => []),
  ]);
  const now = Date.now();
  const start = session.date_start ? new Date(session.date_start).getTime() : 0;
  const end = session.date_end ? new Date(session.date_end).getTime() : 0;
  const live = start > 0 && end > 0 && now >= start && now <= end;
  const latest = new Map();
  positions.forEach((entry) => {
    const previous = latest.get(entry.driver_number);
    if (!previous || new Date(entry.date) > new Date(previous.date)) latest.set(entry.driver_number, entry);
  });
  const driverMap = new Map(drivers.map((driver) => [driver.driver_number, driver]));
  return {
    session, live,
    positions: [...latest.values()].sort((a, b) => a.position - b.position).slice(0, 10)
      .map((entry) => ({ ...entry, driver: driverMap.get(entry.driver_number) })),
  };
}

function decode(value = '') {
  return value.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&').replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/<[^>]+>/g, '').trim();
}

export async function getLatestNews() {
  const response = await fetch(NEWS_FEED);
  if (!response.ok) throw new Error('Falha ao carregar notícias.');
  const xml = await response.text();
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)].slice(0, 12).map((match, index) => {
    const item = match[1];
    const read = (tag) => decode(item.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'))?.[1] || '');
    return { id: `${index}-${read('guid') || read('link')}`, title: read('title'), link: read('link'), date: read('pubDate'), description: read('description') };
  }).filter((item) => item.title && item.link);
}
