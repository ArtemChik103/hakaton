<template>
  <footer class="bg-slate-950 border-t border-slate-900 relative overflow-hidden text-slate-400">
    <!-- Radial Glow Background -->
    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-t from-cyan-500/10 via-indigo-500/5 to-transparent blur-3xl pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-10">
        
        <!-- Col 1: Brand & Subtitle -->
        <div class="space-y-4 md:col-span-1">
          <div class="flex items-center space-x-3">
            <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <span class="text-lg">⚡</span>
            </div>
            <span class="text-lg font-extrabold tracking-tight text-slate-100">
              IT-ПЛАТФОРМА
            </span>
          </div>
          <p class="text-xs text-slate-400 leading-relaxed">
            Единое цифровое пространство IT-сообществ Дальнего Востока и РФ: хакатоны, митапы, новости технологий и прокачка навыков.
          </p>
          <div class="inline-flex items-center space-x-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-mono text-cyan-400">
            <span>📍 Главный хаб: Благовещенск</span>
          </div>
        </div>

        <!-- Col 2: Navigation -->
        <div>
          <h4 class="text-xs font-mono uppercase tracking-widest text-slate-200 font-semibold mb-4">
            Платформа
          </h4>
          <ul class="space-y-2.5 text-sm">
            <li><router-link to="/" class="hover:text-cyan-400 transition">Главная страница</router-link></li>
            <li><router-link to="/events" class="hover:text-cyan-400 transition">Календарь событий</router-link></li>
            <li><router-link to="/news" class="hover:text-cyan-400 transition">Лента новостей</router-link></li>
            <li><router-link to="/achievements" class="hover:text-cyan-400 transition">Ачивки & Рейтинг</router-link></li>
          </ul>
        </div>

        <!-- Col 3: Resources -->
        <div>
          <h4 class="text-xs font-mono uppercase tracking-widest text-slate-200 font-semibold mb-4">
            Документы & Справка
          </h4>
          <ul class="space-y-2.5 text-sm">
            <li><router-link to="/faq" class="hover:text-cyan-400 transition">Вопросы и ответы (FAQ)</router-link></li>
            <li><router-link to="/support" class="hover:text-cyan-400 transition">Служба поддержки</router-link></li>
            <li><router-link to="/privacy-policy" class="hover:text-cyan-400 transition">Политика конфиденциальности</router-link></li>
            <li><router-link to="/terms-of-use" class="hover:text-cyan-400 transition">Условия использования</router-link></li>
          </ul>
        </div>

        <!-- Col 4: Community Links -->
        <div>
          <h4 class="text-xs font-mono uppercase tracking-widest text-slate-200 font-semibold mb-4">
            Сообщество
          </h4>
          <p class="text-xs text-slate-400 mb-4">
            Присоединяйтесь к дискуссиям и нетворкингу разработчиков в социальных сетях:
          </p>
          <div class="flex flex-wrap gap-2">
            <a href="https://t.me" target="_blank" class="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs font-medium text-cyan-400 hover:border-cyan-500/40 transition">
              Telegram
            </a>
            <a href="https://vk.com" target="_blank" class="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs font-medium text-indigo-400 hover:border-indigo-500/40 transition">
              ВКонтакте
            </a>
            <a href="https://github.com" target="_blank" class="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs font-medium text-emerald-400 hover:border-emerald-500/40 transition">
              GitHub
            </a>
          </div>
        </div>

      </div>

      <div class="border-t border-slate-900 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
        <p>© {{ new Date().getFullYear() }} IT-Платформа (Благовещенск, Амурская область). Все права защищены.</p>
        <p class="font-mono mt-2 md:mt-0 text-slate-400">Собрано на Vue 3 + Vite 6 • Design-Taste-Frontend</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'SiteFooter'
}
</script>