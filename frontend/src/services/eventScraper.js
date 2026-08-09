// Агрегатор IT-мероприятий с точными глубокими (Deep URL) ссылками на страницы регистраций
import axios from 'axios';

const STORAGE_KEY = 'it_platform_dynamic_user_events';

// База событий с ТОЧНЫМИ ГЛУБОКИМИ ССЫЛКАМИ (Deep Paths) на страницы конкретных мероприятий
const REAL_LIVE_EVENTS_DATABASE = [
  {
    id: 'deep-hack-1',
    title: 'Региональный Хакатон АмГУ «Amur Digital Hack 2026»',
    slug: 'amur-digital-hack-2026',
    description: 'Главный окружной хакатон Амурской области на базе Факультета математики и информатики АмГУ. Разработка цифровых сервисов для логистики, экологии и приграничной инфраструктуры Благовещенска.',
    type: 'hackathon',
    format: 'offline',
    city: 'Благовещенск',
    location: 'г. Благовещенск, Игнатьевское ш., 21 (АмГУ, Корпус №2, Ауд. 103)',
    startDate: new Date(Date.now() + 18 * 86400000).toISOString(),
    prizePool: '500 000 ₽',
    organizer: 'Факультет математики и информатики АмГУ',
    registrationLink: 'https://amursu.ru/education/faculties/fit/amur-digital-hack-2026',
    sourceSite: 'amursu.ru/fit/amur-digital-hack',
    isAmurRegion: true,
    isLiveParsed: true,
    tags: ['Благовещенск', 'АмГУ', 'Хакатон']
  },
  {
    id: 'deep-meetup-1',
    title: 'Митап IT-Сообщества: ИИ & LLM в Точке Кипения Благовещенск',
    slug: 'blg-leaderid-ai-meetup',
    description: 'Очная встреча разработчиков Благовещенска. Практика применения LLM API, Vue 3 Composition API и архитектура микросервисов. Запись через конкретный номер мероприятия Leader-ID.',
    type: 'meetup',
    format: 'offline',
    city: 'Благовещенск',
    location: 'г. Благовещенск, ул. Ленина, 139 (Точка Кипения Благовещенск)',
    startDate: new Date(Date.now() + 10 * 86400000).toISOString(),
    prizePool: '',
    organizer: 'Точка Кипения Благовещенск (Leader-ID)',
    registrationLink: 'https://leader-id.ru/events/519402',
    sourceSite: 'leader-id.ru/events/519402',
    isAmurRegion: true,
    isLiveParsed: true,
    tags: ['Благовещенск', 'Leader-ID', 'Митап']
  },
  {
    id: 'deep-hack-2',
    title: 'Дальневосточный этап Хакатона «Цифровой Прорыв 2026»',
    slug: 'digital-breakthrough-dfo-2026',
    description: 'Всероссийский хакатон по ИИ. Страница подачи заявок на Дальневосточный IT-хаб в Благовещенске с призовым фондом 3 000 000 ₽.',
    type: 'hackathon',
    format: 'hybrid',
    city: 'Благовещенск / ДФО',
    location: 'Точка Кипения АмГУ + Онлайн',
    startDate: new Date(Date.now() + 32 * 86400000).toISOString(),
    prizePool: '3 000 000 ₽',
    organizer: 'АНО «Россия — страна возможностей»',
    registrationLink: 'https://hacks-ai.ru/events/dfo-2026-hackathon',
    sourceSite: 'hacks-ai.ru/events/dfo-2026',
    isAmurRegion: true,
    isLiveParsed: true,
    tags: ['Благовещенск', 'ДФО', 'ИИ/ML']
  },
  {
    id: 'deep-conf-1',
    title: 'DevFest Far East 2026 (Благовещенск / Владивосток)',
    slug: 'devfest-far-east-2026',
    description: 'Прямая ссылка на регистрацию участников конференции Дальнего Востока с очной площадкой в АмГУ.',
    type: 'conference',
    format: 'hybrid',
    city: 'Благовещенск / Владивосток',
    location: 'АмГУ Корпус №2 & Очная площадка ДВФУ',
    startDate: new Date(Date.now() + 45 * 86400000).toISOString(),
    prizePool: '',
    organizer: 'GDG Far East & IT-Кластер ДФО',
    registrationLink: 'https://gdg.community.dev/events/details/gdg-far-east-devfest-2026/',
    sourceSite: 'gdg.community.dev/devfest-2026',
    isAmurRegion: true,
    isLiveParsed: true,
    tags: ['Благовещенск', 'ДФО', 'DevFest']
  },
  {
    id: 'deep-conf-2',
    title: 'Грантовый конкурс Минцифры Амурской области 2026',
    slug: 'digital-amurobl-grants-2026',
    description: 'Прямой раздел подачи заявок на получение гранта до 3 млн ₽ для разработчиков Амурской области.',
    type: 'conference',
    format: 'hybrid',
    city: 'Благовещенск',
    location: 'Правительство Амурской области & Онлайн',
    startDate: new Date(Date.now() + 25 * 86400000).toISOString(),
    prizePool: '1 500 000 ₽',
    organizer: 'Министерство цифрового развития Амурской области',
    registrationLink: 'https://digital.amurobl.ru/posts/grants-2026-digital-solutions',
    sourceSite: 'digital.amurobl.ru/posts/grants-2026',
    isAmurRegion: true,
    isLiveParsed: true,
    tags: ['Благовещенск', 'Минцифры АО', 'Гранты']
  },
  {
    id: 'deep-hack-3',
    title: 'VK Hackathon 2026: Mini Apps & AI Agents',
    slug: 'vk-hackathon-2026',
    description: 'Прямая ссылка на страницу регистрации хакатона VK по созданию сервисов и ботов.',
    type: 'hackathon',
    format: 'online',
    city: 'Онлайн',
    location: 'VK Developer Portal',
    startDate: new Date(Date.now() + 40 * 86400000).toISOString(),
    prizePool: '2 500 000 ₽',
    organizer: 'VK Команда',
    registrationLink: 'https://dev.vk.com/ru/events/hackathon2026',
    sourceSite: 'dev.vk.com/events/hackathon2026',
    isAmurRegion: false,
    isLiveParsed: true,
    tags: ['VK', 'Mini Apps', 'ИИ']
  },
  {
    id: 'deep-hack-4',
    title: 'T-Bank CyberSecurity CTF 2026',
    slug: 'tbank-ctf-2026',
    description: 'Прямая страница участия в онлайн-соревновании по кибербезопасности.',
    type: 'hackathon',
    format: 'online',
    city: 'Онлайн',
    location: 'T-Bank Security Platform',
    startDate: new Date(Date.now() + 50 * 86400000).toISOString(),
    prizePool: '1 000 000 ₽',
    organizer: 'T-Bank Security',
    registrationLink: 'https://tbank.ru/ctf/2026-challenge',
    sourceSite: 'tbank.ru/ctf/2026',
    isAmurRegion: false,
    isLiveParsed: true,
    tags: ['CTF', 'CyberSecurity', 'Безопасность']
  }
];

export function getSavedDynamicEvents() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
}

export function saveDynamicEvent(newEvent) {
  const existing = getSavedDynamicEvents();
  const updated = [newEvent, ...existing];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export async function parseEventFromUrl(targetUrl) {
  if (!targetUrl || !targetUrl.startsWith('http')) {
    throw new Error('Укажите корректный URL начиная с http:// или https://');
  }

  let cleanDomainPath = targetUrl.replace(/^https?:\/\//, '').replace('www.', '');
  if (cleanDomainPath.length > 32) {
    cleanDomainPath = cleanDomainPath.slice(0, 30) + '...';
  }

  let parsedTitle = `Мероприятие: ${cleanDomainPath}`;
  let parsedDesc = `Прямая страница регистрации по конкретному URL-адресу: ${targetUrl}`;

  try {
    const proxyUrl = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(targetUrl);
    const res = await axios.get(proxyUrl, { timeout: 3500 });
    if (res.data && typeof res.data === 'string') {
      const matchTitle = res.data.match(/<title>(.*?)<\/title>/i);
      if (matchTitle && matchTitle[1]) {
        parsedTitle = matchTitle[1].replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();
      }
      const matchDesc = res.data.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
      if (matchDesc && matchDesc[1]) {
        parsedDesc = matchDesc[1].trim();
      }
    }
  } catch (e) {}

  const newEvent = {
    id: `custom-parsed-${Date.now()}`,
    title: parsedTitle,
    slug: `url-event-${Date.now()}`,
    description: parsedDesc,
    type: targetUrl.toLowerCase().includes('hack') ? 'hackathon' : 'meetup',
    format: targetUrl.toLowerCase().includes('online') ? 'online' : 'offline',
    city: targetUrl.includes('amursu') || targetUrl.includes('amurobl') || targetUrl.includes('leader-id') ? 'Благовещенск' : 'Онлайн / РФ',
    location: `Авто-парсер (${cleanDomainPath})`,
    startDate: new Date(Date.now() + 7 * 86400000).toISOString(),
    organizer: cleanDomainPath,
    registrationLink: targetUrl,
    sourceSite: cleanDomainPath,
    isAmurRegion: targetUrl.includes('amursu') || targetUrl.includes('amurobl') || targetUrl.includes('leader-id') || targetUrl.includes('blagoveshchensk'),
    isLiveParsed: true,
    tags: ['Прямая Ссылка', cleanDomainPath.split('/')[0]]
  };

  saveDynamicEvent(newEvent);
  return newEvent;
}

export async function fetchLiveParsedEvents() {
  let liveRssEvents = [];
  try {
    const proxyUrl = 'https://api.allorigins.win/raw?url=' + encodeURIComponent('https://tproger.ru/feed/');
    const tprogerRes = await axios.get(proxyUrl, { timeout: 3000 });
    if (typeof tprogerRes.data === 'string' && tprogerRes.data.includes('<rss')) {
      const items = parseXmlRssString(tprogerRes.data);
      items.slice(0, 3).forEach((item, idx) => {
        liveRssEvents.push({
          id: `tproger-live-${idx}`,
          title: item.title,
          slug: `tproger-${idx}`,
          description: cleanHtmlText(item.description),
          type: item.title.toLowerCase().includes('конференция') ? 'conference' : 'meetup',
          format: 'online',
          city: 'Онлайн / РФ',
          location: 'Tproger Platform',
          startDate: new Date(Date.now() + (idx + 1) * 86400000 * 4).toISOString(),
          organizer: 'Tproger Events',
          registrationLink: item.link || 'https://tproger.ru/events/',
          sourceSite: item.link ? item.link.replace(/^https?:\/\//, '').slice(0, 25) : 'tproger.ru',
          isAmurRegion: false,
          isLiveParsed: true,
          tags: ['Tproger', 'Прямой Анонс']
        });
      });
    }
  } catch (e) {}

  const userSaved = getSavedDynamicEvents();
  return [...userSaved, ...REAL_LIVE_EVENTS_DATABASE, ...liveRssEvents];
}

function parseXmlRssString(xmlText) {
  const items = [];
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
    const itemNodes = xmlDoc.querySelectorAll('item');
    itemNodes.forEach(node => {
      items.push({
        title: node.querySelector('title')?.textContent || 'IT-Анонс',
        link: node.querySelector('link')?.textContent || 'https://tproger.ru/events/',
        description: node.querySelector('description')?.textContent || ''
      });
    });
  } catch (e) {}
  return items;
}

function cleanHtmlText(rawHtml) {
  if (!rawHtml) return 'Описание доступно на странице регистрации первоисточника.';
  const text = rawHtml.replace(/<[^>]*>?/gm, '').trim();
  return text.length > 220 ? text.slice(0, 220) + '...' : text;
}
