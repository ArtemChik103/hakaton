<template>
  <div class="profile-page bg-gray-50 min-h-screen pb-12">
    <!-- Шапка профиля с градиентом -->
    <div class="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-800 py-8 mb-8 shadow-lg">
      <div class="container mx-auto px-4">
        <div class="flex items-center">
          <div v-if="user.avatar" class="w-24 h-24 rounded-full bg-center bg-cover border-4 border-white shadow-md mr-6" :style="{ backgroundImage: `url(${user.avatar})` }"></div>
          <div v-else class="w-24 h-24 bg-white text-blue-600 rounded-full mr-6 flex items-center justify-center text-3xl font-bold border-4 border-white shadow-md transition-all duration-300 hover:bg-blue-50">
            {{ userInitials }}
          </div>
          <div>
            <h1 class="text-3xl font-bold text-white mb-1 flex items-center">
              {{ user.first_name }} {{ user.last_name }}
              <span v-if="user.phone_verified" class="ml-2 bg-green-400 text-white text-xs px-2 py-1 rounded-full uppercase tracking-wide shadow-sm">Проверен</span>
            </h1>
            <p class="text-blue-100 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {{ user.email }}
            </p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Основной контент профиля -->
    <div class="container mx-auto px-4">
      <!-- Навигация по вкладкам -->
      <div class="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
        <div class="flex border-b">
          <button 
            v-for="tab in tabs" 
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'px-6 py-4 font-medium text-sm focus:outline-none transition-all duration-200 flex items-center',
              activeTab === tab.id 
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
                : 'text-gray-500 hover:text-blue-500 hover:bg-gray-50'
            ]"
          >
            <svg v-if="tab.id === 'general'" class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <svg v-else-if="tab.id === 'education'" class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
            </svg>
            <svg v-else-if="tab.id === 'work'" class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <svg v-else-if="tab.id === 'skills'" class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <svg v-else-if="tab.id === 'achievements'" class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            {{ tab.name }}
          </button>
        </div>
      </div>
      
      <!-- Вкладка "Мои данные" -->
      <div v-if="activeTab === 'general'" class="bg-white rounded-lg shadow-lg p-6 mb-6 transition-all duration-300">
        <div class="flex justify-between items-center mb-8 pb-3 border-b border-gray-100">
          <h2 class="text-xl font-bold text-gray-800">Общие данные</h2>
          <button @click="editProfile" class="text-sm bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition-all duration-200 transform hover:scale-105 hover:shadow-md flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Редактировать
          </button>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
          <div class="transition-all duration-200 hover:bg-blue-50 p-3 rounded-lg group">
            <label class="block text-sm font-medium text-gray-500 mb-2">Фамилия</label>
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <p class="text-gray-900 font-medium text-base">{{ user.last_name || 'Не указано' }}</p>
            </div>
          </div>

          <div class="transition-all duration-200 hover:bg-blue-50 p-3 rounded-lg group">
            <label class="block text-sm font-medium text-gray-500 mb-2">Имя</label>
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <p class="text-gray-900 font-medium text-base">{{ user.first_name || 'Не указано' }}</p>
            </div>
          </div>

          <div class="transition-all duration-200 hover:bg-blue-50 p-3 rounded-lg group">
            <label class="block text-sm font-medium text-gray-500 mb-2">Отчество</label>
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <p class="text-gray-900 font-medium text-base">{{ user.middle_name || 'Не указано' }}</p>
            </div>
          </div>

          <div class="transition-all duration-200 hover:bg-blue-50 p-3 rounded-lg group">
            <label class="block text-sm font-medium text-gray-500 mb-2">Дата рождения</label>
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p class="text-gray-900 font-medium text-base">{{ user.birth_date ? formatDate(user.birth_date) : 'Не указано' }}</p>
            </div>
          </div>

          <div class="transition-all duration-200 hover:bg-blue-50 p-3 rounded-lg group">
            <label class="block text-sm font-medium text-gray-500 mb-2">E-mail</label>
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <p class="text-gray-900 font-medium text-base">{{ user.email }}</p>
            </div>
          </div>

          <div class="transition-all duration-200 hover:bg-blue-50 p-3 rounded-lg group">
            <label class="block text-sm font-medium text-gray-500 mb-2">Телефон</label>
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <p class="text-gray-900 font-medium text-base mr-2">{{ user.phone || 'Не указано' }}</p>
              <span v-if="user.phone_verified" class="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                Подтвержден
              </span>
              <button v-else-if="user.phone" @click="verifyPhone" class="text-xs text-blue-600 hover:text-blue-800 font-medium">
                Подтвердить
              </button>
            </div>
          </div>

          <div class="transition-all duration-200 hover:bg-blue-50 p-3 rounded-lg group">
            <label class="block text-sm font-medium text-gray-500 mb-2">Город</label>
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p class="text-gray-900 font-medium text-base">{{ user.location || 'Не указано' }}</p>
            </div>
          </div>
          
          <div class="transition-all duration-200 hover:bg-blue-50 p-3 rounded-lg group">
            <label class="block text-sm font-medium text-gray-500 mb-2">ГШ</label>
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <p class="text-gray-900 font-medium text-base">ГШ28</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Вкладка "Образование" -->
      <div v-if="activeTab === 'education'" class="bg-white rounded-lg shadow p-6 mb-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-bold text-gray-800">Образование</h2>
          <button @click="addEducation" class="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Добавить образование
          </button>
        </div>
        
        <div v-if="education.length > 0">
          <div v-for="(edu, index) in education" :key="index" class="border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:mb-0 last:pb-0">
            <div class="flex justify-between">
              <div>
                <h3 class="font-medium text-gray-900">{{ edu.institution }}</h3>
                <p class="text-sm text-gray-600">{{ edu.degree }}</p>
                <div class="flex items-center text-sm text-gray-500 mt-1">
                  <span>{{ edu.field }}</span>
                  <span class="mx-2">•</span>
                  <span>{{ edu.year_start }} - {{ edu.year_end || 'По настоящее время' }}</span>
                </div>
              </div>
              <div class="flex items-start space-x-2">
                <button @click="editEducation(index)" class="text-gray-500 hover:text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button @click="removeEducation(index)" class="text-gray-500 hover:text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div v-else class="text-center py-8 text-gray-500">
          <div class="text-5xl mb-4">🎓</div>
          <p>У вас пока нет добавленных учебных заведений</p>
          <p class="mt-2 text-sm">Добавьте информацию о своем образовании</p>
        </div>
      </div>
      
      <!-- Вкладка "Работа" -->
      <div v-if="activeTab === 'work'" class="bg-white rounded-lg shadow p-6 mb-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-bold text-gray-800">Работа</h2>
          <button @click="addWorkExperience" class="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Добавить место работы
          </button>
        </div>
        
        <div v-if="workExperience.length > 0">
          <div v-for="(work, index) in workExperience" :key="index" class="border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:mb-0 last:pb-0">
            <div class="flex justify-between">
              <div>
                <h3 class="font-medium text-gray-900">{{ work.company }}</h3>
                <p class="text-sm text-gray-600">{{ work.position }}</p>
                <div class="flex items-center text-sm text-gray-500 mt-1">
                  <span>{{ work.field }}</span>
                  <span class="mx-2">•</span>
                  <span>{{ work.year_start }} - {{ work.year_end || 'По настоящее время' }}</span>
                </div>
              </div>
              <div class="flex items-start space-x-2">
                <button @click="editWorkExperience(index)" class="text-gray-500 hover:text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button @click="removeWorkExperience(index)" class="text-gray-500 hover:text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div v-else class="text-center py-8 text-gray-500">
          <div class="text-5xl mb-4">💼</div>
          <p>У вас пока нет добавленных мест работы</p>
          <p class="mt-2 text-sm">Добавьте информацию о своем опыте работы</p>
        </div>
      </div>

      <!-- Вкладка "Навыки" -->
      <div v-if="activeTab === 'skills'" class="bg-white rounded-lg shadow-lg p-6 mb-6 transition-all duration-300">
        <h2 class="text-xl font-bold text-gray-800 mb-6 pb-3 border-b border-gray-100 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Навыки
        </h2>
        
        <div v-if="!editingSkills" class="relative">
          <div v-if="userTags.length > 0" class="flex flex-wrap gap-3 mb-6 p-4 bg-blue-50 rounded-lg">
            <div v-for="(tag, index) in userTags" :key="index" 
                 class="bg-white text-blue-700 text-sm font-medium px-4 py-2 rounded-md shadow-sm hover:shadow-md transition-all duration-200 flex items-center border border-blue-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              {{ tag }}
            </div>
          </div>
          
          <div v-else class="text-center py-10 text-gray-500 bg-blue-50 rounded-lg mb-6">
            <div class="text-6xl mb-4">⚡</div>
            <p class="text-lg font-medium">У вас пока нет добавленных навыков</p>
            <p class="mt-2 text-sm">Добавьте информацию о своих профессиональных навыках, чтобы найти подходящие мероприятия</p>
          </div>
          
          <button @click="startEditingSkills" class="text-sm bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition-all duration-200 transform hover:scale-105 hover:shadow-md flex items-center ml-auto">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Редактировать навыки
          </button>
        </div>
        
        <div v-else>
          <div class="bg-blue-50 p-6 rounded-lg mb-6 shadow-inner">
            <div class="flex flex-wrap gap-3 mb-4">
              <div v-for="(tag, index) in editedTags" :key="'tag-'+index" 
                   class="bg-white text-blue-700 text-sm font-medium px-4 py-2 rounded-md shadow-sm transition-all duration-200 flex items-center border border-blue-200">
                {{ tag }}
                <button @click="removeTag(index)" class="ml-2 text-red-500 hover:text-red-700 focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div class="flex mb-4">
              <input v-model="newTag" @keydown.enter.prevent="addTag" 
                     type="text" 
                     placeholder="Введите навык и нажмите Enter" 
                     class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
              />
              <button @click="addTag" class="ml-3 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-md transition-all duration-200 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Добавить
              </button>
            </div>
            
            <div class="bg-white p-4 rounded-md shadow-sm">
              <p class="text-sm font-medium text-gray-600 mb-3">Популярные навыки:</p>
              <div class="flex flex-wrap gap-2">
                <button v-for="(tag, index) in suggestedTags" 
                        :key="'suggest-'+index" 
                        @click="addSuggestedTag(tag)"
                        class="bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs px-3 py-1.5 rounded-full transition-all duration-200">
                  + {{ tag }}
                </button>
              </div>
            </div>
          </div>
          
          <div class="flex justify-end space-x-3">
            <button @click="cancelEditingSkills" class="text-sm text-gray-700 bg-white border border-gray-300 px-5 py-2 rounded-md hover:bg-gray-50 transition-all duration-200 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Отмена
            </button>
            <button @click="saveSkills" class="text-sm bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition-all duration-200 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Сохранить
            </button>
          </div>
        </div>
      </div>
      
      <!-- Вкладка "Достижения" -->
      <div v-if="activeTab === 'achievements'" class="bg-white rounded-lg shadow p-6 mb-6">
        <h2 class="text-xl font-bold text-gray-800 mb-6">Достижения</h2>
        
        <div v-if="achievements.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <p>У вас пока нет достижений</p>
          <p class="mt-2 text-sm">Посещайте мероприятия и будьте активны, чтобы получать награды!</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-md p-6 mb-6">
            <div class="flex flex-col items-center">
              <div v-if="user.avatar" class="w-32 h-32 rounded-full mb-4 bg-center bg-cover" :style="{ backgroundImage: `url(${user.avatar})` }"></div>
              <div v-else class="w-32 h-32 bg-blue-100 text-blue-600 rounded-full mb-4 flex items-center justify-center text-4xl">
                {{ userInitials }}
              </div>
              <h2 class="text-xl font-bold text-gray-800">{{ user.first_name }} {{ user.last_name }}</h2>
              <p class="text-gray-600">{{ user.bio || 'IT-специалист' }}</p>
              <div class="mt-4 flex flex-wrap gap-2">
                <div v-for="(tag, index) in userTags" :key="index" 
                     class="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {{ tag }}
                </div>
              </div>
            </div>
            <hr class="my-6" />
            <div class="space-y-4">
              <div>
                <h3 class="text-md font-medium text-gray-700 mb-1">Email</h3>
                <p class="text-gray-600">{{ user.email }}</p>
              </div>
              <div v-if="user.phone">
                <h3 class="text-md font-medium text-gray-700 mb-1">Телефон</h3>
                <p class="text-gray-600">{{ user.phone }}</p>
                <div v-if="!user.phone_verified" class="mt-1">
                  <button @click="verifyPhone" class="text-sm text-blue-600 hover:text-blue-800">
                    Подтвердить телефон
                  </button>
                </div>
                <div v-else class="mt-1 text-sm text-green-600">
                  Телефон подтвержден
                </div>
              </div>
              <div>
                <h3 class="text-md font-medium text-gray-700 mb-1">Локация</h3>
                <p class="text-gray-600">{{ user.location || 'Не указано' }}</p>
              </div>
            </div>
            <div class="mt-6">
              <button @click="editProfile" class="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                Редактировать профиль
              </button>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-lg font-bold text-gray-800 mb-4">Статистика</h3>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-gray-600">Посещено мероприятий</span>
                <span class="font-medium">{{ statistics.eventsVisited || 0 }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Достижения</span>
                <span class="font-medium">{{ statistics.achievements || 0 }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Рейтинг</span>
                <span class="font-medium">{{ statistics.rating || 0 }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Место в рейтинге</span>
                <span class="font-medium">{{ statistics.ratingPlace ? '#' + statistics.ratingPlace : 'Не определено' }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 class="text-lg font-bold text-gray-800 mb-4">Предстоящие мероприятия</h3>
            <div v-if="upcomingEvents.length > 0" class="space-y-4">
              <div v-for="(event, index) in upcomingEvents" :key="index" class="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <div class="flex">
                  <div class="w-16 text-center mr-4">
                    <div class="bg-purple-100 rounded-lg p-2">
                      <div class="text-sm text-gray-500">{{ formatDateMonth(event.date) }}</div>
                      <div class="text-lg font-bold text-purple-700">{{ formatDateDay(event.date) }}</div>
                    </div>
                  </div>
                  <div>
                    <h4 class="font-bold text-gray-800">{{ event.title }}</h4>
                    <p class="text-sm text-gray-600 mb-2">{{ event.description }}</p>
                    <div class="text-xs text-gray-500">{{ formatTime(event.startTime) }} - {{ formatTime(event.endTime) }} • {{ event.location }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-center py-8 text-gray-500">
              <div class="text-5xl mb-4">📅</div>
              <p>У вас нет предстоящих мероприятий</p>
              <p class="mt-2 text-sm">Загляните в <router-link to="/events" class="text-blue-600 hover:underline">календарь событий</router-link>, чтобы выбрать интересные мероприятия</p>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-lg font-bold text-gray-800 mb-4">История активности</h3>
            <div v-if="activityHistory.length > 0" class="space-y-4">
              <div v-for="(activity, index) in activityHistory" :key="index" class="flex items-start">
                <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0 text-purple-600">
                  <span class="text-xl">{{ activity.icon }}</span>
                </div>
                <div>
                  <h4 class="font-bold text-gray-800">{{ activity.title }}</h4>
                  <p class="text-sm text-gray-600">{{ activity.description }}</p>
                  <p class="text-xs text-gray-500 mt-1">{{ formatDate(activity.date) }}</p>
                </div>
              </div>
            </div>
            <div v-else class="text-center py-8 text-gray-500">
              <div class="text-5xl mb-4">📊</div>
              <p>История активности пуста</p>
              <p class="mt-2 text-sm">Ваши действия будут отображаться здесь</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Модальное окно редактирования профиля -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-auto relative" @click.stop>
        <div class="flex justify-between items-center p-4 border-b">
          <h2 class="text-xl font-bold">Редактировать профиль</h2>
          <button @click="showEditModal = false" class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div class="p-6">
          <form @submit.prevent="saveProfile">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Имя</label>
                <input v-model="editedProfile.first_name" type="text" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Фамилия</label>
                <input v-model="editedProfile.last_name" type="text" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Отчество</label>
                <input v-model="editedProfile.middle_name" type="text" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Дата рождения</label>
                <input v-model="editedProfile.birth_date" type="date" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
              </div>
            </div>
            
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">О себе</label>
              <textarea v-model="editedProfile.bio" rows="3" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"></textarea>
            </div>
            
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Город</label>
              <input v-model="editedProfile.location" type="text" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
            </div>
            
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
              <input v-model="editedProfile.phone" type="tel" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
            </div>
            
            <div class="flex justify-end space-x-3 mt-6">
              <button type="button" @click="showEditModal = false" class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Отмена
              </button>
              <button type="submit" class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Сохранить
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    
    <!-- Модальное окно добавления/редактирования образования -->
    <div v-if="showEducationModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div class="bg-white rounded-lg shadow-xl max-w-lg w-full mx-auto relative" @click.stop>
        <div class="flex justify-between items-center p-4 border-b">
          <h2 class="text-xl font-bold">{{ educationModalMode === 'add' ? 'Добавить образование' : 'Редактировать образование' }}</h2>
          <button @click="showEducationModal = false" class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div class="p-6">
          <form @submit.prevent="saveEducation">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Учебное заведение</label>
                <input v-model="editedEducation.institution" type="text" required class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Уровень образования</label>
                <select v-model="editedEducation.degree" required class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option value="Среднее общее">Среднее общее</option>
                  <option value="Среднее профессиональное">Среднее профессиональное</option>
                  <option value="Бакалавриат">Бакалавриат</option>
                  <option value="Специалитет">Специалитет</option>
                  <option value="Магистратура">Магистратура</option>
                  <option value="Аспирантура">Аспирантура</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Специальность</label>
                <input v-model="editedEducation.field" type="text" required class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
              </div>
              
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Год начала</label>
                  <input v-model="editedEducation.year_start" type="number" required class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Год окончания</label>
                  <input v-model="editedEducation.year_end" type="number" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                </div>
              </div>
              
              <div class="flex items-center">
                <input id="current-study" v-model="editedEducation.is_current" type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <label for="current-study" class="ml-2 block text-sm text-gray-700">
                  Учусь в настоящее время
                </label>
              </div>
            </div>
            
            <div class="flex justify-end space-x-3 mt-6">
              <button type="button" @click="showEducationModal = false" class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Отмена
              </button>
              <button type="submit" class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Сохранить
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    
    <!-- Модальное окно добавления/редактирования опыта работы -->
    <div v-if="showWorkModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div class="bg-white rounded-lg shadow-xl max-w-lg w-full mx-auto relative" @click.stop>
        <div class="flex justify-between items-center p-4 border-b">
          <h2 class="text-xl font-bold">{{ workModalMode === 'add' ? 'Добавить место работы' : 'Редактировать место работы' }}</h2>
          <button @click="showWorkModal = false" class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div class="p-6">
          <form @submit.prevent="saveWorkExperience">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Компания/Организация</label>
                <input v-model="editedWork.company" type="text" required class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Должность</label>
                <input v-model="editedWork.position" type="text" required class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Сфера деятельности</label>
                <select v-model="editedWork.field" required class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option value="IT и разработка ПО">IT и разработка ПО</option>
                  <option value="Образование">Образование</option>
                  <option value="Маркетинг и PR">Маркетинг и PR</option>
                  <option value="Финансы и бухгалтерия">Финансы и бухгалтерия</option>
                  <option value="Государственная служба">Государственная служба</option>
                  <option value="Культура, искусство, творческие индустрии">Культура, искусство, творческие индустрии</option>
                  <option value="Другое">Другое</option>
                </select>
              </div>
              
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Год начала</label>
                  <input v-model="editedWork.year_start" type="number" required class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Год окончания</label>
                  <input v-model="editedWork.year_end" type="number" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                </div>
              </div>
              
              <div class="flex items-center">
                <input id="current-work" v-model="editedWork.is_current" type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <label for="current-work" class="ml-2 block text-sm text-gray-700">
                  Работаю в настоящее время
                </label>
              </div>
            </div>
            
            <div class="flex justify-end space-x-3 mt-6">
              <button type="button" @click="showWorkModal = false" class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Отмена
              </button>
              <button type="submit" class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Сохранить
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    
    <!-- Модальное окно редактирования навыков -->
    <div v-if="showSkillsModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div class="bg-white rounded-lg shadow-xl max-w-lg w-full mx-auto relative" @click.stop>
        <div class="flex justify-between items-center p-4 border-b">
          <h2 class="text-xl font-bold">Редактировать навыки</h2>
          <button @click="showSkillsModal = false" class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div class="p-6">
          <form @submit.prevent="saveSkills">
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Навыки и технологии (через запятую)</label>
              <textarea v-model="tagsInput" rows="4" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"></textarea>
              <p class="mt-2 text-sm text-gray-500">Например: JavaScript, Vue.js, React, Node.js, Python</p>
            </div>
            
            <div class="flex justify-end space-x-3 mt-6">
              <button type="button" @click="showSkillsModal = false" class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Отмена
              </button>
              <button type="submit" class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
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
import { userApi } from '@/utils/api.js';

export default {
  name: 'ProfilePage',
  data() {
    return {
      activeTab: 'general',
      tabs: [
        { id: 'general', name: 'Мои данные' },
        { id: 'education', name: 'Образование' },
        { id: 'work', name: 'Работа' },
        { id: 'skills', name: 'Навыки' },
        { id: 'achievements', name: 'Достижения' }
      ],
      user: {
        email: '',
        first_name: '',
        last_name: '',
        middle_name: '',
        birth_date: '',
        phone: '',
        phone_verified: false,
        bio: '',
        location: '',
        avatar: null
      },
      userTags: ['JavaScript', 'Vue.js', 'HTML/CSS'], // По умолчанию
      education: [],
      workExperience: [],
      achievements: [],
      // Добавляем недостающие объекты данных
      statistics: {
        eventsVisited: 0,
        achievements: 0,
        rating: 0,
        ratingPlace: null
      },
      upcomingEvents: [],
      activityHistory: [],
      
      // Модальные окна
      showEditModal: false,
      showEducationModal: false,
      showWorkModal: false,
      showSkillsModal: false,
      
      // Редактируемые данные
      editedProfile: {
        first_name: '',
        last_name: '',
        middle_name: '',
        birth_date: '',
        bio: '',
        location: '',
        phone: ''
      },
      editedEducation: {
        institution: '',
        degree: '',
        field: '',
        year_start: null,
        year_end: null,
        is_current: false
      },
      editedWork: {
        company: '',
        position: '',
        field: '',
        year_start: null,
        year_end: null,
        is_current: false
      },
      tagsInput: '',
      
      // Режимы модальных окон
      educationModalMode: 'add', // 'add' или 'edit'
      workModalMode: 'add', // 'add' или 'edit'
      editedEducationIndex: -1, // Индекс редактируемого образования
      editedWorkIndex: -1, // Индекс редактируемого опыта работы
      editingFields: {}, // Добавляем для хранения состояния редактирования
      
      editingSkills: false,
      editedTags: [],
      newTag: '',
      suggestedTags: ['JavaScript', 'HTML', 'CSS', 'Vue.js', 'React', 'TypeScript', 'Node.js', 'Python', 'Java', 'Docker', 'Git', 'UI/UX', 'SQL']
    }
  },
  computed: {
    userInitials() {
      if (this.user.first_name && this.user.last_name) {
        return (this.user.first_name.charAt(0) + this.user.last_name.charAt(0)).toUpperCase();
      } else if (this.user.first_name) {
        return this.user.first_name.charAt(0).toUpperCase();
      } else if (this.user.email) {
        return this.user.email.charAt(0).toUpperCase();
      }
      return '?';
    }
  },
  created() {
    this.loadUserData();
    this.fetchUserProfile();
    this.fetchEducation();
    this.fetchWorkExperience();
    this.fetchAchievements();
    this.fetchUserStatistics();
    this.fetchUpcomingEvents();
    this.fetchActivityHistory();
  },
  methods: {
    loadUserData() {
      // Загружаем данные пользователя из localStorage
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          const userData = JSON.parse(userStr);
          // Обновляем только базовую информацию
          this.user = { ...this.user, ...userData };
        } catch (e) {
          console.error('Ошибка при разборе данных пользователя', e);
        }
      }
    },
    
    async fetchUserProfile() {
      try {
        const response = await userApi.getProfile();
        if (response.success) {
          console.log('Получены данные профиля:', response.data);
          // Обновляем данные пользователя
          this.user = { ...this.user, ...response.data };
          
          // Обновляем localStorage
          localStorage.setItem('user', JSON.stringify(this.user));
        } else {
          console.error('Ошибка при получении профиля:', response.error);
        }
      } catch (error) {
        console.error('Ошибка запроса профиля:', error);
      }
      
      // Если API не вернуло данные или произошла ошибка, используем имитацию
      if (!this.userTags || this.userTags.length === 0) {
        this.userTags = ['JavaScript', 'Vue.js', 'React', 'Node.js'];
      }
    },
    
    async fetchEducation() {
      // TODO: Запрос к API для получения образования пользователя
      console.log('Запрашиваем образование пользователя');
      
      // Имитация загрузки данных
      setTimeout(() => {
        this.education = [
          {
            institution: 'ФГБОУ ВО "Амурский государственный университет"',
            degree: 'Бакалавриат',
            field: 'Информационные системы и программирование',
            year_start: 2017,
            year_end: 2021,
            is_current: false
          },
          {
            institution: 'МАОУ "Школа №16 г. Благовещенска"',
            degree: 'Среднее общее',
            field: '',
            year_start: 2007,
            year_end: 2017,
            is_current: false
          }
        ];
      }, 500);
    },
    
    async fetchWorkExperience() {
      // TODO: Запрос к API для получения опыта работы пользователя
      console.log('Запрашиваем опыт работы пользователя');
      
      // Имитация загрузки данных
      setTimeout(() => {
        this.workExperience = [
          {
            company: 'ООО "IT-Компания"',
            position: 'Frontend-разработчик',
            field: 'IT и разработка ПО',
            year_start: 2021,
            year_end: null,
            is_current: true
          }
        ];
      }, 700);
    },
    
    async fetchAchievements() {
      // TODO: Запрос к API для получения достижений пользователя
      console.log('Запрашиваем достижения пользователя');
      
      // Имитация загрузки данных
      setTimeout(() => {
        this.achievements = [
          { name: 'Первые шаги', emoji: '🏆', dateReceived: new Date(2023, 2, 15) },
          { name: 'Активный участник', emoji: '🌟', dateReceived: new Date(2023, 3, 10) },
          { name: 'Эксперт контента', emoji: '📚', dateReceived: new Date(2023, 4, 5) },
          { name: 'Командный игрок', emoji: '👥', dateReceived: new Date(2023, 5, 20) }
        ];
      }, 900);
    },
    
    formatDate(dateObj) {
      if (!dateObj) return '';
      return new Date(dateObj).toLocaleDateString('ru-RU');
    },
    
    formatDateMonth(dateObj) {
      if (!dateObj) return '';
      const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
      const date = new Date(dateObj);
      return months[date.getMonth()];
    },
    
    formatDateDay(dateObj) {
      if (!dateObj) return '';
      return new Date(dateObj).getDate();
    },
    
    formatTime(timeStr) {
      return timeStr || '';
    },
    
    // Методы для модальных окон
    editProfile() {
      this.editedProfile = {
        first_name: this.user.first_name || '',
        last_name: this.user.last_name || '',
        middle_name: this.user.middle_name || '',
        birth_date: this.user.birth_date || '',
        bio: this.user.bio || '',
        location: this.user.location || '',
        phone: this.user.phone || ''
      };
      this.showEditModal = true;
    },
    
    async saveProfile() {
      try {
        const profileData = { ...this.editedProfile };
        
        const response = await userApi.updateProfile(profileData);
        if (response.success) {
          console.log('Профиль обновлен:', response.data);
          
          // Обновляем данные пользователя
          this.user = { ...this.user, ...response.data };
          
          // Обновляем localStorage
          const userStr = localStorage.getItem('user');
          if (userStr) {
            try {
              const userData = JSON.parse(userStr);
              localStorage.setItem('user', JSON.stringify({
                ...userData,
                ...this.editedProfile
              }));
            } catch (e) {
              console.error('Ошибка при обновлении данных пользователя', e);
            }
          }
        } else {
          console.error('Ошибка при обновлении профиля:', response.error);
          alert('Не удалось сохранить профиль. Попробуйте позже.');
        }
      } catch (error) {
        console.error('Ошибка запроса обновления профиля:', error);
        alert('Произошла ошибка. Пожалуйста, попробуйте позже.');
      }
      
      // Закрываем модальное окно
      this.showEditModal = false;
    },
    
    // Методы для образования
    addEducation() {
      this.educationModalMode = 'add';
      this.editedEducation = {
        institution: '',
        degree: '',
        field: '',
        year_start: new Date().getFullYear(),
        year_end: null,
        is_current: false
      };
      this.showEducationModal = true;
    },
    
    editEducation(index) {
      this.educationModalMode = 'edit';
      this.editedEducationIndex = index;
      this.editedEducation = { ...this.education[index] };
      this.showEducationModal = true;
    },
    
    removeEducation(index) {
      if (confirm('Вы уверены, что хотите удалить запись об образовании?')) {
        this.education.splice(index, 1);
        // TODO: Сохранение на сервере
      }
    },
    
    saveEducation() {
      // Если указано "учусь в настоящее время", то год окончания не указываем
      if (this.editedEducation.is_current) {
        this.editedEducation.year_end = null;
      }
      
      if (this.educationModalMode === 'add') {
        this.education.push({ ...this.editedEducation });
      } else {
        this.education[this.editedEducationIndex] = { ...this.editedEducation };
      }
      
      // TODO: Сохранение на сервере
      
      this.showEducationModal = false;
    },
    
    // Методы для опыта работы
    addWorkExperience() {
      this.workModalMode = 'add';
      this.editedWork = {
        company: '',
        position: '',
        field: '',
        year_start: new Date().getFullYear(),
        year_end: null,
        is_current: true
      };
      this.showWorkModal = true;
    },
    
    editWorkExperience(index) {
      this.workModalMode = 'edit';
      this.editedWorkIndex = index;
      this.editedWork = { ...this.workExperience[index] };
      this.showWorkModal = true;
    },
    
    removeWorkExperience(index) {
      if (confirm('Вы уверены, что хотите удалить запись о месте работы?')) {
        this.workExperience.splice(index, 1);
        // TODO: Сохранение на сервере
      }
    },
    
    saveWorkExperience() {
      // Если указано "работаю в настоящее время", то год окончания не указываем
      if (this.editedWork.is_current) {
        this.editedWork.year_end = null;
      }
      
      if (this.workModalMode === 'add') {
        this.workExperience.push({ ...this.editedWork });
      } else {
        this.workExperience[this.editedWorkIndex] = { ...this.editedWork };
      }
      
      // TODO: Сохранение на сервере
      
      this.showWorkModal = false;
    },
    
    // Методы для навыков
    editSkills() {
      this.startEditingSkills();
    },
    
    saveSkills() {
      // Simulate API call with delay
      setTimeout(() => {
        this.userTags = [...this.editedTags];
        this.editingSkills = false;
        this.$toast.success('Навыки успешно обновлены');
      }, 500);
      
      // In a real application, you would make an API request:
      /*
      axios.patch('/api/profile/skills', { tags: this.editedTags })
        .then(response => {
          this.userTags = response.data.tags;
          this.editingSkills = false;
          this.$toast.success('Навыки успешно обновлены');
        })
        .catch(error => {
          console.error('Error updating skills:', error);
          this.$toast.error('Произошла ошибка при обновлении навыков');
        });
      */
    },
    
    async verifyPhone() {
      try {
        // Отправляем запрос на отправку SMS
        const response = await userApi.sendSmsVerification();
        if (response.success) {
          const code = prompt('Введите код подтверждения из SMS');
          if (code) {
            // Отправляем код для проверки
            const verifyResponse = await userApi.verifyPhone({ code });
            if (verifyResponse.success) {
              alert('Телефон успешно подтвержден');
              this.user.phone_verified = true;
              
              // Обновляем localStorage
              const userStr = localStorage.getItem('user');
              if (userStr) {
                try {
                  const userData = JSON.parse(userStr);
                  localStorage.setItem('user', JSON.stringify({
                    ...userData,
                    phone_verified: true
                  }));
                } catch (e) {
                  console.error('Ошибка при обновлении данных пользователя', e);
                }
              }
            } else {
              alert('Неверный код подтверждения');
            }
          }
        } else {
          alert('Не удалось отправить SMS. Попробуйте позже.');
        }
      } catch (error) {
        console.error('Ошибка при верификации телефона:', error);
        alert('Произошла ошибка. Пожалуйста, попробуйте позже.');
      }
    },
    
    async fetchUserStatistics() {
      // TODO: Запрос к API для получения статистики пользователя
      console.log('Запрашиваем статистику пользователя');
      
      // Имитация загрузки данных
      setTimeout(() => {
        this.statistics = {
          eventsVisited: 10,
          achievements: 5,
          rating: 4.5,
          ratingPlace: 2
        };
      }, 500);
    },
    
    async fetchUpcomingEvents() {
      // TODO: Запрос к API для получения предстоящих мероприятий пользователя
      console.log('Запрашиваем предстоящие мероприятия пользователя');
      
      // Имитация загрузки данных
      setTimeout(() => {
        this.upcomingEvents = [
          {
            title: 'Веб-разработка для начинающих',
            description: 'Курс для новичков в веб-разработке',
            date: new Date(2023, 6, 15),
            startTime: '10:00',
            endTime: '12:00',
            location: 'Online'
          },
          {
            title: 'Встреча с экспертом',
            description: 'Встреча с ведущим специалистом в области IT',
            date: new Date(2023, 7, 5),
            startTime: '18:00',
            endTime: '20:00',
            location: 'Офис компании'
          }
        ];
      }, 700);
    },
    
    async fetchActivityHistory() {
      // TODO: Запрос к API для получения истории активности пользователя
      console.log('Запрашиваем историю активности пользователя');
      
      // Имитация загрузки данных
      setTimeout(() => {
        this.activityHistory = [
          {
            title: 'Просмотр вебинара',
            description: 'Просмотрел вебинар по JavaScript',
            date: new Date(2023, 5, 20),
            icon: '📺'
          },
          {
            title: 'Участие в тренинге',
            description: 'Участвовал в тренинге по Vue.js',
            date: new Date(2023, 4, 10),
            icon: '🎯'
          }
        ];
      }, 900);
    },
    startEditing(field) {
      this.editingFields[field] = true;
      this.$set(this.editedProfile, field, this.user[field]);
    },
    saveField(field) {
      // Copy field value to temporary object for API update
      const updateData = { [field]: this.editedProfile[field] };
      
      // Make API call to update just this field
      this.updateFieldInAPI(field, updateData);
    },
    cancelEditing(field) {
      this.editingFields[field] = false;
      this.$set(this.editedProfile, field, this.user[field]);
    },
    updateFieldInAPI(field, updateData) {
      // Simulate API call with delay
      setTimeout(() => {
        // Update user data with new values
        this.user[field] = this.editedProfile[field];
        // Turn off editing mode
        this.editingFields[field] = false;
        
        // Show success notification
        this.$toast.success(`Поле "${field}" успешно обновлено`);
      }, 500);
      
      // In a real application, you would make an API request:
      /*
      axios.patch('/api/profile', updateData)
        .then(response => {
          // Update the user object with the response
          this.user[field] = response.data[field];
          this.editingFields[field] = false;
          this.$toast.success(`Поле "${field}" успешно обновлено`);
        })
        .catch(error => {
          console.error('Error updating field:', error);
          this.$toast.error('Произошла ошибка при обновлении данных');
          this.editingFields[field] = false;
        });
      */
    },
    
    startEditingSkills() {
      this.editingSkills = true;
      this.editedTags = [...this.userTags]; // Create a copy of the current tags
    },
    
    cancelEditingSkills() {
      this.editingSkills = false;
      this.newTag = '';
    },
    
    addTag() {
      if (this.newTag.trim() && !this.editedTags.includes(this.newTag.trim())) {
        this.editedTags.push(this.newTag.trim());
        this.newTag = '';
      }
    },
    
    removeTag(index) {
      this.editedTags.splice(index, 1);
    },
    
    addSuggestedTag(tag) {
      if (!this.editedTags.includes(tag)) {
        this.editedTags.push(tag);
      }
    }
  }
}
</script>

<style scoped>
/* Стилизация форм для модальных окон */
input, textarea, select {
  @apply border-gray-300 rounded-md shadow-sm;
}

input:focus, textarea:focus, select:focus {
  @apply border-blue-500 ring ring-blue-200 ring-opacity-50;
}

/* Обеспечиваем плавное появление модальных окон */
.fixed.inset-0 {
  animation: fadeIn 0.2s ease-out;
}

/* Анимация появления элементов */
.profile-page {
  animation: fadeInUp 0.5s ease-out;
}

/* Анимация для секций при переключении табов */
.bg-white.rounded-lg {
  animation: slideUp 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
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

@keyframes slideUp {
  from { 
    opacity: 0.8; 
    transform: translateY(10px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

/* Hover эффекты для кнопок */
button {
  transition: all 0.2s ease;
}

button:active {
  transform: scale(0.97);
}

/* Стилизация полей ввода */
input, textarea, select {
  transition: all 0.2s ease;
}

/* Анимация для контейнеров с тегами */
.flex-wrap {
  transition: all 0.3s ease;
}
</style> 