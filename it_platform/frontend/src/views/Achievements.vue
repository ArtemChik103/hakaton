<template>
  <div class="achievements-page">
    <div class="mb-8 fade-in-down">
      <h1 class="text-3xl font-bold mb-2">Достижения</h1>
      <p class="text-text-medium">Система мотивации и достижений для активных участников IT-сообщества</p>
    </div>

    <!-- Баннер -->
    <div class="hero-section relative overflow-hidden mb-8 fade-in-up">
      <div class="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
        <div class="h-full w-full bg-opacity-20 bg-white">
          <div class="h-full w-full flex items-center justify-center">
            <div class="transform -rotate-12 spin-slow">
              <svg class="h-24 w-24 text-white opacity-10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-9 3h4c.55 0 1 .45 1 1v1h-6V9c0-.55.45-1 1-1zm6 11h-8v-5h8v5zm2-2c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm0-4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <div class="relative z-10 px-6 py-12 lg:py-16 lg:px-8">
        <div class="max-w-lg">
          <h2 class="hero-title text-3xl font-bold text-white sm:text-4xl">
            Система достижений
          </h2>
          <p class="mt-4 text-lg text-blue-100">
            Получайте достижения за участие в мероприятиях, организацию событий 
            и активность в сообществе. Развивайтесь и становитесь заметнее!
          </p>
        </div>
      </div>
    </div>

    <!-- Ваш текущий уровень -->
    <div class="card p-6 mb-8">
      <div class="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div class="relative">
          <div class="w-32 h-32 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 text-4xl glow-on-hover">
            🏆
          </div>
          <div class="absolute -bottom-2 -right-2 bg-secondary-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg border-4 border-white">
            2
          </div>
        </div>
        
        <div class="flex-1 text-center md:text-left">
          <h3 class="text-2xl font-bold mb-2">Ваш текущий уровень: Начинающий</h3>
          <p class="text-text-medium mb-4">
            Вы в начале пути! Посещайте мероприятия и будьте активны, чтобы получать новые достижения и повышать свой уровень.
          </p>
          
          <div class="mb-4">
            <div class="flex justify-between mb-1">
              <span class="text-sm font-medium">Прогресс до следующего уровня</span>
              <span class="text-sm font-medium">30%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2.5">
              <div class="bg-primary-600 h-2.5 rounded-full progress-animation" style="width: 30%"></div>
            </div>
          </div>
          
          <div class="flex gap-2">
            <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">450 XP</span>
            <span class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">2 мероприятия</span>
            <span class="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">5 достижений</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Ваши достижения -->
    <div class="mb-8">
      <h2 class="text-xl font-bold mb-4">Ваши достижения</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-list">
        <div class="card p-6 hover-lift">
          <div class="flex items-start">
            <div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-xl mr-4 flex-shrink-0">
              👋
            </div>
            <div>
              <h3 class="font-bold mb-1">Добро пожаловать!</h3>
              <p class="text-text-medium text-sm mb-2">Зарегистрируйтесь на платформе</p>
              <div class="text-xs text-success font-medium">Получено: 01.04.2025</div>
            </div>
          </div>
        </div>

        <div class="card p-6 hover-lift">
          <div class="flex items-start">
            <div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-xl mr-4 flex-shrink-0">
              🎯
            </div>
            <div>
              <h3 class="font-bold mb-1">Первый шаг</h3>
              <p class="text-text-medium text-sm mb-2">Посетите первое мероприятие</p>
              <div class="text-xs text-success font-medium">Получено: 05.04.2025</div>
            </div>
          </div>
        </div>

        <div class="card p-6 hover-lift">
          <div class="flex items-start">
            <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 text-xl mr-4 flex-shrink-0">
              🔥
            </div>
            <div>
              <h3 class="font-bold mb-1 text-gray-400">Активный участник</h3>
              <p class="text-text-medium text-sm mb-2">Посетите 5 мероприятий</p>
              <div class="text-xs text-text-medium font-medium">Прогресс: 2/5</div>
            </div>
          </div>
        </div>

        <div class="card p-6 hover-lift">
          <div class="flex items-start">
            <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 text-xl mr-4 flex-shrink-0">
              🏆
            </div>
            <div>
              <h3 class="font-bold mb-1 text-gray-400">Победитель</h3>
              <p class="text-text-medium text-sm mb-2">Займите призовое место на хакатоне</p>
              <div class="text-xs text-text-medium font-medium">Не получено</div>
            </div>
          </div>
        </div>

        <div class="card p-6 hover-lift">
          <div class="flex items-start">
            <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 text-xl mr-4 flex-shrink-0">
              🎤
            </div>
            <div>
              <h3 class="font-bold mb-1 text-gray-400">Спикер</h3>
              <p class="text-text-medium text-sm mb-2">Выступите на мероприятии с докладом</p>
              <div class="text-xs text-text-medium font-medium">Не получено</div>
            </div>
          </div>
        </div>

        <div class="card p-6 hover-lift">
          <div class="flex items-start">
            <div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-xl mr-4 flex-shrink-0">
              📝
            </div>
            <div>
              <h3 class="font-bold mb-1">Заполните профиль</h3>
              <p class="text-text-medium text-sm mb-2">Добавьте информацию о себе в профиль</p>
              <div class="text-xs text-success font-medium">Получено: 01.04.2025</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Рейтинг участников -->
    <div class="card p-6 fade-in-up delay-300">
      <h2 class="text-xl font-bold mb-4">Рейтинг участников</h2>
      
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-3 text-sm font-medium text-text-medium">#</th>
              <th class="px-4 py-3 text-sm font-medium text-text-medium">Участник</th>
              <th class="px-4 py-3 text-sm font-medium text-text-medium">Уровень</th>
              <th class="px-4 py-3 text-sm font-medium text-text-medium">Достижения</th>
              <th class="px-4 py-3 text-sm font-medium text-text-medium">XP</th>
            </tr>
          </thead>
          <tbody class="animate-list">
            <tr class="border-b hover:bg-gray-50 transition">
              <td class="px-4 py-3 text-sm">1</td>
              <td class="px-4 py-3">
                <div class="flex items-center">
                  <div class="w-8 h-8 rounded-full bg-primary-100 mr-3"></div>
                  <div>
                    <div class="font-medium">Иванов Иван</div>
                    <div class="text-xs text-text-medium">Разработчик</div>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3 text-sm">Эксперт</td>
              <td class="px-4 py-3 text-sm">15</td>
              <td class="px-4 py-3 font-medium text-primary-600">1250</td>
            </tr>
            <tr class="border-b hover:bg-gray-50 transition">
              <td class="px-4 py-3 text-sm">2</td>
              <td class="px-4 py-3">
                <div class="flex items-center">
                  <div class="w-8 h-8 rounded-full bg-secondary-100 mr-3"></div>
                  <div>
                    <div class="font-medium">Петрова Елена</div>
                    <div class="text-xs text-text-medium">Дизайнер</div>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3 text-sm">Продвинутый</td>
              <td class="px-4 py-3 text-sm">12</td>
              <td class="px-4 py-3 font-medium text-primary-600">950</td>
            </tr>
            <tr class="border-b hover:bg-gray-50 transition bg-primary-50">
              <td class="px-4 py-3 text-sm font-medium">3</td>
              <td class="px-4 py-3">
                <div class="flex items-center">
                  <div class="w-8 h-8 rounded-full bg-blue-100 mr-3"></div>
                  <div>
                    <div class="font-medium">Вы</div>
                    <div class="text-xs text-text-medium">Разработчик</div>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3 text-sm">Начинающий</td>
              <td class="px-4 py-3 text-sm">5</td>
              <td class="px-4 py-3 font-medium text-primary-600">450</td>
            </tr>
            <tr class="border-b hover:bg-gray-50 transition">
              <td class="px-4 py-3 text-sm">4</td>
              <td class="px-4 py-3">
                <div class="flex items-center">
                  <div class="w-8 h-8 rounded-full bg-green-100 mr-3"></div>
                  <div>
                    <div class="font-medium">Сидоров Алексей</div>
                    <div class="text-xs text-text-medium">Аналитик</div>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3 text-sm">Начинающий</td>
              <td class="px-4 py-3 text-sm">3</td>
              <td class="px-4 py-3 font-medium text-primary-600">320</td>
            </tr>
            <tr class="hover:bg-gray-50 transition">
              <td class="px-4 py-3 text-sm">5</td>
              <td class="px-4 py-3">
                <div class="flex items-center">
                  <div class="w-8 h-8 rounded-full bg-purple-100 mr-3"></div>
                  <div>
                    <div class="font-medium">Козлова Мария</div>
                    <div class="text-xs text-text-medium">Менеджер</div>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3 text-sm">Начинающий</td>
              <td class="px-4 py-3 text-sm">2</td>
              <td class="px-4 py-3 font-medium text-primary-600">220</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AchievementsPage'
}
</script>

<style scoped>
.progress-animation {
  animation: progressGrow 2s ease-out forwards;
}

@keyframes progressGrow {
  from {
    width: 0;
  }
  to {
    width: 30%;
  }
}
</style> 