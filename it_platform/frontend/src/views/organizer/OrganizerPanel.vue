<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Шапка панели организатора -->
    <div class="bg-gradient-to-r from-blue-600 to-blue-800 py-8">
      <div class="container mx-auto px-4">
        <h1 class="text-3xl font-bold text-white">Панель организатора</h1>
        <p class="text-blue-100 mt-2">Управление мероприятиями и участниками</p>
      </div>
    </div>
    
    <!-- Содержимое панели -->
    <div class="container mx-auto px-4 py-6">
      <!-- Навигация по вкладкам -->
      <div class="bg-white rounded-lg shadow mb-6">
        <div class="flex flex-wrap">
          <button 
            v-for="tab in tabs" 
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'px-6 py-4 font-medium text-sm focus:outline-none',
              activeTab === tab.id ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-500'
            ]"
          >
            {{ tab.name }}
          </button>
        </div>
      </div>
      
      <!-- Вкладка "Статистика" -->
      <div v-if="activeTab === 'dashboard'" class="mb-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <!-- Карточка статистики: всего мероприятий -->
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div>
                <h3 class="text-gray-500 text-sm">Всего мероприятий</h3>
                <p class="text-2xl font-bold">{{ statistics.totalEvents || 0 }}</p>
              </div>
            </div>
          </div>
          
          <!-- Карточка статистики: участники -->
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
              <div>
                <h3 class="text-gray-500 text-sm">Всего участников</h3>
                <p class="text-2xl font-bold">{{ statistics.totalParticipants || 0 }}</p>
              </div>
            </div>
          </div>
          
          <!-- Карточка статистики: Активные мероприятия -->
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <div>
                <h3 class="text-gray-500 text-sm">Активные мероприятия</h3>
                <p class="text-2xl font-bold">{{ statistics.activeEvents || 0 }}</p>
              </div>
            </div>
          </div>
          
          <!-- Карточка статистики: Рейтинг -->
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                </svg>
              </div>
              <div>
                <h3 class="text-gray-500 text-sm">Рейтинг организатора</h3>
                <p class="text-2xl font-bold">{{ statistics.organizerRating || 0 }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Достижения организатора -->
        <div class="bg-white rounded-lg shadow p-6 mb-6">
          <h2 class="text-xl font-bold text-gray-800 mb-4">Ваши достижения</h2>
          <div v-if="achievements.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div v-for="(achievement, index) in achievements" :key="index" class="bg-gray-50 rounded-lg p-4 flex items-center">
              <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 text-blue-600 text-xl">
                {{ achievement.emoji || '🏆' }}
              </div>
              <div>
                <h4 class="font-bold text-gray-800">{{ achievement.name }}</h4>
                <p class="text-xs text-gray-500">Получено {{ formatDate(achievement.dateReceived) }}</p>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-8 text-gray-500">
            <div class="text-5xl mb-4">🏆</div>
            <p>У вас пока нет достижений организатора</p>
            <p class="mt-2 text-sm">Создавайте мероприятия и управляйте участниками, чтобы получать награды!</p>
          </div>
        </div>
      </div>
      
      <!-- Вкладка "Мои мероприятия" -->
      <div v-if="activeTab === 'events'" class="mb-6">
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <div class="p-6 flex justify-between items-center border-b">
            <h2 class="text-xl font-bold text-gray-800">Мои мероприятия</h2>
            <button 
              @click="activeTab = 'create-event'" 
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition flex items-center"
            >
              <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Создать мероприятие
            </button>
          </div>
          
          <!-- Список мероприятий -->
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Название
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Дата
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Место
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Участники
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Статус
                  </th>
                  <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="event in events" :key="event.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="w-10 h-10 flex-shrink-0 mr-3">
                        <img v-if="event.logo" :src="event.logo" class="w-10 h-10 rounded-full object-cover" alt="" />
                        <div v-else class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                          {{ event.title.charAt(0) }}
                        </div>
                      </div>
                      <div class="font-medium text-gray-900">{{ event.title }}</div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ formatDate(event.date) }}</div>
                    <div class="text-xs text-gray-500">{{ event.startTime }} - {{ event.endTime }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ event.location }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ event.participants.total }}</div>
                    <div v-if="event.participants.pending > 0" class="text-xs text-yellow-600">
                      {{ event.participants.pending }} новых заявок
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span 
                      :class="[
                        'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                        event.status === 'active' ? 'bg-green-100 text-green-800' : 
                        event.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        event.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                        'bg-red-100 text-red-800'
                      ]">
                      {{ 
                        event.status === 'active' ? 'Активно' : 
                        event.status === 'pending' ? 'На модерации' : 
                        event.status === 'completed' ? 'Завершено' : 
                        'Отменено' 
                      }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div class="flex justify-end space-x-2">
                      <button @click="viewEventDetails(event.id)" class="text-blue-600 hover:text-blue-900">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                        </svg>
                      </button>
                      <button @click="editEvent(event.id)" class="text-indigo-600 hover:text-indigo-900">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                      </button>
                      <button @click="deleteEvent(event.id)" class="text-red-600 hover:text-red-900">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr v-if="events.length === 0">
                  <td colspan="6" class="px-6 py-10 text-center text-gray-500">
                    <div class="text-center">
                      <div class="text-4xl mb-4">📅</div>
                      <p>У вас пока нет созданных мероприятий</p>
                      <button 
                        @click="activeTab = 'create-event'" 
                        class="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        Создать первое мероприятие
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <!-- Вкладка "Создать мероприятие" -->
      <div v-if="activeTab === 'create-event'" class="mb-6">
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-bold text-gray-800 mb-6">Создание нового мероприятия</h2>
          
          <form @submit.prevent="createNewEvent">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Название мероприятия <span class="text-red-500">*</span></label>
                <input
                  id="title"
                  v-model="newEvent.title"
                  type="text"
                  required
                  placeholder="Например: Конференция разработчиков"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label for="event-date" class="block text-sm font-medium text-gray-700 mb-1">Дата проведения <span class="text-red-500">*</span></label>
                <input
                  id="event-date"
                  v-model="newEvent.date"
                  type="date"
                  required
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label for="start-time" class="block text-sm font-medium text-gray-700 mb-1">Время начала <span class="text-red-500">*</span></label>
                <input
                  id="start-time"
                  v-model="newEvent.startTime"
                  type="time"
                  required
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label for="end-time" class="block text-sm font-medium text-gray-700 mb-1">Время окончания <span class="text-red-500">*</span></label>
                <input
                  id="end-time"
                  v-model="newEvent.endTime"
                  type="time"
                  required
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div class="md:col-span-2">
                <label for="location" class="block text-sm font-medium text-gray-700 mb-1">Место проведения <span class="text-red-500">*</span></label>
                <input
                  id="location"
                  v-model="newEvent.location"
                  type="text"
                  required
                  placeholder="Например: Технопарк, ул. Примерная, 123"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div class="md:col-span-2">
                <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Описание мероприятия <span class="text-red-500">*</span></label>
                <textarea
                  id="description"
                  v-model="newEvent.description"
                  rows="4"
                  required
                  placeholder="Опишите ваше мероприятие..."
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                ></textarea>
              </div>
              
              <div>
                <label for="event-tags" class="block text-sm font-medium text-gray-700 mb-1">Теги (через запятую)</label>
                <input
                  id="event-tags"
                  v-model="tagsInput"
                  type="text"
                  placeholder="IT, конференция, программирование"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <p class="mt-1 text-xs text-gray-500">Добавьте ключевые слова для лучшего поиска мероприятия</p>
              </div>
              
              <div>
                <label for="event-logo" class="block text-sm font-medium text-gray-700 mb-1">Логотип мероприятия</label>
                <div class="flex items-center">
                  <input
                    id="event-logo"
                    type="file"
                    @change="onLogoSelect"
                    accept="image/*"
                    class="hidden"
                  />
                  <label for="event-logo" class="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
                    Выбрать файл
                  </label>
                  <span v-if="logoFileName" class="ml-3 text-sm text-gray-500">{{ logoFileName }}</span>
                  <span v-else class="ml-3 text-sm text-gray-500">Рекомендуемый размер: 500x500px</span>
                </div>
                <!-- Превью логотипа -->
                <div v-if="logoPreviewUrl" class="mt-2">
                  <img :src="logoPreviewUrl" class="w-24 h-24 object-cover rounded" alt="Превью логотипа" />
                </div>
              </div>
            </div>
            
            <div class="flex justify-end space-x-3">
              <button
                type="button"
                @click="cancelEventCreation"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Отмена
              </button>
              <button
                type="submit"
                class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Создать мероприятие
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { organizerApi } from '@/utils/api.js';

export default {
  name: 'OrganizerPanel',
  data() {
    return {
      activeTab: 'dashboard',
      tabs: [
        { id: 'dashboard', name: 'Статистика' },
        { id: 'events', name: 'Мои мероприятия' },
        { id: 'create-event', name: 'Создать мероприятие' }
      ],
      statistics: {
        totalEvents: 0,
        totalParticipants: 0,
        activeEvents: 0,
        organizerRating: 0
      },
      achievements: [],
      events: [],
      newEvent: {
        title: '',
        description: '',
        date: '',
        startTime: '',
        endTime: '',
        location: '',
        logo: null
      },
      tagsInput: '',
      logoFileName: '',
      logoPreviewUrl: '',
      isLoading: false,
      isSubmitting: false,
      submitError: null
    }
  },
  created() {
    this.fetchStatistics();
    this.fetchAchievements();
    this.fetchEvents();
  },
  methods: {
    async fetchStatistics() {
      try {
        const response = await organizerApi.getStatistics();
        if (response.success) {
          this.statistics = response.data;
        } else {
          console.error('Ошибка при загрузке статистики:', response.error);
          // Для демонстрации загружаем тестовые данные
          this.loadDemoStatistics();
        }
      } catch (error) {
        console.error('Ошибка при загрузке статистики:', error);
        this.loadDemoStatistics();
      }
    },
    
    loadDemoStatistics() {
      // Демо-данные для тестирования интерфейса
      setTimeout(() => {
        this.statistics = {
          totalEvents: 12,
          totalParticipants: 238,
          activeEvents: 3,
          organizerRating: 4.8
        };
      }, 500);
    },
    
    async fetchAchievements() {
      // В реальном приложении здесь будет запрос к API
      // Загружаем демо-данные для тестирования
      setTimeout(() => {
        this.achievements = [
          { name: 'Организатор месяца', emoji: '🌟', dateReceived: new Date(2023, 2, 15) },
          { name: 'Самый активный вуз', emoji: '🏫', dateReceived: new Date(2023, 3, 10) },
          { name: '100 участников', emoji: '👥', dateReceived: new Date(2023, 4, 5) }
        ];
      }, 800);
    },
    
    async fetchEvents() {
      this.isLoading = true;
      
      try {
        const response = await organizerApi.getEvents();
        if (response.success) {
          this.events = response.data;
        } else {
          console.error('Ошибка при загрузке мероприятий:', response.error);
          // Для демонстрации загружаем тестовые данные
          this.loadDemoEvents();
        }
      } catch (error) {
        console.error('Ошибка при загрузке мероприятий:', error);
        this.loadDemoEvents();
      } finally {
        this.isLoading = false;
      }
    },
    
    loadDemoEvents() {
      // Демо-данные для тестирования интерфейса
      setTimeout(() => {
        this.events = [
          {
            id: 1,
            title: 'Конференция по разработке',
            date: new Date(2023, 6, 15),
            startTime: '10:00',
            endTime: '18:00',
            location: 'Технопарк, ул. Примерная, 123',
            description: 'Большая конференция для разработчиков',
            logo: null,
            participants: { total: 45, pending: 12 },
            status: 'active'
          },
          {
            id: 2,
            title: 'Хакатон "Цифровые решения"',
            date: new Date(2023, 7, 20),
            startTime: '09:00',
            endTime: '20:00',
            location: 'Онлайн',
            description: 'Двухдневный хакатон для IT-специалистов',
            logo: null,
            participants: { total: 78, pending: 0 },
            status: 'pending'
          },
          {
            id: 3,
            title: 'Мастер-класс по Vue.js',
            date: new Date(2023, 5, 10),
            startTime: '15:00',
            endTime: '18:00',
            location: 'Коворкинг "Рабочее место"',
            description: 'Практический мастер-класс по Vue.js',
            logo: null,
            participants: { total: 25, pending: 0 },
            status: 'completed'
          }
        ];
      }, 600);
    },
    
    formatDate(dateObj) {
      if (!dateObj) return '';
      return new Date(dateObj).toLocaleDateString('ru-RU');
    },
    
    // Методы для работы с вкладкой создания мероприятия
    onLogoSelect(event) {
      const file = event.target.files[0];
      if (!file) return;
      
      this.newEvent.logo = file;
      this.logoFileName = file.name;
      
      // Создаем превью логотипа
      const reader = new FileReader();
      reader.onload = (e) => {
        this.logoPreviewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    
    async createNewEvent() {
      this.isSubmitting = true;
      this.submitError = null;
      
      try {
        // Формируем данные мероприятия
        const eventData = {
          ...this.newEvent,
          tags: this.tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag)
        };
        
        // Отправляем запрос к API
        const response = await organizerApi.createEvent(eventData);
        
        if (response.success) {
          alert('Мероприятие успешно создано!');
          
          // Сбрасываем форму
          this.resetForm();
          
          // Переходим на вкладку с мероприятиями
          this.activeTab = 'events';
          
          // Обновляем список мероприятий
          this.fetchEvents();
        } else {
          this.submitError = response.error || 'Произошла ошибка при создании мероприятия';
          console.error('Ошибка при создании мероприятия:', response.error);
        }
      } catch (error) {
        this.submitError = 'Ошибка соединения с сервером';
        console.error('Ошибка при создании мероприятия:', error);
      } finally {
        this.isSubmitting = false;
      }
    },
    
    resetForm() {
      this.newEvent = {
        title: '',
        description: '',
        date: '',
        startTime: '',
        endTime: '',
        location: '',
        logo: null
      };
      this.tagsInput = '';
      this.logoFileName = '';
      this.logoPreviewUrl = '';
      this.submitError = null;
    },
    
    cancelEventCreation() {
      // Спрашиваем подтверждение только если форма не пустая
      if (this.newEvent.title || this.newEvent.description || this.tagsInput) {
        if (confirm('Вы уверены, что хотите отменить создание мероприятия? Все введенные данные будут потеряны.')) {
          this.resetForm();
          this.activeTab = 'events';
        }
      } else {
        this.activeTab = 'events';
      }
    },
    
    // Методы для работы со списком мероприятий
    viewEventDetails(eventId) {
      alert(`Просмотр деталей мероприятия ${eventId}`);
      // TODO: Реализовать просмотр деталей мероприятия
    },
    
    editEvent(eventId) {
      alert(`Редактирование мероприятия ${eventId}`);
      // TODO: Реализовать редактирование мероприятия
    },
    
    async deleteEvent(eventId) {
      if (confirm('Вы уверены, что хотите удалить это мероприятие?')) {
        try {
          const response = await organizerApi.deleteEvent(eventId);
          
          if (response.success) {
            alert('Мероприятие успешно удалено');
            // Обновляем список мероприятий
            this.fetchEvents();
          } else {
            alert(`Ошибка при удалении мероприятия: ${response.error}`);
          }
        } catch (error) {
          console.error('Ошибка при удалении мероприятия:', error);
          alert('Ошибка соединения с сервером');
        }
      }
    }
  }
}
</script>

<style scoped>
/* Дополнительные стили при необходимости */
</style> 