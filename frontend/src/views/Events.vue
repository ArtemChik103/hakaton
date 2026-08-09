<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-16 pt-4 text-left">
    
    <!-- Top Header -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
      <div>
        <div class="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-cyan-400 mb-1">
          <span>⚡ Динамическая Самозагрузка</span>
          <span>•</span>
          <span class="text-emerald-400">Парсинг по URL и API</span>
        </div>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-100">
          Календарь IT-Событий
        </h1>
        <p class="text-slate-400 text-xs mt-1">
          Мероприятия загружаются автоматически из сети. Вы также можете распарсить любое событие просто вставив его ссылку.
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-wrap items-center gap-2">
        <button @click="showUrlModal = true" class="btn btn-primary text-xs px-4 py-2.5 flex items-center space-x-1.5">
          <span>✨ Авто-парсер по URL</span>
        </button>
        <button @click="showAddModal = true" class="btn btn-secondary text-xs px-4 py-2.5">
          ➕ Добавить новое событие
        </button>
      </div>
    </div>

    <!-- Regional Scope Switcher -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between bg-slate-900/80 border border-cyan-500/30 p-2.5 rounded-2xl gap-3">
      <div class="flex items-center space-x-2">
        <span class="text-xs font-mono text-cyan-400 pl-2">Фильтр:</span>
        <button 
          @click="regionFilter = 'all'"
          class="px-4 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all border"
          :class="regionFilter === 'all' ? 'bg-cyan-500 text-white border-cyan-400 shadow-md shadow-cyan-500/20' : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'"
        >
          🌐 Все события и парсинг
        </button>
        <button 
          @click="regionFilter = 'amur'"
          class="px-4 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all border"
          :class="regionFilter === 'amur' ? 'bg-cyan-500 text-white border-cyan-400 shadow-md shadow-cyan-500/20' : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'"
        >
          📍 Амурская область & ДФО
        </button>
      </div>
      <span class="text-[11px] font-mono text-emerald-400">
        Динамических событий в ленте: {{ events.length }}
      </span>
    </div>

    <!-- Filter Bar -->
    <div class="card-glass p-5 space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
        
        <!-- Search Input -->
        <div class="md:col-span-6">
          <label class="form-label">Поиск по названию, источнику или тегу</label>
          <div class="relative">
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Благовещенск, Python, GitHub, Leader-ID..." 
              class="form-input pl-10"
            />
            <span class="absolute left-3.5 top-2.5 text-slate-500">🔍</span>
          </div>
        </div>

        <!-- Event Type -->
        <div class="md:col-span-4">
          <label class="form-label">Тип мероприятия</label>
          <select v-model="selectedType" class="form-input">
            <option value="all">Все типы (Хакатоны, Митапы...)</option>
            <option value="hackathon">🏆 Хакатоны</option>
            <option value="meetup">🤝 Митапы</option>
            <option value="conference">🎤 Конференции</option>
          </select>
        </div>

        <!-- Reset Button -->
        <div class="md:col-span-2 flex items-end">
          <button @click="resetFilters" class="w-full btn btn-secondary py-2.5 text-xs">
            Сбросить
          </button>
        </div>
      </div>
    </div>

    <!-- Grid View -->
    <div class="space-y-6">
      <div v-if="filteredEvents.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="event in filteredEvents" 
          :key="event.id" 
          class="card-glass card-interactive flex flex-col justify-between"
        >
          <div class="space-y-3">
            <!-- Header Badges -->
            <div class="flex items-center justify-between">
              <span :class="getTypeBadgeClass(event.type)" class="badge">
                {{ getEventTypeName(event.type) }}
              </span>
              <span class="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/50 truncate max-w-[140px]">
                🔗 {{ event.sourceSite || 'Источник' }}
              </span>
            </div>

            <!-- Title -->
            <h3 class="text-xl font-bold text-slate-100 hover:text-cyan-400 transition cursor-pointer" @click="openEventDetails(event)">
              {{ event.title }}
            </h3>

            <!-- Description -->
            <p class="text-xs text-slate-400 line-clamp-3 leading-relaxed">
              {{ event.description }}
            </p>

            <!-- Tags -->
            <div v-if="event.tags" class="flex flex-wrap gap-1.5 pt-1">
              <span v-for="tag in event.tags" :key="tag" class="px-2 py-0.5 rounded bg-slate-950 text-[10px] font-mono text-slate-400 border border-slate-800">
                #{{ tag }}
              </span>
            </div>
          </div>

          <!-- Bottom Footer -->
          <div class="pt-4 mt-4 border-t border-slate-800 space-y-3">
            <div class="flex items-center justify-between text-xs font-mono">
              <span class="text-slate-300">📅 {{ formatDate(event.startDate) }}</span>
              <span v-if="event.prizePool" class="text-cyan-400 font-bold">
                🏆 {{ event.prizePool }}
              </span>
            </div>

            <div class="grid grid-cols-2 gap-2">
              <button @click="openEventDetails(event)" class="btn btn-secondary py-2 text-xs">
                Подробнее
              </button>
              <a 
                :href="event.registrationLink" 
                target="_blank" 
                rel="noopener noreferrer"
                class="btn btn-primary py-2 text-xs flex items-center justify-center space-x-1"
              >
                <span>Перейти ↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="card-glass p-12 text-center space-y-3">
        <span class="text-4xl">🔍</span>
        <h3 class="text-lg font-bold text-slate-200">Мероприятий не найдено</h3>
        <p class="text-xs text-slate-400">Вы можете распарсить новое событие по ссылке через кнопку «Авто-парсер по URL».</p>
        <button @click="showUrlModal = true" class="btn btn-primary text-xs px-4 py-2">✨ Распарсить по URL</button>
      </div>
    </div>

    <!-- URL AUTO-PARSER MODAL -->
    <div v-if="showUrlModal" class="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div class="card-glass max-w-lg w-full border-cyan-500/40 space-y-6 relative animate-fadeIn">
        <button @click="showUrlModal = false" class="absolute top-4 right-4 text-slate-400 hover:text-slate-100 text-xl">
          ✕
        </button>

        <div class="space-y-1">
          <span class="badge badge-cyan">✨ ДИНАМИЧЕСКИЙ АВТО-ПАРСЕР</span>
          <h3 class="text-xl font-bold text-slate-100">Импорт события по ссылке</h3>
          <p class="text-xs text-slate-400">Вставьте любую ссылку на анонс хакатона или IT-мероприятия:</p>
        </div>

        <div class="space-y-3">
          <input 
            v-model="inputUrl" 
            type="url" 
            placeholder="https://leader-id.ru/events/... или https://hacks-ai.ru/" 
            class="form-input"
          />
          <button @click="handleUrlParse" :disabled="parsing" class="w-full btn btn-primary py-3 text-sm flex items-center justify-center space-x-2">
            <span v-if="parsing">⏳ Выполняем авто-парсинг страницы...</span>
            <span v-else>⚡ Распарсить и добавить в ленту</span>
          </button>
        </div>

        <div v-if="parseSuccess" class="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-400 font-mono text-center">
          ✅ Событие успешно распарсено и добавлено в единый календарь!
        </div>
      </div>
    </div>

    <!-- ADD EVENT MANUAL MODAL -->
    <div v-if="showAddModal" class="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div class="card-glass max-w-lg w-full border-slate-700 space-y-4 relative animate-fadeIn">
        <button @click="showAddModal = false" class="absolute top-4 right-4 text-slate-400 hover:text-slate-100 text-xl">
          ✕
        </button>

        <h3 class="text-xl font-bold text-slate-100">Добавить мероприятие вручную</h3>

        <form @submit.prevent="handleManualAdd" class="space-y-3">
          <div>
            <label class="form-label">Название мероприятия</label>
            <input v-model="newEventForm.title" type="text" required placeholder="Например: AmurTech Hack" class="form-input text-xs" />
          </div>
          <div>
            <label class="form-label">Прямая ссылка на регистрацию</label>
            <input v-model="newEventForm.link" type="url" required placeholder="https://..." class="form-input text-xs" />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="form-label">Город</label>
              <input v-model="newEventForm.city" type="text" placeholder="Благовещенск" class="form-input text-xs" />
            </div>
            <div>
              <label class="form-label">Тип</label>
              <select v-model="newEventForm.type" class="form-input text-xs">
                <option value="hackathon">Хакатон</option>
                <option value="meetup">Митап</option>
                <option value="conference">Конференция</option>
              </select>
            </div>
          </div>
          <div>
            <label class="form-label">Описание</label>
            <textarea v-model="newEventForm.desc" rows="2" placeholder="Краткое описание события..." class="form-input text-xs"></textarea>
          </div>
          <button type="submit" class="w-full btn btn-primary py-2.5 text-xs">
            Сохранить в ленту
          </button>
        </form>
      </div>
    </div>

    <!-- EVENT DETAIL MODAL -->
    <div v-if="selectedEvent" class="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div class="card-glass max-w-2xl w-full border-slate-700 space-y-6 relative animate-fadeIn">
        <button @click="selectedEvent = null" class="absolute top-4 right-4 text-slate-400 hover:text-slate-100 text-xl">
          ✕
        </button>

        <div class="space-y-2">
          <div class="flex items-center space-x-2">
            <span :class="getTypeBadgeClass(selectedEvent.type)" class="badge">
              {{ getEventTypeName(selectedEvent.type) }}
            </span>
            <span class="badge badge-cyan">{{ selectedEvent.format.toUpperCase() }}</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-100">
            {{ selectedEvent.title }}
          </h2>
          <p class="text-xs font-mono text-cyan-400">
            Прямой URL: <a :href="selectedEvent.registrationLink" target="_blank" class="underline hover:text-cyan-300">{{ selectedEvent.registrationLink }} ↗</a>
          </p>
        </div>

        <div class="space-y-2 text-sm text-slate-300 leading-relaxed whitespace-pre-line border-t border-b border-slate-800 py-4">
          {{ selectedEvent.description }}
        </div>

        <div class="flex items-center justify-between">
          <a :href="selectedEvent.registrationLink" target="_blank" rel="noopener noreferrer" class="btn btn-primary px-6 py-2.5 text-xs">
            Перейти на сайт события ↗
          </a>
          <button @click="selectedEvent = null" class="btn btn-secondary text-xs px-4 py-2">
            Закрыть
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import api from '@/services/api';
import { parseEventFromUrl, saveDynamicEvent } from '@/services/eventScraper';

export default {
  name: 'EventsPage',
  data() {
    return {
      events: [],
      regionFilter: 'all',
      searchQuery: '',
      selectedType: 'all',
      selectedEvent: null,
      showUrlModal: false,
      showAddModal: false,
      inputUrl: '',
      parsing: false,
      parseSuccess: false,
      newEventForm: {
        title: '',
        link: '',
        city: 'Благовещенск',
        type: 'hackathon',
        desc: ''
      }
    }
  },
  computed: {
    filteredEvents() {
      return this.events.filter(event => {
        if (this.regionFilter === 'amur' && !event.isAmurRegion) return false;
        if (this.selectedType !== 'all' && event.type !== this.selectedType) return false;
        if (this.searchQuery) {
          const q = this.searchQuery.toLowerCase();
          const matchTitle = event.title.toLowerCase().includes(q);
          const matchDesc = event.description.toLowerCase().includes(q);
          const matchSource = event.sourceSite && event.sourceSite.toLowerCase().includes(q);
          return matchTitle || matchDesc || matchSource;
        }
        return true;
      });
    }
  },
  async created() {
    await this.loadEvents();
  },
  methods: {
    async loadEvents() {
      this.events = await api.getEvents();
    },
    async handleUrlParse() {
      if (!this.inputUrl) return;
      this.parsing = true;
      try {
        await parseEventFromUrl(this.inputUrl);
        this.parseSuccess = true;
        await this.loadEvents();
        setTimeout(() => {
          this.parsing = false;
          this.parseSuccess = false;
          this.showUrlModal = false;
          this.inputUrl = '';
        }, 1200);
      } catch (e) {
        alert(e.message || 'Ошибка парсинга по указанной ссылке');
        this.parsing = false;
      }
    },
    async handleManualAdd() {
      let domain = 'источник';
      try {
        domain = new URL(this.newEventForm.link).hostname.replace('www.', '');
      } catch (e) {}

      const customEvent = {
        id: `manual-${Date.now()}`,
        title: this.newEventForm.title,
        slug: `manual-${Date.now()}`,
        description: this.newEventForm.desc || 'Событие добавлено организатором.',
        type: this.newEventForm.type,
        format: 'offline',
        city: this.newEventForm.city || 'Благовещенск',
        location: 'Добавлено пользователем',
        startDate: new Date(Date.now() + 5 * 86400000).toISOString(),
        organizer: domain,
        registrationLink: this.newEventForm.link,
        sourceSite: domain,
        isAmurRegion: this.newEventForm.city.toLowerCase().includes('благовещенск') || this.newEventForm.city.toLowerCase().includes('амур'),
        isLiveParsed: true,
        tags: ['Добавлено', this.newEventForm.city]
      };

      saveDynamicEvent(customEvent);
      await this.loadEvents();
      this.showAddModal = false;
      this.newEventForm = { title: '', link: '', city: 'Благовещенск', type: 'hackathon', desc: '' };
    },
    openEventDetails(event) {
      this.selectedEvent = event;
    },
    resetFilters() {
      this.searchQuery = '';
      this.selectedType = 'all';
      this.regionFilter = 'all';
    },
    formatDate(dateObj) {
      if (!dateObj) return '';
      const date = new Date(dateObj);
      return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
    },
    getEventTypeName(type) {
      const names = { hackathon: 'Хакатон', meetup: 'Митап', conference: 'Конференция' };
      return names[type] || 'Событие';
    },
    getTypeBadgeClass(type) {
      const classes = { hackathon: 'badge-cyan', meetup: 'badge-indigo', conference: 'badge-emerald' };
      return classes[type] || 'badge-cyan';
    }
  }
}
</script>