<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-16 pt-4 text-left">
    
    <!-- Header -->
    <div class="border-b border-slate-800 pb-6">
      <div class="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-cyan-400 mb-1">
        <span>❓ Справка</span>
        <span>•</span>
        <span>Вопросы и ответы</span>
      </div>
      <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-100">
        Часто задаваемые вопросы (FAQ)
      </h1>
      <p class="text-slate-400 text-sm mt-1">Ответы на популярные вопросы о хакатонах, регистрации, ачивках и участии в сообществе</p>
    </div>

    <!-- Accordion Groups -->
    <div class="space-y-6">
      <div v-for="(group, gIdx) in faqGroups" :key="gIdx" class="space-y-3">
        <h2 class="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
          {{ group.title }}
        </h2>

        <div class="space-y-3">
          <div 
            v-for="(item, qIdx) in group.items" 
            :key="qIdx"
            class="card-glass border-slate-800/80 p-0 overflow-hidden"
          >
            <button 
              @click="item.open = !item.open"
              class="w-full p-4 flex items-center justify-between text-left hover:bg-slate-900/40 transition"
            >
              <span class="text-sm font-bold text-slate-200">{{ item.q }}</span>
              <span class="text-slate-400 font-mono text-xs ml-4 shrink-0">{{ item.open ? '▲' : '▼' }}</span>
            </button>

            <div v-if="item.open" class="p-4 border-t border-slate-800 bg-slate-950/60 text-xs text-slate-300 leading-relaxed space-y-2">
              <p>{{ item.a }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Support CTA -->
    <div class="card-glass bg-gradient-to-r from-slate-900 via-cyan-950/30 to-slate-900 border-cyan-500/30 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div>
        <h3 class="text-base font-bold text-slate-100">Остались вопросы?</h3>
        <p class="text-xs text-slate-400">Наша служба поддержки ответит вам в течение 15 минут.</p>
      </div>
      <router-link to="/support" class="btn btn-primary text-xs px-5 py-2.5 shrink-0">
        Связаться с поддержкой
      </router-link>
    </div>

  </div>
</template>

<script>
export default {
  name: 'FAQPage',
  data() {
    return {
      faqGroups: [
        {
          title: 'О Платформе & Хакатонах',
          items: [
            {
              q: 'Что такое IT-Платформа?',
              a: 'IT-Платформа — это единая цифровая среда Амурской области и ДФО, объединяющая разработчиков, дизайнеров, стартаперов и организаторов хакатонов.',
              open: true
            },
            {
              q: 'Как зарегистрироваться на AmurTech Hack 2026 или Цифровой Прорыв?',
              a: 'Перейдите в Календарь событий, выберите интересующий хакатон и нажмите кнопку «Получить QR-билет». Пропуск сохранится в вашем личном профиле.',
              open: false
            }
          ]
        },
        {
          title: 'Рейтинг, XP и Ачивки',
          items: [
            {
              q: 'Как начисляются баллы XP?',
              a: 'Баллы начисляются за участие в хакатонах (+500 XP), победы в кейсах (+1000 XP), посещение очных митапов и открытые пулл-реквизиты.',
              open: false
            }
          ]
        }
      ]
    }
  }
}
</script>