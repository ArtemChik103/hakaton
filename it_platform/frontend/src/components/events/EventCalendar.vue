<template>
  <div class="event-calendar p-6 card mb-6 fade-in-up">
    <!-- Заголовок и фильтры -->
    <div class="mb-8">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 class="text-2xl font-bold">Календарь IT-мероприятий</h2>
        <div class="flex items-center space-x-3">
          <button 
            @click="isFilterOpen = !isFilterOpen"
            class="btn flex items-center gap-2 bg-primary-100 text-primary-700 hover:bg-primary-200 px-4 py-2 rounded-md transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
            </svg>
            <span>{{ isFilterOpen ? 'Скрыть фильтры' : 'Фильтры' }}</span>
          </button>
          
          <div class="flex space-x-2">
            <button 
              @click="changeMonth(-1)" 
              class="p-2 rounded-md bg-gray-100 text-text-medium hover:bg-gray-200 hover-scale transition"
              title="Предыдущий месяц"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </button>
            <button 
              @click="currentDate = new Date()"
              class="p-2 rounded-md bg-primary-100 text-primary-700 hover:bg-primary-200 hover-scale transition"
              title="Сегодня"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
              </svg>
            </button>
            <button 
              @click="changeMonth(1)" 
              class="p-2 rounded-md bg-gray-100 text-text-medium hover:bg-gray-200 hover-scale transition"
              title="Следующий месяц"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Панель фильтров -->
      <div v-if="isFilterOpen" class="bg-light rounded-lg p-5 mb-6 transition-all duration-300 shadow-sm border border-gray-100 animate-slide-down">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Фильтр по дате -->
          <div>
            <label class="block text-sm font-medium text-text-medium mb-1">Дата</label>
            <div class="flex space-x-2">
              <div>
                <label class="block text-xs text-text-light mb-1">От</label>
                <input 
                  type="date" 
                  v-model="filters.dateFrom" 
                  class="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-300"
                />
              </div>
              <div>
                <label class="block text-xs text-text-light mb-1">До</label>
                <input 
                  type="date" 
                  v-model="filters.dateTo" 
                  class="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-300"
                />
              </div>
            </div>
          </div>
          
          <!-- Фильтр по типу события -->
          <div>
            <label class="block text-sm font-medium text-text-medium mb-1">Тип мероприятия</label>
            <select 
              v-model="filters.eventType" 
              class="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-300"
            >
              <option value="">Все типы</option>
              <option value="hackathon">Хакатоны</option>
              <option value="workshop">Мастер-классы</option>
              <option value="meetup">Встречи сообществ</option>
              <option value="conference">Конференции</option>
            </select>
          </div>
          
          <!-- Фильтр по формату -->
          <div>
            <label class="block text-sm font-medium text-text-medium mb-1">Формат</label>
            <select 
              v-model="filters.format" 
              class="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-300"
            >
              <option value="">Любой формат</option>
              <option value="online">Онлайн</option>
              <option value="offline">Офлайн</option>
              <option value="hybrid">Гибридный</option>
            </select>
          </div>
          
          <!-- Фильтр по городу -->
          <div>
            <label class="block text-sm font-medium text-text-medium mb-1">Город</label>
            <select 
              v-model="filters.city" 
              class="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-300"
            >
              <option value="">Все города</option>
              <option value="Благовещенск">Благовещенск</option>
              <option value="Белогорск">Белогорск</option>
              <option value="Свободный">Свободный</option>
              <option value="Тында">Тында</option>
              <option value="Зея">Зея</option>
            </select>
          </div>
        </div>
        
        <!-- Теги -->
        <div class="mt-4">
          <label class="block text-sm font-medium text-text-medium mb-2">Теги</label>
          <div class="flex flex-wrap gap-2">
            <button 
              v-for="tag in availableTags" 
              :key="tag.id"
              @click="toggleTag(tag.id)"
              :class="[
                'px-3 py-1 rounded-full text-sm transition hover-scale',
                filters.tags.includes(tag.id) 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-100 text-text-medium hover:bg-gray-200'
              ]"
            >
              {{ tag.name }}
            </button>
          </div>
        </div>
        
        <!-- Кнопки действий -->
        <div class="flex justify-end mt-4 space-x-2">
          <button 
            @click="resetFilters" 
            class="px-4 py-2 text-text-medium bg-gray-100 rounded-md hover:bg-gray-200 transition text-sm hover-scale"
          >
            Сбросить
          </button>
          <button 
            @click="applyFilters" 
            class="px-4 py-2 text-white bg-primary-600 rounded-md hover:bg-primary-700 transition text-sm hover-scale"
          >
            Применить
          </button>
        </div>
      </div>
    </div>

    <!-- Месяц и год -->
    <div class="mb-4 flex items-center justify-between fade-in-up">
      <h3 class="text-xl font-semibold text-primary-700">{{ currentMonthName }} {{ currentYear }}</h3>
      <div class="text-sm text-text-light">
        <span v-if="filteredEvents.length === 0">Нет событий</span>
        <span v-else>{{ filteredEvents.length }} {{ getEventCountText(filteredEvents.length) }}</span>
      </div>
    </div>

    <!-- Новый табличный вид календаря -->
    <div class="calendar-container border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm fade-in">
      <!-- Дни недели -->
      <table class="w-full table-fixed border-collapse">
        <thead>
          <tr class="bg-primary-50">
            <th v-for="day in weekDays" :key="day" class="text-center py-2 text-sm font-semibold text-primary-700 border border-gray-200">
              {{ day }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(week, weekIndex) in calendarWeeks" :key="weekIndex">
            <td 
              v-for="(day, dayIndex) in week" 
              :key="`${weekIndex}-${dayIndex}`"
              :class="[
                'border border-gray-200 p-1 align-top',
                'h-20', 
                day.isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400',
                day.isToday ? 'bg-primary-50' : '',
                'relative'
              ]"
            >
              <div class="flex justify-between mb-1">
                <span 
                  :class="[
                    'text-sm font-medium', 
                    day.isToday ? 'text-primary-700 bg-primary-100 rounded-full w-6 h-6 flex items-center justify-center' : ''
                  ]"
                >
                  {{ day.dayNumber }}
                </span>
                <span v-if="day.hasFilteredEvents" class="h-2 w-2 rounded-full bg-primary-500"></span>
              </div>
              
              <div class="overflow-y-auto max-h-14">
                <div 
                  v-for="event in day.filteredEvents" 
                  :key="event.id"
                  :class="[
                    'text-xs p-1 mb-1 rounded truncate cursor-pointer transition hover-scale',
                    getEventClassByType(event.type, event.format)
                  ]"
                  @click="selectEvent(event)"
                >
                  {{ event.title }}
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Ссылка на предыдущий год -->
    <div class="text-center mt-4">
      <a href="#" class="text-primary-600 hover:text-primary-800 text-sm hover-underline">Предыдущий год</a>
    </div>

    <!-- Модальное окно с деталями события (по клику) -->
    <div v-if="selectedEvent" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 fade-in">
      <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-lg">
        <div class="flex justify-between items-start mb-4">
          <h3 class="text-xl font-bold text-text-dark">{{ selectedEvent.title }}</h3>
          <button @click="selectedEvent = null" class="text-text-light hover:text-text-medium transition hover-scale">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="flex flex-wrap gap-2 mb-4">
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
        
        <p class="text-text-medium mb-4">{{ selectedEvent.description }}</p>
        
        <div class="text-sm text-text-medium mb-4">
          <div class="mb-1 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-primary-500" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
            </svg>
            <span class="font-medium">Дата:</span>&nbsp;{{ formatDate(selectedEvent.startDate) }}
          </div>
          <div class="mb-1 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-primary-500" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
            </svg>
            <span class="font-medium">Время:</span>&nbsp;{{ formatTime(selectedEvent.startDate) }} - {{ formatTime(selectedEvent.endDate) }}
          </div>
          <div v-if="selectedEvent.location" class="mb-1 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-primary-500" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
            </svg>
            <span class="font-medium">Место:</span>&nbsp;{{ selectedEvent.location }}
          </div>
        </div>
        
        <div class="flex flex-wrap gap-2 mb-4">
          <span 
            v-for="tagId in selectedEvent.tags" 
            :key="tagId"
            class="inline-block px-2 py-1 text-xs font-medium rounded bg-gray-100 text-text-medium"
          >
            #{{ getTagNameById(tagId) }}
          </span>
        </div>
        
        <div class="flex justify-between">
          <a 
            v-if="selectedEvent.registrationLink" 
            :href="selectedEvent.registrationLink" 
            target="_blank"
            class="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition text-sm hover-scale"
          >
            Регистрация
          </a>
          <button 
            class="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition text-sm hover-scale"
            @click="selectedEvent = null"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventCalendar',
  data() {
    return {
      selectedEvent: null,
      currentDate: new Date(),
      weekDays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      isFilterOpen: false,
      filters: {
        dateFrom: '',
        dateTo: '',
        eventType: '',
        format: '',
        city: '',
        tags: []
      },
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
          description: 'Региональный этап хакатона по разработке цифровых решений для социальных проблем региона. Участники смогут предложить свои решения и получить ценные призы.',
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
          description: 'Основы программирования на Python для начинающих. Изучим базовые концепции и напишем простое приложение.',
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
          description: 'Неформальная встреча IT-специалистов региона. Обсудим последние тренды и поделимся опытом.',
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
        },
        {
          id: 5,
          title: 'Воркшоп по UI/UX дизайну',
          description: 'Практический семинар по созданию пользовательских интерфейсов. Разберем основные принципы и потренируемся на реальных проектах.',
          startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 22, 15, 0),
          endDate: new Date(new Date().getFullYear(), new Date().getMonth(), 22, 18, 0),
          type: 'workshop',
          format: 'offline',
          city: 'Белогорск',
          location: 'Дом молодежи',
          tags: [2, 5, 8],
          registrationLink: 'https://example.com/register'
        },
        {
          id: 6,
          title: 'Вебинар: Разработка мобильных приложений',
          description: 'Онлайн-семинар по созданию мобильных приложений для iOS и Android. Обзор инструментов и фреймворков.',
          startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 28, 19, 0),
          endDate: new Date(new Date().getFullYear(), new Date().getMonth(), 28, 21, 0),
          type: 'workshop',
          format: 'online',
          city: '',
          location: 'YouTube',
          tags: [1, 5, 6],
          registrationLink: 'https://example.com/register'
        }
      ]
    }
  },
  computed: {
    currentYear() {
      return this.currentDate.getFullYear();
    },
    currentMonthName() {
      const months = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
      ];
      return months[this.currentDate.getMonth()];
    },
    filteredEvents() {
      return this.events.filter(event => {
        // Проверка по типу события
        if (this.filters.eventType && event.type !== this.filters.eventType) {
          return false;
        }
        
        // Проверка по формату
        if (this.filters.format && event.format !== this.filters.format) {
          return false;
        }
        
        // Проверка по городу
        if (this.filters.city && event.city !== this.filters.city) {
          return false;
        }
        
        // Проверка по тегам
        if (this.filters.tags.length > 0) {
          const hasMatchingTag = this.filters.tags.some(tagId => 
            event.tags.includes(tagId)
          );
          if (!hasMatchingTag) {
            return false;
          }
        }
        
        // Проверка по дате "от"
        if (this.filters.dateFrom) {
          const fromDate = new Date(this.filters.dateFrom);
          fromDate.setHours(0, 0, 0, 0);
          if (event.startDate < fromDate) {
            return false;
          }
        }
        
        // Проверка по дате "до"
        if (this.filters.dateTo) {
          const toDate = new Date(this.filters.dateTo);
          toDate.setHours(23, 59, 59, 999);
          if (event.startDate > toDate) {
            return false;
          }
        }
        
        return true;
      });
    },
    calendarDays() {
      const year = this.currentDate.getFullYear();
      const month = this.currentDate.getMonth();
      
      // Первый день месяца
      const firstDayOfMonth = new Date(year, month, 1);
      
      // День недели первого дня (0 - воскресенье, поэтому преобразуем в формат пн-вс)
      let firstWeekDay = firstDayOfMonth.getDay() || 7;
      firstWeekDay = firstWeekDay === 1 ? 1 : 9 - firstWeekDay;
      
      // Последний день месяца
      const lastDayOfMonth = new Date(year, month + 1, 0);
      const daysInMonth = lastDayOfMonth.getDate();
      
      // Количество дней предыдущего месяца, которые нужно показать
      const prevMonthDays = firstWeekDay - 1;
      
      // Получаем дни предыдущего месяца
      const prevMonthLastDay = new Date(year, month, 0).getDate();
      
      // Создаем массив дней
      const days = [];
      
      // Добавляем дни предыдущего месяца
      for (let i = prevMonthDays; i > 0; i--) {
        const day = prevMonthLastDay - i + 1;
        const date = new Date(year, month - 1, day);
        const dayEvents = this.getEventsForDate(date);
        const filteredEvents = this.filterDayEvents(dayEvents);
        
        days.push({
          dayNumber: day,
          isCurrentMonth: false,
          isToday: false,
          date: date,
          events: dayEvents,
          filteredEvents: filteredEvents,
          hasEvents: dayEvents.length > 0,
          hasFilteredEvents: filteredEvents.length > 0
        });
      }
      
      // Сегодняшняя дата
      const today = new Date();
      const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;
      const todayDate = today.getDate();
      
      // Добавляем дни текущего месяца
      for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(year, month, i);
        const dayEvents = this.getEventsForDate(date);
        const filteredEvents = this.filterDayEvents(dayEvents);
        
        days.push({
          dayNumber: i,
          isCurrentMonth: true,
          isToday: isCurrentMonth && i === todayDate,
          date: date,
          events: dayEvents,
          filteredEvents: filteredEvents,
          hasEvents: dayEvents.length > 0,
          hasFilteredEvents: filteredEvents.length > 0
        });
      }
      
      // Определяем сколько дней следующего месяца нужно добавить
      const totalDaysCount = 42; // 6 недель по 7 дней
      const nextMonthDays = totalDaysCount - days.length;
      
      // Добавляем дни следующего месяца
      for (let i = 1; i <= nextMonthDays; i++) {
        const date = new Date(year, month + 1, i);
        const dayEvents = this.getEventsForDate(date);
        const filteredEvents = this.filterDayEvents(dayEvents);
        
        days.push({
          dayNumber: i,
          isCurrentMonth: false,
          isToday: false,
          date: date,
          events: dayEvents,
          filteredEvents: filteredEvents,
          hasEvents: dayEvents.length > 0,
          hasFilteredEvents: filteredEvents.length > 0
        });
      }
      
      return days;
    },
    // Новое свойство для создания недель из массива дней
    calendarWeeks() {
      const weeks = [];
      const days = [...this.calendarDays];
      
      // Разбиваем дни на недели (по 7 дней)
      while (days.length > 0) {
        weeks.push(days.splice(0, 7));
      }
      
      return weeks;
    }
  },
  methods: {
    changeMonth(delta) {
      const newDate = new Date(this.currentDate);
      newDate.setMonth(newDate.getMonth() + delta);
      this.currentDate = newDate;
    },
    selectEvent(event) {
      this.selectedEvent = event;
    },
    getEventsForDate(date) {
      return this.events.filter(event => {
        const eventDate = new Date(event.startDate);
        return (
          eventDate.getDate() === date.getDate() &&
          eventDate.getMonth() === date.getMonth() &&
          eventDate.getFullYear() === date.getFullYear()
        );
      });
    },
    filterDayEvents(events) {
      return events.filter(event => {
        if (this.filters.eventType && event.type !== this.filters.eventType) {
          return false;
        }
        
        if (this.filters.format && event.format !== this.filters.format) {
          return false;
        }
        
        if (this.filters.city && event.city !== this.filters.city) {
          return false;
        }
        
        if (this.filters.tags.length > 0) {
          const hasMatchingTag = this.filters.tags.some(tagId => 
            event.tags.includes(tagId)
          );
          if (!hasMatchingTag) {
            return false;
          }
        }
        
        return true;
      });
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
      // Обновленные классы для разных типов событий в соответствии с дизайном сайта
      const typeClasses = {
        'hackathon': 'bg-primary-100 text-primary-800',
        'workshop': 'bg-green-100 text-green-800',
        'meetup': 'bg-amber-100 text-amber-800',
        'conference': 'bg-rose-100 text-rose-800'
      };
      
      return typeClasses[type] || 'bg-gray-100 text-text-medium';
    },
    getTagNameById(tagId) {
      const tag = this.availableTags.find(t => t.id === tagId);
      return tag ? tag.name : '';
    },
    toggleTag(tagId) {
      const index = this.filters.tags.indexOf(tagId);
      if (index === -1) {
        this.filters.tags.push(tagId);
      } else {
        this.filters.tags.splice(index, 1);
      }
    },
    resetFilters() {
      this.filters = {
        dateFrom: '',
        dateTo: '',
        eventType: '',
        format: '',
        city: '',
        tags: []
      };
    },
    applyFilters() {
      // Фильтры применяются автоматически через computed свойства
      this.isFilterOpen = false;
    },
    getEventCountText(count) {
      // Склонение для числа событий
      const lastDigit = count % 10;
      const lastTwoDigits = count % 100;
      
      if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
        return 'событий';
      }
      
      if (lastDigit === 1) {
        return 'событие';
      }
      
      if (lastDigit >= 2 && lastDigit <= 4) {
        return 'события';
      }
      
      return 'событий';
    }
  }
}
</script>

<style scoped>
.event-calendar {
  min-height: 650px;
}

/* Анимация для панели фильтров */
.filter-panel-enter-active,
.filter-panel-leave-active {
  transition: max-height 0.3s ease, opacity 0.3s ease;
  max-height: 500px;
  opacity: 1;
  overflow: hidden;
}

.filter-panel-enter-from,
.filter-panel-leave-to {
  max-height: 0;
  opacity: 0;
}

/* Контролируем размер SVG */
svg {
  max-width: 20px;
  height: 20px;
  max-height: 20px;
}

/* Добавляем стили для таблицы */
table {
  border-collapse: collapse;
  width: 100%;
}

td {
  vertical-align: top;
  width: 14.28%; /* 100% / 7 */
  height: 80px;
  font-size: 0.875rem;
}

/* Улучшаем стиль дня выделения текущего дня */
td.bg-primary-50 {
  background-color: rgba(239, 246, 255, 0.6);
}

/* Добавляем hover-эффект для ячеек */
td:hover {
  background-color: rgba(240, 240, 250, 0.5);
}

/* Контролируем высоту ячеек */
.h-20 {
  height: 5rem;
  max-height: 5rem;
  min-height: 5rem;
}

/* Стили для календаря */
.calendar-container {
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  transition: box-shadow 0.3s ease;
}

.calendar-container:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

/* Анимации для hover эффектов */
.hover-scale {
  transition: transform 0.2s ease;
}

.hover-scale:hover {
  transform: scale(1.05);
}

/* Добавляем анимацию для появления элементов */
.fade-in {
  animation: fadeIn 0.4s ease-in-out;
}

.fade-in-up {
  animation: fadeInUp 0.4s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-down {
  from {
    transform: translateY(-10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-slide-down {
  animation: slide-down 0.3s ease forwards;
}
</style> 