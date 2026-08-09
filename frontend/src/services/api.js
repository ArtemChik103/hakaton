import axios from 'axios';
import { fetchLiveParsedEvents } from '@/services/eventScraper';
import { realNewsData } from '@/data/realNewsData';
import { achievementsData } from '@/data/achievementsData';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 4000,
});

export default {
  // Мероприятия с поддержкой живого авто-парсинга сторонних IT-сайтов
  async getEvents(params = {}) {
    try {
      const response = await apiClient.get('/events/', { params });
      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        return response.data;
      }
      const liveEvents = await fetchLiveParsedEvents();
      return this.filterEventsLocally(liveEvents, params);
    } catch (error) {
      console.warn('Backend API недоступен, включен живой авто-парсер мероприятий:', error.message);
      const liveEvents = await fetchLiveParsedEvents();
      return this.filterEventsLocally(liveEvents, params);
    }
  },

  filterEventsLocally(events, params) {
    let result = [...events];
    if (params.type && params.type !== 'all') {
      result = result.filter(e => e.type === params.type);
    }
    if (params.format && params.format !== 'all') {
      result = result.filter(e => e.format === params.format);
    }
    if (params.city && params.city !== 'all') {
      result = result.filter(e => e.city.toLowerCase().includes(params.city.toLowerCase()));
    }
    if (params.search) {
      const query = params.search.toLowerCase();
      result = result.filter(e => 
        e.title.toLowerCase().includes(query) || 
        e.description.toLowerCase().includes(query) ||
        (e.tags && e.tags.some(t => t.toLowerCase().includes(query)))
      );
    }
    return result;
  },

  // Новости
  async getNews() {
    try {
      const response = await apiClient.get('/news/');
      if (response.data && response.data.length > 0) {
        return response.data;
      }
      return realNewsData;
    } catch (error) {
      return realNewsData;
    }
  },

  // Достижения
  async getAchievements() {
    try {
      const response = await apiClient.get('/achievements/');
      if (response.data && response.data.length > 0) {
        return response.data;
      }
      return achievementsData;
    } catch (error) {
      return achievementsData;
    }
  },

  // Профиль пользователя
  getUserProfile() {
    return {
      id: 101,
      username: 'alex_dev',
      fullName: 'Александр Второв',
      role: 'Senior Fullstack Engineer & Team Lead',
      bio: 'Разрабатываю веб-платформы, увлечен Vue 3, Python/Django и ИИ-агентами. Участник и финалист хакатонов в Амурской области.',
      city: 'Благовещенск',
      level: 7,
      xp: 2850,
      nextLevelXp: 3500,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      skills: ['Vue 3', 'Vite', 'Python', 'Django', 'Tailwind CSS', 'Docker', 'PostgreSQL'],
      registeredEvents: [101, 102],
      savedEvents: [103, 106],
      telegram: '@alex_vtorov',
      github: 'https://github.com/vtorov'
    };
  }
};
