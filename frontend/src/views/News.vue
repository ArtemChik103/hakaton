<template>
  <div class="news-page">
    <div class="mb-8 fade-in-down">
      <h1 class="text-3xl font-bold mb-2">Новости IT</h1>
      <p class="text-text-medium">Последние новости из мира технологий и региональных IT-сообществ</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2">
        <div class="space-y-8 animate-list">
          <!-- Главная новость -->
          <div class="card hover-lift">
            <div class="h-64 bg-primary-100 flex items-center justify-center">
              <span class="text-6xl">📰</span>
            </div>
            <div class="p-5">
              <div class="news-date mb-2">3 апреля 2025</div>
              <h2 class="text-2xl font-bold mb-3">Новый IT-кластер открывается в регионе</h2>
              <p class="text-text-medium mb-4">
                Открытие нового IT-кластера создаст более 500 рабочих мест для специалистов в сфере информационных технологий.
                Проект реализуется при поддержке местных властей и крупных технологических компаний...
              </p>
              <a href="#" class="btn btn-primary inline-block px-4 py-2 text-white rounded">Читать полностью →</a>
            </div>
          </div>

          <!-- Остальные новости -->
          <div 
            v-for="i in 3" 
            :key="i"
            class="card hover-lift"
          >
            <div class="md:flex">
              <div class="md:w-1/3 bg-secondary-100 flex items-center justify-center h-48">
                <span class="text-4xl">📋</span>
              </div>
              <div class="p-5 md:w-2/3">
                <div class="news-date mb-2">{{ new Date(2025, 3, i).toLocaleDateString('ru-RU') }}</div>
                <h2 class="text-xl font-bold mb-3">Заголовок новости {{ i }}</h2>
                <p class="text-text-medium mb-4">
                  Краткое описание новости, которое даёт представление о её содержании.
                  Обычно это первый абзац статьи или специально подготовленное описание...
                </p>
                <a href="#" class="text-primary-600 hover:text-primary-800 font-medium hover:underline glow-text-on-hover">Читать полностью →</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="lg:col-span-1">
        <div class="sticky top-4 space-y-6 fade-in-right">
          <div class="card p-5 mb-6">
            <h3 class="text-lg font-bold mb-4">Категории</h3>
            <ul class="space-y-2">
              <li><a href="#" class="text-text-medium hover:text-primary-600 transition">Все новости</a></li>
              <li><a href="#" class="text-text-medium hover:text-primary-600 transition">IT-образование</a></li>
              <li><a href="#" class="text-text-medium hover:text-primary-600 transition">Мероприятия</a></li>
              <li><a href="#" class="text-text-medium hover:text-primary-600 transition">Технологии</a></li>
              <li><a href="#" class="text-text-medium hover:text-primary-600 transition">Вакансии</a></li>
            </ul>
          </div>

          <div class="card p-5">
            <h3 class="text-lg font-bold mb-4">Популярные теги</h3>
            <div class="flex flex-wrap gap-2">
              <a href="#" class="px-3 py-1 bg-gray-100 hover:bg-primary-100 text-text-medium hover:text-primary-700 rounded-full text-sm transition">#IT</a>
              <a href="#" class="px-3 py-1 bg-gray-100 hover:bg-primary-100 text-text-medium hover:text-primary-700 rounded-full text-sm transition">#Программирование</a>
              <a href="#" class="px-3 py-1 bg-gray-100 hover:bg-primary-100 text-text-medium hover:text-primary-700 rounded-full text-sm transition">#Хакатон</a>
              <a href="#" class="px-3 py-1 bg-gray-100 hover:bg-primary-100 text-text-medium hover:text-primary-700 rounded-full text-sm transition">#Обучение</a>
              <a href="#" class="px-3 py-1 bg-gray-100 hover:bg-primary-100 text-text-medium hover:text-primary-700 rounded-full text-sm transition">#Стартап</a>
              <a href="#" class="px-3 py-1 bg-gray-100 hover:bg-primary-100 text-text-medium hover:text-primary-700 rounded-full text-sm transition">#AI</a>
              <a href="#" class="px-3 py-1 bg-gray-100 hover:bg-primary-100 text-text-medium hover:text-primary-700 rounded-full text-sm transition">#WebDev</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewsPage'
}
</script>

<style scoped>
/* Дополнительные стили при необходимости */
</style> 