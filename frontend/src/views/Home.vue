<template>
  <div class="home-page">
    <div class="hero-section relative mb-10">
      <div class="max-w-2xl mx-auto">
        <h1 class="hero-title mb-6">
          IT-Платформа
        </h1>
        <p class="text-xl mb-8">
          Платформа для объединения IT-сообщества региона через удобный календарь событий, новости и систему мотивации.
        </p>
        <div class="flex flex-wrap gap-4">
          <router-link to="/events" class="btn bg-white text-primary-700 hover:bg-gray-100 px-5 py-3 rounded-md font-medium shadow-md transition">
            Календарь мероприятий
          </router-link>
          <router-link to="/news" class="btn btn-secondary px-5 py-3 rounded-md font-medium shadow-md transition">
            Новости
          </router-link>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
      <div class="card p-6">
        <div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mb-4">
          <span class="text-2xl">📅</span>
        </div>
        <h2 class="text-lg font-bold mb-2">Календарь событий</h2>
        <p class="text-text-medium mb-4">
          Удобный календарь IT-мероприятий региона с возможностью фильтрации и регистрации
        </p>
        <router-link to="/events" class="text-primary-600 hover:text-primary-800 font-medium text-sm">
          Перейти к календарю →
        </router-link>
      </div>

      <div class="card p-6">
        <div class="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center text-secondary-600 mb-4">
          <span class="text-2xl">📰</span>
        </div>
        <h2 class="text-lg font-bold mb-2">Новости IT</h2>
        <p class="text-text-medium mb-4">
          Актуальные новости из мира технологий и региональных IT-сообществ
        </p>
        <router-link to="/news" class="text-primary-600 hover:text-primary-800 font-medium text-sm">
          Читать новости →
        </router-link>
      </div>

      <div class="card p-6">
        <div class="w-12 h-12 bg-success bg-opacity-10 rounded-full flex items-center justify-center text-success mb-4">
          <span class="text-2xl">🚀</span>
        </div>
        <h2 class="text-lg font-bold mb-2">О проекте</h2>
        <p class="text-text-medium mb-4">
          Информация о платформе, её возможностях и команде разработчиков
        </p>
        <router-link to="/" class="text-primary-600 hover:text-primary-800 font-medium text-sm">
          Подробнее →
        </router-link>
      </div>
    </div>

    <div class="card p-6 mb-10">
      <h2 class="text-2xl font-bold mb-4">Ближайшие мероприятия</h2>
      <div class="space-y-4">
        <div class="event-item border-b border-gray-100 pb-4">
          <div class="flex">
            <div class="w-16 text-center mr-4">
              <div class="event-date">
                <div class="text-sm">Апр</div>
                <div class="text-xl font-bold">15</div>
              </div>
            </div>
            <div>
              <h3 class="font-bold text-text-dark">Хакатон "Digital Breakthrough"</h3>
              <p class="text-sm text-text-medium mb-1">
                Региональный этап хакатона по разработке цифровых решений
              </p>
              <div class="text-xs text-text-medium">10:00 - 18:00 • Офлайн</div>
            </div>
          </div>
        </div>
        <div class="event-item">
          <div class="flex">
            <div class="w-16 text-center mr-4">
              <div class="event-date">
                <div class="text-sm">Апр</div>
                <div class="text-xl font-bold">20</div>
              </div>
            </div>
            <div>
              <h3 class="font-bold text-text-dark">Встреча сообщества разработчиков</h3>
              <p class="text-sm text-text-medium mb-1">
                Неформальная встреча IT-специалистов региона
              </p>
              <div class="text-xs text-text-medium">18:30 - 21:00 • Офлайн</div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-4">
        <router-link to="/events" class="text-primary-600 hover:text-primary-800 font-medium">
          Все мероприятия →
        </router-link>
      </div>
    </div>

    <div class="card p-6">
      <h2 class="text-2xl font-bold mb-4">Последние новости</h2>
      <div class="space-y-4">
        <div class="news-item border-b border-gray-100 pb-4">
          <h3 class="font-bold text-text-dark mb-1">Новый IT-кластер открывается в регионе</h3>
          <p class="text-sm text-text-medium mb-2">
            Открытие нового IT-кластера создаст более 500 рабочих мест для специалистов в сфере информационных технологий.
          </p>
          <div class="flex justify-between items-center">
            <span class="news-date">3 апреля 2025</span>
            <router-link to="/news" class="text-primary-600 hover:text-primary-800 text-sm font-medium">
              Читать →
            </router-link>
          </div>
        </div>
        <div class="news-item">
          <h3 class="font-bold text-text-dark mb-1">Старт регистрации на хакатон "Digital Breakthrough"</h3>
          <p class="text-sm text-text-medium mb-2">
            Открыта регистрация на региональный этап всероссийского хакатона. Участники смогут получить ценные призы.
          </p>
          <div class="flex justify-between items-center">
            <span class="news-date">1 апреля 2025</span>
            <router-link to="/news" class="text-primary-600 hover:text-primary-800 text-sm font-medium">
              Читать →
            </router-link>
          </div>
        </div>
      </div>
      <div class="mt-4">
        <router-link to="/news" class="text-primary-600 hover:text-primary-800 font-medium">
          Все новости →
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>

<style scoped>
/* Дополнительные стили при необходимости */
</style> 