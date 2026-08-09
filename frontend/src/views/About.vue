<template>
  <div class="about-page">
    <div class="mb-8 fade-in-down">
      <h1 class="text-3xl font-bold mb-2">О проекте</h1>
      <p class="text-text-medium">Информация о платформе и её возможностях</p>
    </div>

    <div class="card p-6 mb-8 fade-in-up">
      <h2 class="text-xl font-bold mb-4">IT-Платформа</h2>
      <p class="text-text-medium mb-4">
        IT-Платформа - это инновационный проект, созданный для объединения IT-сообщества региона через удобный календарь событий, новости и систему мотивации.
      </p>
      <p class="text-text-medium mb-4">
        Наша миссия - создание единого цифрового пространства для развития профессионального сообщества разработчиков, дизайнеров, 
        аналитиков и всех, кто связан с информационными технологиями в нашем регионе.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 animate-list">
      <div class="card p-6 hover-lift">
        <div class="flex items-center justify-center mb-4">
          <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-2xl">
            📅
          </div>
        </div>
        <h3 class="text-lg font-bold mb-2 text-center">Календарь событий</h3>
        <p class="text-text-medium text-center">
          Удобный и наглядный календарь IT-мероприятий региона с возможностью фильтрации и регистрации.
        </p>
      </div>

      <div class="card p-6 hover-lift">
        <div class="flex items-center justify-center mb-4">
          <div class="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center text-secondary-600 text-2xl">
            📰
          </div>
        </div>
        <h3 class="text-lg font-bold mb-2 text-center">Новости IT</h3>
        <p class="text-text-medium text-center">
          Актуальные новости из мира технологий и региональных IT-сообществ.
        </p>
      </div>

      <div class="card p-6 hover-lift">
        <div class="flex items-center justify-center mb-4">
          <div class="w-16 h-16 bg-success bg-opacity-10 rounded-full flex items-center justify-center text-success text-2xl">
            🏆
          </div>
        </div>
        <h3 class="text-lg font-bold mb-2 text-center">Система мотивации</h3>
        <p class="text-text-medium text-center">
          Геймифицированная система достижений и рейтингов для активных участников сообщества.
        </p>
      </div>
    </div>

    <div class="card p-6 fade-in-up delay-300">
      <h2 class="text-xl font-bold mb-4">Команда проекта</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-list">
        <div v-for="i in 4" :key="i" class="text-center hover-scale">
          <div class="w-24 h-24 bg-primary-100 rounded-full mx-auto mb-3 glow-on-hover"></div>
          <h3 class="font-bold">Участник команды {{ i }}</h3>
          <p class="text-sm text-text-medium">Роль в проекте</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutPage'
}
</script>

<style scoped>
/* Дополнительные стили при необходимости */
</style> 