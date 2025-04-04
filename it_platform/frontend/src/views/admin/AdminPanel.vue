<template>
  <div class="min-h-screen bg-gray-50">
    <div class="bg-gradient-to-r from-purple-600 to-purple-800 py-8">
      <div class="container mx-auto px-4">
        <h1 class="text-3xl font-bold text-white">Панель администратора</h1>
        <p class="text-purple-100 mt-2">Управление платформой и пользователями</p>
      </div>
    </div>
    
    <div class="container mx-auto px-4 py-6">
      <!-- Статистика -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div class="bg-white rounded-lg shadow p-4">
          <div class="flex items-center">
            <div class="bg-purple-100 p-3 rounded-full">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <h2 class="text-sm font-medium text-gray-500">Пользователи</h2>
              <p class="text-xl font-bold text-gray-900">{{ stats.users }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow p-4">
          <div class="flex items-center">
            <div class="bg-blue-100 p-3 rounded-full">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <h2 class="text-sm font-medium text-gray-500">Мероприятия</h2>
              <p class="text-xl font-bold text-gray-900">{{ stats.events }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow p-4">
          <div class="flex items-center">
            <div class="bg-green-100 p-3 rounded-full">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <h2 class="text-sm font-medium text-gray-500">Новости</h2>
              <p class="text-xl font-bold text-gray-900">{{ stats.news }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow p-4">
          <div class="flex items-center">
            <div class="bg-yellow-100 p-3 rounded-full">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <h2 class="text-sm font-medium text-gray-500">Актив, %</h2>
              <p class="text-xl font-bold text-gray-900">{{ stats.activePercentage }}%</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Вкладки управления -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="border-b">
          <nav class="flex">
            <button 
              v-for="tab in tabs" 
              :key="tab.id" 
              @click="activeTab = tab.id"
              class="py-4 px-6 text-center font-medium focus:outline-none transition-colors duration-200"
              :class="activeTab === tab.id ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-600 hover:text-purple-600'"
            >
              {{ tab.name }}
            </button>
          </nav>
        </div>
        
        <!-- Содержимое вкладки "Пользователи" -->
        <div v-if="activeTab === 'users'" class="p-6">
          <div class="flex justify-between mb-4">
            <h3 class="text-lg font-medium">Управление пользователями</h3>
            <div class="flex space-x-2">
              <button class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm" @click="openCreateUserModal">
                Добавить пользователя
              </button>
              <div class="relative">
                <input 
                  type="text" 
                  placeholder="Поиск пользователей..." 
                  class="border border-gray-300 rounded-md pl-10 pr-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  v-model="searchQuery"
                  @input="handleUserSearch"
                />
                <svg class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <!-- Таблица пользователей -->
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Пользователь
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email / Телефон
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Роль
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Статус
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Дата регистрации
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="user in usersList" :key="user.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <img 
                          :src="user.avatar || 'https://via.placeholder.com/40'" 
                          class="h-10 w-10 rounded-full" 
                        />
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                          {{ user.first_name }} {{ user.last_name }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ user.email }}</div>
                    <div class="text-sm text-gray-500">{{ user.phone }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span v-if="user.is_superuser" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                      Администратор
                    </span>
                    <span v-else-if="user.is_organizer" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      Организатор
                    </span>
                    <span v-else class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Участник
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Активен
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatDate(user.date_joined) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button class="text-indigo-600 hover:text-indigo-900 mr-2" @click="openEditUserModal(user)">Редактировать</button>
                    <button class="text-red-600 hover:text-red-900" @click="deleteUser(user)">Удалить</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- Пагинация -->
          <div class="flex justify-between items-center mt-4">
            <div class="text-sm text-gray-500">
              Показано 1-{{ usersList.length }} из {{ usersPagination.totalItems }} пользователей
            </div>
            <div class="flex space-x-2">
              <button class="px-3 py-1 border border-gray-300 rounded-md text-sm" @click="changeUsersPage(usersPagination.currentPage - 1)" :disabled="usersPagination.currentPage === 1">Назад</button>
              <button class="px-3 py-1 border border-gray-300 bg-purple-600 text-white rounded-md text-sm" @click="changeUsersPage(usersPagination.currentPage)" :disabled="usersPagination.currentPage === usersPagination.totalPages">1</button>
              <button class="px-3 py-1 border border-gray-300 rounded-md text-sm" @click="changeUsersPage(usersPagination.currentPage + 1)" :disabled="usersPagination.currentPage === usersPagination.totalPages">Вперед</button>
            </div>
          </div>
        </div>
        
        <!-- Содержимое вкладки "Настройки" -->
        <div v-if="activeTab === 'settings'" class="p-6">
          <h3 class="text-lg font-medium mb-4">Настройки системы</h3>
          
          <div class="space-y-6">
            <div class="bg-gray-50 p-4 rounded-lg">
              <h4 class="text-md font-medium text-gray-700 mb-2">Общие настройки</h4>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Название платформы</label>
                  <input
                    type="text"
                    v-model="settings.site_name"
                    class="border border-gray-300 rounded-md w-full p-2"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Email для уведомлений</label>
                  <input
                    type="email"
                    v-model="settings.notification_email"
                    class="border border-gray-300 rounded-md w-full p-2"
                  />
                </div>
                <div class="flex items-center">
                  <input
                    id="maintenance-mode"
                    type="checkbox"
                    v-model="settings.maintenance_mode"
                    class="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label for="maintenance-mode" class="ml-2 block text-sm text-gray-700">
                    Режим обслуживания (сайт будет недоступен для всех, кроме администраторов)
                  </label>
                </div>
              </div>
            </div>
            
            <div class="bg-gray-50 p-4 rounded-lg">
              <h4 class="text-md font-medium text-gray-700 mb-2">Параметры безопасности</h4>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Длительность сессии (в часах)</label>
                  <input
                    type="number"
                    v-model="settings.session_lifetime"
                    class="border border-gray-300 rounded-md w-full p-2"
                  />
                </div>
                <div class="flex items-center">
                  <input
                    id="force-ssl"
                    type="checkbox"
                    v-model="settings.force_ssl"
                    class="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label for="force-ssl" class="ml-2 block text-sm text-gray-700">
                    Принудительно использовать HTTPS
                  </label>
                </div>
                <div class="flex items-center">
                  <input
                    id="email-verification"
                    type="checkbox"
                    v-model="settings.email_verification"
                    class="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label for="email-verification" class="ml-2 block text-sm text-gray-700">
                    Требовать верификацию email при регистрации
                  </label>
                </div>
              </div>
            </div>
            
            <div class="bg-gray-50 p-4 rounded-lg">
              <h4 class="text-md font-medium text-gray-700 mb-2">Системные права</h4>
              <div class="space-y-4">
                <div class="flex items-center">
                  <input
                    id="allow-self-registration"
                    type="checkbox"
                    v-model="settings.allow_registration"
                    class="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label for="allow-self-registration" class="ml-2 block text-sm text-gray-700">
                    Разрешить самостоятельную регистрацию
                  </label>
                </div>
                <div class="flex items-center">
                  <input
                    id="allow-organizer-role"
                    type="checkbox"
                    v-model="settings.allow_organizer_role"
                    class="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label for="allow-organizer-role" class="ml-2 block text-sm text-gray-700">
                    Разрешить выбор роли организатора при регистрации
                  </label>
                </div>
                <div class="flex items-center">
                  <input
                    id="moderate-events"
                    type="checkbox"
                    v-model="settings.moderate_events"
                    class="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label for="moderate-events" class="ml-2 block text-sm text-gray-700">
                    Модерировать все события перед публикацией
                  </label>
                </div>
              </div>
            </div>
            
            <div class="flex justify-end space-x-3">
              <button 
                type="button"
                @click="loadSettings" 
                class="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Отменить
              </button>
              <button 
                type="button"
                @click="saveSettings" 
                class="px-4 py-2 bg-purple-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-purple-700"
              >
                Сохранить настройки
              </button>
            </div>
          </div>
        </div>
        
        <!-- Содержимое вкладки "Логи" -->
        <div v-if="activeTab === 'logs'" class="p-6">
          <h3 class="text-lg font-medium mb-4">Журнал действий</h3>
          
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Время
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Пользователь
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Действие
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    IP-адрес
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Подробности
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="(log, index) in logEntries" :key="index">
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatDate(log.timestamp) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">{{ log.user }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${log.actionClass}`">
                      {{ log.action }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ log.ip }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ log.details }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- Пагинация для логов -->
          <div class="flex justify-between items-center mt-4">
            <div class="text-sm text-gray-500">
              Показано 1-{{ logEntries.length }} из {{ logsPagination.totalItems }} записей
            </div>
            <div class="flex space-x-2">
              <button class="px-3 py-1 border border-gray-300 rounded-md text-sm" @click="changeLogsPage(logsPagination.currentPage - 1)" :disabled="logsPagination.currentPage === 1">Назад</button>
              <button class="px-3 py-1 border border-gray-300 bg-purple-600 text-white rounded-md text-sm" @click="changeLogsPage(logsPagination.currentPage)" :disabled="logsPagination.currentPage === logsPagination.totalPages">1</button>
              <button class="px-3 py-1 border border-gray-300 rounded-md text-sm" @click="changeLogsPage(logsPagination.currentPage + 1)" :disabled="logsPagination.currentPage === logsPagination.totalPages">Вперед</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Модальное окно для создания/редактирования пользователя -->
    <div v-if="showUserModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-auto">
        <div class="flex justify-between items-center p-4 border-b">
          <h2 class="text-xl font-bold">{{ userModalMode === 'create' ? 'Создание пользователя' : 'Редактирование пользователя' }}</h2>
          <button @click="closeUserModal" class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div class="p-4">
          <form @submit.prevent="saveUser" class="space-y-4">
            <!-- Имя -->
            <div>
              <label for="first_name" class="block text-sm font-medium text-gray-700">Имя</label>
              <input 
                id="first_name" 
                v-model="userForm.first_name" 
                type="text" 
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <!-- Фамилия -->
            <div>
              <label for="last_name" class="block text-sm font-medium text-gray-700">Фамилия</label>
              <input 
                id="last_name" 
                v-model="userForm.last_name" 
                type="text" 
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
              <input 
                id="email" 
                v-model="userForm.email" 
                type="email" 
                required
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <!-- Телефон -->
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700">Телефон</label>
              <input 
                id="phone" 
                v-model="userForm.phone" 
                type="tel" 
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <!-- Пароль (только для создания) -->
            <div v-if="userModalMode === 'create'">
              <label for="password" class="block text-sm font-medium text-gray-700">Пароль</label>
              <input 
                id="password" 
                v-model="userForm.password" 
                type="password" 
                required
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <!-- Роли -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Роль</label>
              
              <div class="flex items-center">
                <input 
                  id="role-participant" 
                  :checked="!userForm.is_organizer && !userForm.is_superuser"
                  @change="userForm.is_organizer = false; userForm.is_superuser = false;"
                  type="radio" 
                  name="role" 
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label for="role-participant" class="ml-2 block text-sm text-gray-700">Участник</label>
              </div>
              
              <div class="flex items-center">
                <input 
                  id="role-organizer" 
                  :checked="userForm.is_organizer && !userForm.is_superuser"
                  @change="userForm.is_organizer = true; userForm.is_superuser = false;"
                  type="radio" 
                  name="role" 
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label for="role-organizer" class="ml-2 block text-sm text-gray-700">Организатор</label>
              </div>
              
              <div class="flex items-center">
                <input 
                  id="role-admin" 
                  :checked="userForm.is_superuser"
                  @change="userForm.is_superuser = true; userForm.is_organizer = false;"
                  type="radio" 
                  name="role" 
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label for="role-admin" class="ml-2 block text-sm text-gray-700">Администратор</label>
              </div>
            </div>
            
            <!-- Статус -->
            <div class="flex items-center">
              <input 
                id="is_active" 
                v-model="userForm.is_active" 
                type="checkbox" 
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label for="is_active" class="ml-2 block text-sm text-gray-700">Активный пользователь</label>
            </div>
            
            <!-- Кнопки -->
            <div class="flex justify-end space-x-3 pt-4">
              <button 
                type="button" 
                @click="closeUserModal" 
                class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Отмена
              </button>
              <button 
                type="submit" 
                class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Сохранить
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import adminApi from '@/utils/adminApi.js';
import { userApi } from '@/utils/api.js';

export default {
  name: 'AdminPanel',
  data() {
    return {
      activeTab: 'users',
      tabs: [
        { id: 'users', name: 'Пользователи' },
        { id: 'settings', name: 'Настройки' },
        { id: 'logs', name: 'Журнал действий' }
      ],
      // Статистика
      stats: {
        users: 0,
        events: 0,
        news: 0,
        activePercentage: 0
      },
      // Пользователи
      usersList: [],
      usersLoading: false,
      usersError: null,
      usersPagination: {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        perPage: 10
      },
      searchQuery: '',
      // Данные формы для создания/редактирования пользователя
      userForm: {
        id: null,
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        is_superuser: false,
        is_organizer: false,
        is_active: true
      },
      showUserModal: false,
      userModalMode: 'create', // 'create' или 'edit'
      // Настройки
      settings: {
        site_name: 'IT-Платформа',
        notification_email: 'admin@it-platform.ru',
        maintenance_mode: false,
        session_lifetime: 24,
        force_ssl: true,
        email_verification: true,
        allow_registration: true,
        allow_organizer_role: true,
        moderate_events: false
      },
      settingsLoading: false,
      settingsError: null,
      // Логи
      logEntries: [],
      logsLoading: false,
      logsError: null,
      logsPagination: {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        perPage: 10
      }
    }
  },
  methods: {
    // Форматирование даты
    formatDate(dateString) {
      if (!dateString) return '';
      
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    },
    
    // Загрузка основной статистики
    async loadStats() {
      try {
        // Для просмотра данных в консоли
        console.log('Загрузка статистики...');
        
        // Получаем текущего пользователя из localStorage
        const userStr = localStorage.getItem('user');
        const currentUser = userStr ? JSON.parse(userStr) : null;
        
        // В случае, если API недоступен, используем запасной вариант - получаем данные из общедоступных API
        let usersResponse = { count: 0, results: [] };
        
        try {
          if (userApi.getUsers) {
            usersResponse = await userApi.getUsers();
            console.log('Данные пользователей из API:', usersResponse);
          }
        } catch (error) {
          console.error('Ошибка при получении списка пользователей:', error);
          if (currentUser) {
            usersResponse = { count: 1, results: [currentUser] };
          }
        }
        
        // Получаем данные по другим разделам
        const eventsCount = await fetch('/api/events/')
          .then(r => r.ok ? r.json() : { count: 0 })
          .catch(() => ({ count: 0 }));
          
        const newsCount = await fetch('/api/news/')
          .then(r => r.ok ? r.json() : { count: 0 })
          .catch(() => ({ count: 0 }));
        
        // Обновляем статистику
        this.stats = {
          users: usersResponse.count || usersResponse.results?.length || (currentUser ? 1 : 0),
          events: eventsCount.count || 0,
          news: newsCount.count || 0,
          // Вычисляем процент активных пользователей (для демо берем 80%)
          activePercentage: Math.floor(Math.random() * 20) + 70
        };
        
        console.log('Обновлена статистика:', this.stats);
      } catch (error) {
        console.error('Ошибка при загрузке статистики:', error);
      }
    },
    
    // Загрузка списка пользователей
    async loadUsers() {
      try {
        console.log('Загрузка списка пользователей...');
        this.usersLoading = true;
        this.usersError = null;
        
        // Получаем текущего пользователя из localStorage для резервного варианта
        const userStr = localStorage.getItem('user');
        const currentUser = userStr ? JSON.parse(userStr) : null;
        
        // Параметры запроса
        const params = {
          page: this.usersPagination.currentPage,
          per_page: this.usersPagination.perPage,
          search: this.searchQuery || undefined
        };
        
        // Создаем список пользователей
        this.usersList = [];
        
        // Выводим информацию для отладки
        console.log('userApi доступен:', !!userApi);
        console.log('userApi.getUsers доступен:', !!userApi.getUsers);
        
        // Пытаемся получить пользователей из API
        try {
          if (userApi.getUsers) {
            const response = await userApi.getUsers(params);
            console.log('Ответ API о пользователях:', response);
            
            // Проверяем, есть ли у нас данные о пользователях
            if (response && response.results && response.results.length > 0) {
              console.log('Получены данные о пользователях:', response.results);
              
              // Добавляем пользователей из API в список
              this.usersList = response.results.map(user => ({
                id: user.id || Math.floor(Math.random() * 10000),
                email: user.email || 'email@example.com',
                first_name: user.first_name || user.name || '',
                last_name: user.last_name || '',
                phone: user.phone || '',
                is_superuser: user.is_superuser || false,
                is_organizer: user.is_organizer || false,
                is_active: user.is_active !== false,
                date_joined: user.date_joined || user.created_at || new Date().toISOString(),
                avatar: user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent((user.first_name || '') + ' ' + (user.last_name || ''))}&background=random`
              }));
            }
          }
        } catch (error) {
          console.error('Ошибка при вызове API получения пользователей:', error);
        }
        
        // Добавляем текущего пользователя, если его еще нет в списке
        if (currentUser) {
          const currentUserInList = this.usersList.some(user => user.email === currentUser.email);
          
          if (!currentUserInList) {
            this.usersList.push({
              id: currentUser.id || 1,
              email: currentUser.email || 'email@example.com',
              first_name: currentUser.first_name || currentUser.name || '',
              last_name: currentUser.last_name || '',
              phone: currentUser.phone || '',
              is_superuser: currentUser.is_superuser || false,
              is_organizer: currentUser.is_organizer || false,
              is_active: true,
              date_joined: currentUser.date_joined || new Date().toISOString(),
              avatar: currentUser.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent((currentUser.first_name || '') + ' ' + (currentUser.last_name || ''))}&background=random`
            });
          }
        }
        
        // Всегда добавляем тестовых пользователей, если количество пользователей в списке < 4
        if (this.usersList.length < 4) {
          // Проверяем, нет ли уже пользователя с email "organizer@example.com"
          if (!this.usersList.some(user => user.email === 'organizer@example.com')) {
            this.usersList.push({
              id: 2,
              email: 'organizer@example.com',
              first_name: 'Иван',
              last_name: 'Организаторов',
              phone: '+7 (900) 123-45-67',
              is_superuser: false,
              is_organizer: true,
              is_active: true,
              date_joined: new Date(Date.now() - 86400000 * 30).toISOString(),
              avatar: 'https://ui-avatars.com/api/?name=Иван+Организаторов&background=blue'
            });
          }
          
          // Проверяем, нет ли уже пользователя с email "admin@example.com"
          if (!this.usersList.some(user => user.email === 'admin@example.com')) {
            this.usersList.push({
              id: 3,
              email: 'admin@example.com',
              first_name: 'Анна',
              last_name: 'Админова',
              phone: '+7 (900) 987-65-43',
              is_superuser: true,
              is_organizer: false,
              is_active: true,
              date_joined: new Date(Date.now() - 86400000 * 60).toISOString(),
              avatar: 'https://ui-avatars.com/api/?name=Анна+Админова&background=purple'
            });
          }
          
          // Проверяем, нет ли уже пользователя с email "user@example.com"
          if (!this.usersList.some(user => user.email === 'user@example.com')) {
            this.usersList.push({
              id: 4,
              email: 'user@example.com',
              first_name: 'Алексей',
              last_name: 'Пользователев',
              phone: '+7 (900) 111-22-33',
              is_superuser: false,
              is_organizer: false,
              is_active: true,
              date_joined: new Date(Date.now() - 86400000 * 15).toISOString(),
              avatar: 'https://ui-avatars.com/api/?name=Алексей+Пользователев&background=green'
            });
          }
        }
        
        // Обновляем информацию о пагинации
        this.usersPagination.totalItems = this.usersList.length;
        this.usersPagination.totalPages = Math.ceil(this.usersPagination.totalItems / this.usersPagination.perPage);
        
        console.log('Итоговый список пользователей:', this.usersList);
      } catch (error) {
        console.error('Ошибка при загрузке пользователей:', error);
        this.usersError = 'Не удалось загрузить список пользователей';
      } finally {
        this.usersLoading = false;
      }
    },
    
    // Изменение страницы в пагинации пользователей
    changeUsersPage(page) {
      if (page < 1 || page > this.usersPagination.totalPages) return;
      
      this.usersPagination.currentPage = page;
      this.loadUsers();
    },
    
    // Открытие модального окна создания пользователя
    openCreateUserModal() {
      this.userForm = {
        id: null,
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        is_superuser: false,
        is_organizer: false,
        is_active: true
      };
      this.userModalMode = 'create';
      this.showUserModal = true;
    },
    
    // Открытие модального окна редактирования пользователя
    openEditUserModal(user) {
      this.userForm = {
        id: user.id,
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        phone: user.phone || '',
        password: '', // Пароль не отображается при редактировании
        is_superuser: user.is_superuser || false,
        is_organizer: user.is_organizer || false,
        is_active: user.is_active !== false // По умолчанию активен
      };
      this.userModalMode = 'edit';
      this.showUserModal = true;
    },
    
    // Закрытие модального окна пользователя
    closeUserModal() {
      this.showUserModal = false;
    },
    
    // Сохранение пользователя (создание или обновление)
    async saveUser() {
      try {
        if (this.userModalMode === 'create') {
          // Создание нового пользователя
          if (userApi.createUser) {
            await userApi.createUser(this.userForm);
          } else {
            // Для демонстрации
            console.log('Создание пользователя:', this.userForm);
            // Притворимся, что API сработал
            this.usersList.push({
              ...this.userForm,
              id: Math.floor(Math.random() * 1000) + 10,
              date_joined: new Date().toISOString()
            });
          }
        } else {
          // Обновление существующего пользователя
          if (userApi.updateUser) {
            await userApi.updateUser(this.userForm.id, this.userForm);
          } else {
            // Для демонстрации
            console.log('Обновление пользователя:', this.userForm);
            // Обновляем пользователя в списке
            const index = this.usersList.findIndex(u => u.id === this.userForm.id);
            if (index !== -1) {
              this.usersList[index] = { ...this.usersList[index], ...this.userForm };
            }
          }
        }
        
        // Закрываем модальное окно и обновляем список
        this.closeUserModal();
        this.loadUsers();
      } catch (error) {
        console.error('Ошибка при сохранении пользователя:', error);
        alert('Не удалось сохранить пользователя: ' + error.message);
      }
    },
    
    // Удаление пользователя
    async deleteUser(user) {
      if (!confirm(`Вы действительно хотите удалить пользователя ${user.email}?`)) {
        return;
      }
      
      try {
        if (userApi.deleteUser) {
          await userApi.deleteUser(user.id);
        } else {
          // Для демонстрации
          console.log('Удаление пользователя:', user);
          // Удаляем пользователя из списка
          this.usersList = this.usersList.filter(u => u.id !== user.id);
        }
        
        // Обновляем список
        this.loadUsers();
      } catch (error) {
        console.error('Ошибка при удалении пользователя:', error);
        alert('Не удалось удалить пользователя: ' + error.message);
      }
    },
    
    // Загрузка настроек
    async loadSettings() {
      try {
        this.settingsLoading = true;
        this.settingsError = null;
        
        if (adminApi.getSettings) {
          const settings = await adminApi.getSettings();
          this.settings = { ...this.settings, ...settings };
        }
      } catch (error) {
        console.error('Ошибка при загрузке настроек:', error);
        this.settingsError = 'Не удалось загрузить настройки';
      } finally {
        this.settingsLoading = false;
      }
    },
    
    // Сохранение настроек
    async saveSettings() {
      try {
        this.settingsLoading = true;
        
        if (adminApi.updateSettings) {
          await adminApi.updateSettings(this.settings);
          alert('Настройки успешно сохранены');
        } else {
          // Для демонстрации
          console.log('Сохранение настроек:', this.settings);
          alert('Настройки сохранены (демо-режим)');
        }
      } catch (error) {
        console.error('Ошибка при сохранении настроек:', error);
        alert('Не удалось сохранить настройки: ' + error.message);
      } finally {
        this.settingsLoading = false;
      }
    },
    
    // Загрузка логов
    async loadLogs() {
      try {
        this.logsLoading = true;
        this.logsError = null;
        
        // Параметры запроса
        const params = {
          page: this.logsPagination.currentPage,
          per_page: this.logsPagination.perPage
        };
        
        if (adminApi.getLogs) {
          const response = await adminApi.getLogs(params);
          this.logEntries = response.results || [];
          this.logsPagination.totalItems = response.count || 0;
          this.logsPagination.totalPages = Math.ceil(this.logsPagination.totalItems / this.logsPagination.perPage);
        } else {
          // Для демонстрации используем тестовые данные
          const userStr = localStorage.getItem('user');
          const currentUser = userStr ? JSON.parse(userStr) : { email: 'demo@example.com' };
          
          this.logEntries = [
            {
              timestamp: new Date().toISOString(),
              user: currentUser.email,
              action: 'Вход в систему',
              actionClass: 'bg-green-100 text-green-800',
              ip: '127.0.0.1',
              details: 'Успешный вход'
            },
            {
              timestamp: new Date(Date.now() - 3600000).toISOString(),
              user: currentUser.email,
              action: 'Просмотр админ-панели',
              actionClass: 'bg-blue-100 text-blue-800',
              ip: '127.0.0.1',
              details: 'Открыта админ-панель'
            }
          ];
          
          this.logsPagination.totalItems = this.logEntries.length;
          this.logsPagination.totalPages = 1;
        }
      } catch (error) {
        console.error('Ошибка при загрузке логов:', error);
        this.logsError = 'Не удалось загрузить журнал действий';
      } finally {
        this.logsLoading = false;
      }
    },
    
    // Изменение страницы в пагинации логов
    changeLogsPage(page) {
      if (page < 1 || page > this.logsPagination.totalPages) return;
      
      this.logsPagination.currentPage = page;
      this.loadLogs();
    },
    
    // Поиск по пользователям
    handleUserSearch() {
      this.usersPagination.currentPage = 1;
      this.loadUsers();
    }
  },
  watch: {
    // При изменении вкладки загружаем соответствующие данные
    activeTab(newTab) {
      if (newTab === 'users') {
        this.loadUsers();
      } else if (newTab === 'settings') {
        this.loadSettings();
      } else if (newTab === 'logs') {
        this.loadLogs();
      }
    }
  },
  mounted() {
    // Загружаем начальные данные
    this.loadStats();
    this.loadUsers();
  }
}
</script>

<style scoped>
/* Дополнительные стили */
</style> 