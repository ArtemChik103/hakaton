<template>
  <div class="events-page">
    <!-- Баннер -->
    <div class="hero-section relative overflow-hidden mb-8 fade-in-down">
      <div class="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
        <div class="h-full w-full bg-opacity-20 bg-white">
          <div class="h-full w-full flex items-center justify-center">
            <div class="transform -rotate-12 spin-slow">
              <svg class="h-24 w-24 text-white opacity-10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 002 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <div class="relative z-10 px-6 py-12 lg:py-16 lg:px-8">
        <div class="max-w-lg">
          <h1 class="hero-title text-3xl font-bold text-white sm:text-4xl">
            Календарь IT-мероприятий
          </h1>
          <p class="mt-4 text-lg text-blue-100">
            Актуальный календарь IT-событий Амурской области. Найдите интересные мероприятия, 
            хакатоны, встречи сообществ и конференции.
          </p>
        </div>
      </div>
    </div>

    <!-- Основной контент -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Левая колонка (на мобильных устройствах сверху) -->
      <div class="lg:col-span-2 fade-in-up">
        <!-- Календарь -->
        <EventCalendar />
      </div>

      <!-- Правая колонка (на мобильных устройствах снизу) -->
      <div>
        <div class="sticky top-4 space-y-6 fade-in-right">
          <!-- Ближайшие мероприятия -->
          <div class="card p-6">
            <h2 class="text-xl font-bold mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
              </svg>
              Ближайшие мероприятия
            </h2>
            
            <div v-if="upcomingEvents.length > 0" class="space-y-4 animate-list">
              <div 
                v-for="event in upcomingEvents" 
                :key="event.id" 
                class="event-item border-b border-gray-100 pb-4 last:border-0"
              >
                <div class="flex">
                  <div class="w-16 text-center mr-4">
                    <div class="event-date">
                      <div class="text-sm">{{ getMonthAbbr(event.startDate) }}</div>
                      <div class="text-xl font-bold">{{ getDayOfMonth(event.startDate) }}</div>
                    </div>
                  </div>
                  <div class="flex-1">
                    <h3 class="font-bold text-text-dark hover:text-primary-700 transition cursor-pointer" @click="openEventDetails(event)">
                      {{ event.title }}
                    </h3>
                    <div class="flex items-center text-xs text-text-medium mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                      </svg>
                      {{ formatTime(event.startDate) }} - {{ formatTime(event.endDate) }}
                      
                      <span class="mx-2">•</span>
                      
                      <span 
                        :class="{
                          'text-success': event.format === 'offline',
                          'text-primary-600': event.format === 'online',
                          'text-secondary-600': event.format === 'hybrid'
                        }"
                      >
                        {{ getEventFormatText(event.format) }}
                      </span>
                      
                      <span v-if="event.city" class="mx-2">•</span>
                      <span v-if="event.city">{{ event.city }}</span>
                    </div>
                    
                    <div class="flex gap-2 mt-2">
                      <a 
                        v-if="event.registrationLink" 
                        :href="event.registrationLink" 
                        target="_blank"
                        class="btn btn-secondary text-white px-3 py-1 rounded text-xs font-medium pulse-on-hover"
                      >
                        Регистрация
                      </a>
                      <button 
                        class="bg-gray-100 hover:bg-gray-200 text-text-medium px-3 py-1 rounded text-xs font-medium transition"
                        @click="openEventDetails(event)"
                      >
                        Подробнее
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div v-else class="text-center py-4 text-text-medium">
              Нет предстоящих событий
            </div>
          </div>
          
          <!-- Блок о сообществе -->
          <div class="card p-6 hover-lift">
            <h2 class="text-xl font-bold mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              IT-сообщество Амурской области
            </h2>
            <p class="text-text-medium mb-4">
              Присоединяйтесь к сообществу IT-специалистов Амурской области. 
              Общайтесь, делитесь опытом и находите новые возможности для профессионального роста.
            </p>
            <div class="flex flex-wrap gap-2">
              <a href="#" class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm hover:bg-blue-200 transition hover-scale">Telegram</a>
              <a href="#" class="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition hover-scale">ВКонтакте</a>
              <a href="#" class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm hover:bg-purple-200 transition hover-scale">Discord</a>
            </div>
          </div>
          
          <!-- Теги -->
          <div class="card p-6">
            <h2 class="text-xl font-bold mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
              </svg>
              Популярные теги
            </h2>
            <div class="flex flex-wrap gap-2">
              <a 
                v-for="tag in availableTags" 
                :key="tag.id"
                href="#" 
                class="bg-gray-100 text-text-medium px-3 py-1 rounded-full text-sm hover:bg-primary-100 hover:text-primary-800 transition hover-scale"
              >
                #{{ tag.name }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Модальное окно с деталями события -->
    <div v-if="selectedEvent" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="card bg-white p-6 w-full max-w-xl mx-4 relative bounce-in">
        <button 
          @click="selectedEvent = null" 
          class="absolute top-4 right-4 text-text-medium hover:text-primary-600 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div class="bg-primary-100 rounded-lg p-4 mb-6">
          <h3 class="text-2xl font-bold mb-2">{{ selectedEvent.title }}</h3>
          
          <div class="flex flex-wrap gap-2 mb-2">
            <div 
              class="inline-block px-2 py-1 text-xs font-medium rounded" 
              :class="getEventClassByType(selectedEvent.type, selectedEvent.format)"
            >
              {{ getEventTypeText(selectedEvent.type) }}
            </div>
            
            <div class="inline-block px-2 py-1 text-xs font-medium rounded bg-primary-100 text-primary-800">
              {{ getEventFormatText(selectedEvent.format) }}
            </div>
            
            <div v-if="selectedEvent.city" class="inline-block px-2 py-1 text-xs font-medium rounded bg-gray-100 text-text-medium">
              {{ selectedEvent.city }}
            </div>
          </div>
          
          <div class="text-sm text-text-medium">
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
              </svg>
              {{ formatDate(selectedEvent.startDate) }} • {{ formatTime(selectedEvent.startDate) }} - {{ formatTime(selectedEvent.endDate) }}
            </div>
          </div>
        </div>
        
        <div class="mb-6">
          <h4 class="text-lg font-semibold mb-2">Описание</h4>
          <p class="text-text-medium whitespace-pre-line">{{ selectedEvent.description || 'Описание отсутствует' }}</p>
        </div>
        
        <div v-if="selectedEvent.location" class="mb-6">
          <h4 class="text-lg font-semibold mb-2">Место проведения</h4>
          <p class="text-text-medium">{{ selectedEvent.location }}</p>
        </div>
        
        <div class="flex flex-wrap gap-2">
          <a 
            v-if="selectedEvent.registrationLink" 
            :href="selectedEvent.registrationLink" 
            target="_blank"
            class="btn btn-primary text-white px-5 py-2 rounded font-medium"
          >
            Зарегистрироваться
          </a>
          <button 
            @click="selectedEvent = null" 
            class="bg-gray-100 hover:bg-gray-200 text-text-medium px-5 py-2 rounded font-medium transition"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventCalendar from '@/components/events/EventCalendar.vue'

export default {
  name: 'EventsPage',
  components: {
    EventCalendar
  },
  data() {
    return {
      selectedEvent: null,
      availableTags: [
        { id: 1, name: 'Программирование' },
        { id: 2, name: 'Дизайн' },
        { id: 3, name: 'Стартапы' },
        { id: 4, name: 'Искусственный интеллект' },
        { id: 5, name: 'Веб-разработка' },
        { id: 6, name: 'GameDev' },
        { id: 7, name: 'Маркетинг' },
        { id: 8, name: 'Образование' }
      ],
      events: [
        {
          id: 1,
          title: 'Хакатон "Digital Breakthrough"',
          description: 'Региональный этап хакатона по разработке цифровых решений для социальных проблем региона. Участники смогут предложить свои решения и получить ценные призы.\n\nНаправления хакатона:\n- Здравоохранение\n- Образование\n- Городская среда\n- Экология\n- Социальное обслуживание',
          startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 15, 10, 0),
          endDate: new Date(new Date().getFullYear(), new Date().getMonth(), 15, 18, 0),
          type: 'hackathon',
          format: 'offline',
          city: 'Благовещенск',
          location: 'АмГУ, аудитория 103',
          tags: [1, 4, 6],
          registrationLink: 'https://example.com/register'
        },
        {
          id: 2,
          title: 'Мастер-класс по Python',
          description: 'Основы программирования на Python для начинающих. Изучим базовые концепции и напишем простое приложение.\n\nПрограмма мастер-класса:\n1. Введение в Python\n2. Основные типы данных и операции\n3. Условные конструкции и циклы\n4. Функции и модули\n5. Разработка простого приложения',
          startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 10, 12, 0),
          endDate: new Date(new Date().getFullYear(), new Date().getMonth(), 10, 14, 0),
          type: 'workshop',
          format: 'online',
          city: '',
          location: 'Zoom',
          tags: [1, 5, 8],
          registrationLink: 'https://example.com/register'
        },
        {
          id: 3,
          title: 'Встреча сообщества разработчиков',
          description: 'Неформальная встреча IT-специалистов региона. Обсудим последние тренды и поделимся опытом.\n\nПлан встречи:\n- Знакомство новых участников\n- Обсуждение трендов в IT\n- Доклады участников (10-15 минут)\n- Свободное общение и нетворкинг',
          startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 20, 18, 30),
          endDate: new Date(new Date().getFullYear(), new Date().getMonth(), 20, 21, 0),
          type: 'meetup',
          format: 'offline',
          city: 'Благовещенск',
          location: 'Коворкинг "Точка кипения"',
          tags: [1, 3, 5],
          registrationLink: ''
        },
        {
          id: 4,
          title: 'IT-конференция "Tech Innovations"',
          description: 'Ежегодная конференция по инновациям в сфере IT. Выступления спикеров из ведущих компаний.',
          startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 5, 9, 0),
          endDate: new Date(new Date().getFullYear(), new Date().getMonth(), 7, 18, 0),
          type: 'conference',
          format: 'hybrid',
          city: 'Благовещенск',
          location: 'Конференц-зал "Амур"',
          tags: [3, 4, 7],
          registrationLink: 'https://example.com/register'
        }
      ]
    }
  },
  computed: {
    upcomingEvents() {
      const now = new Date();
      // Сортируем события по дате и берем ближайшие 3
      return this.events
        .filter(event => event.startDate >= now)
        .sort((a, b) => a.startDate - b.startDate)
        .slice(0, 3);
    }
  },
  methods: {
    openEventDetails(event) {
      this.selectedEvent = event;
    },
    getMonthAbbr(date) {
      const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
      return months[date.getMonth()];
    },
    getDayOfMonth(date) {
      return date.getDate();
    },
    formatDate(date) {
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      return date.toLocaleDateString('ru-RU', options);
    },
    formatTime(date) {
      return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    },
    getEventTypeText(type) {
      const types = {
        'hackathon': 'Хакатон',
        'workshop': 'Мастер-класс',
        'meetup': 'Встреча',
        'conference': 'Конференция'
      };
      
      return types[type] || 'Мероприятие';
    },
    getEventFormatText(format) {
      const formats = {
        'online': 'Онлайн',
        'offline': 'Офлайн',
        'hybrid': 'Гибридный'
      };
      
      return formats[format] || '';
    },
    getEventClassByType(type, format) {
      // Классы для разных типов событий
      const typeClasses = {
        'hackathon': 'bg-purple-100 text-purple-800',
        'workshop': 'bg-blue-100 text-blue-800',
        'meetup': 'bg-green-100 text-green-800',
        'conference': 'bg-orange-100 text-orange-800'
      };
      
      return typeClasses[type] || 'bg-gray-100 text-gray-800';
    },
    getTagNameById(tagId) {
      const tag = this.availableTags.find(t => t.id === tagId);
      return tag ? tag.name : '';
    }
  }
}
</script>

<style scoped>
/* Дополнительные стили для контроля размера SVG */
svg {
  max-width: 20px;
  max-height: 20px;
  width: auto;
  height: auto;
  display: inline-block;
}

/* Исключение для иконки в баннере */
.h-24.w-24 {
  max-width: 48px;
  max-height: 48px;
  width: 48px;
  height: 48px;
}

/* Ограничение размеров для всех внешних ресурсов */
img, object, embed {
  max-width: 100%;
  max-height: 100%;
}
</style>