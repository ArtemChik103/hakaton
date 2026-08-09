<template>
  <div class="space-y-20 pb-20">
    <!-- Hero Section -->
    <section class="relative overflow-hidden pt-10 md:pt-16 pb-12">
      <!-- Ambient Lighting Blobs -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-indigo-500/20 via-cyan-500/10 to-transparent blur-3xl pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <!-- Left Col: Copy & Actions (col-span-7) -->
          <div class="lg:col-span-7 space-y-6 text-left">

            <!-- Main Headline -->
            <h1 class="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-100 leading-[1.05]">
              Единая платформа <br/>
              <span class="bg-gradient-to-r from-cyan-400 via-indigo-300 to-indigo-500 bg-clip-text text-transparent">
                IT-сообществ и хакатонов
              </span>
            </h1>

            <!-- Subtext -->
            <p class="text-slate-300 text-lg max-w-xl leading-relaxed">
              Отслеживайте IT-события Амурской области и РФ. Регистрируйтесь в 1 клик, объединяйтесь в команды и получайте ачивки.
            </p>

            <!-- Action CTAs -->
            <div class="flex flex-wrap items-center gap-4 pt-2">
              <router-link to="/events" class="btn btn-primary text-base px-7 py-3.5">
                Календарь событий →
              </router-link>
              <router-link to="/achievements" class="btn btn-secondary text-base px-7 py-3.5">
                Рейтинг & XP
              </router-link>
            </div>

            <!-- Stats Strip -->
            <div class="grid grid-cols-3 gap-6 pt-8 border-t border-white/10 max-w-lg">
              <div>
                <div class="text-3xl font-extrabold text-cyan-400 font-mono">12+</div>
                <div class="text-xs text-slate-400 font-mono mt-1">Событий / месяц</div>
              </div>
              <div>
                <div class="text-3xl font-extrabold text-indigo-400 font-mono">1,800+</div>
                <div class="text-xs text-slate-400 font-mono mt-1">Разработчиков</div>
              </div>
              <div>
                <div class="text-3xl font-extrabold text-emerald-400 font-mono">6.1M ₽</div>
                <div class="text-xs text-slate-400 font-mono mt-1">Призовые фонды</div>
              </div>
            </div>

          </div>

          <!-- Right Col: Interactive Live Terminal Widget (col-span-5) -->
          <div class="lg:col-span-5">
            <div class="card-glass border-cyan-500/40 p-6 space-y-6 relative group">
              
              <!-- Header Bar of Widget -->
              <div class="flex items-center justify-between border-b border-white/10 pb-4">
                <div class="flex items-center space-x-2">
                  <span class="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                  <span class="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                  <span class="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                  <span class="text-xs font-mono text-slate-400 ml-2">amursu.ru • leader-id.ru</span>
                </div>
              </div>

              <!-- Main Event Card Preview -->
              <div class="space-y-3 text-left">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-mono text-emerald-400 font-bold">📍 БЛАГОВЕЩЕНСК</span>
                  <span class="text-xs font-mono text-cyan-400">АмГУ & Точка Кипения</span>
                </div>
                <h3 class="text-2xl font-bold text-slate-100">
                  AmurTech Hack 2026
                </h3>
                <p class="text-xs text-slate-400 leading-relaxed">
                  Окружной хакатон Амурской области по приграничной логистике, ИИ и умным веб-сервисам.
                </p>
              </div>

              <!-- Metrics Grid inside widget -->
              <div class="bg-slate-950/80 p-4 rounded-xl border border-white/10 space-y-2 text-xs font-mono">
                <div class="flex justify-between">
                  <span class="text-slate-400">Статус приема заявок:</span>
                  <span class="text-emerald-400 font-bold">ОТКРЫТ (28–30 Августа)</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-400">Призовой фонд:</span>
                  <span class="text-cyan-400 font-bold">600 000 ₽</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-400">Площадка:</span>
                  <span class="text-slate-200">Игнатьевское ш., 21</span>
                </div>
              </div>

              <a 
                href="https://amursu.ru/" 
                target="_blank" 
                rel="noopener noreferrer"
                class="w-full btn btn-primary py-3 text-sm flex items-center justify-center space-x-2"
              >
                <span>Перейти на сайт регистрации ↗</span>
              </a>

            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Bento Grid Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div class="text-left space-y-1">
        <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-100">
          Интерактивные сервисы
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        
        <!-- Bento 1: Calendar (Large 2-col) -->
        <div class="md:col-span-2 card-glass card-interactive flex flex-col justify-between border-cyan-500/30">
          <div class="space-y-4">
            <div class="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-2xl">
              📅
            </div>
            <h3 class="text-2xl font-bold text-slate-100">Живой Календарь IT-Мероприятий</h3>
            <p class="text-sm text-slate-400 leading-relaxed max-w-xl">
              Парсинг в реальном времени из Leader-ID, АмГУ, Минцифры Амурской области, GitHub и Tproger. Фильтрация по городам, форматам и технологическим тегам.
            </p>
          </div>
          <div class="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
            <span class="text-xs font-mono text-cyan-400">Прямые ссылки на регистрацию</span>
            <router-link to="/events" class="text-xs font-semibold text-slate-200 hover:text-cyan-400 transition">
              Открыть календарь →
            </router-link>
          </div>
        </div>

        <!-- Bento 2: Achievements -->
        <div class="card-glass card-interactive flex flex-col justify-between border-indigo-500/30">
          <div class="space-y-4">
            <div class="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 text-2xl">
              🏆
            </div>
            <h3 class="text-2xl font-bold text-slate-100">Геймификация & XP</h3>
            <p class="text-sm text-slate-400 leading-relaxed">
              Зарабатывайте баллы опыта за победы на хакатонах, участие в митапах Точки Кипения и открытые коммиты.
            </p>
          </div>
          <div class="mt-8 pt-4 border-t border-white/10">
            <router-link to="/achievements" class="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition">
              Табло ачивок →
            </router-link>
          </div>
        </div>

        <!-- Bento 3: News -->
        <div class="card-glass card-interactive flex flex-col justify-between border-emerald-500/30">
          <div class="space-y-4">
            <div class="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-2xl">
              📰
            </div>
            <h3 class="text-2xl font-bold text-slate-100">IT-Дайджест ДФО</h3>
            <p class="text-sm text-slate-400 leading-relaxed">
              Главные анонсы технологий, гранты для разработчиков Амурской области (до 3 млн ₽) и релизы.
            </p>
          </div>
          <div class="mt-8 pt-4 border-t border-white/10">
            <router-link to="/news" class="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition">
              Читать новости →
            </router-link>
          </div>
        </div>

        <!-- Bento 4: Profile & QR (Wide 2-col) -->
        <div class="md:col-span-2 card-glass card-interactive flex flex-col justify-between border-cyan-500/30">
          <div class="space-y-4">
            <div class="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-2xl">
              📱
            </div>
            <h3 class="text-2xl font-bold text-slate-100">Профиль & Цифровой QR-Пропуск</h3>
            <p class="text-sm text-slate-400 leading-relaxed">
              Интерактивная карточка специалиста, стек технологий и генерация цифрового QR-пропуска для быстрого входа на очные мероприятия в Благовещенске.
            </p>
          </div>
          <div class="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
            <span class="text-xs font-mono text-slate-400">Быстрый чекин на очных митапах</span>
            <router-link to="/profile" class="text-xs font-semibold text-slate-200 hover:text-cyan-400 transition">
              Мой профиль →
            </router-link>
          </div>
        </div>

      </div>
    </section>

    <!-- Hot Events Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div class="flex flex-col md:flex-row items-start md:items-end justify-between border-b border-white/10 pb-6 text-left">
        <div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-100">
            Ближайшие события Амурской области и РФ
          </h2>
        </div>
        <router-link to="/events" class="text-sm font-semibold text-cyan-400 hover:text-cyan-300 mt-2 md:mt-0 transition">
          Смотреть весь календарь →
        </router-link>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
        <div 
          v-for="event in events.slice(0, 3)" 
          :key="event.id" 
          class="card-glass card-interactive flex flex-col justify-between"
        >
          <div class="space-y-3">
            <div class="flex items-center justify-between text-xs font-mono text-cyan-400">
              <span>{{ getEventTypeName(event.type) }}</span>
              <span class="text-slate-400">🔗 {{ event.sourceSite || 'Источник' }}</span>
            </div>

            <h3 class="text-xl font-bold text-slate-100 hover:text-cyan-400 transition cursor-pointer" @click="$router.push('/events')">
              {{ event.title }}
            </h3>

            <p class="text-xs text-slate-400 line-clamp-3 leading-relaxed">
              {{ event.description }}
            </p>
          </div>

          <div class="pt-4 mt-4 border-t border-white/10 space-y-3">
            <div class="flex items-center justify-between text-xs font-mono">
              <span class="text-slate-300">📅 {{ formatDate(event.startDate) }}</span>
              <span v-if="event.prizePool" class="text-cyan-400 font-bold">
                🏆 {{ event.prizePool }}
              </span>
            </div>

            <a 
              :href="event.registrationLink" 
              target="_blank" 
              rel="noopener noreferrer"
              class="w-full btn btn-primary py-2.5 text-xs flex items-center justify-center space-x-1"
            >
              <span>Регистрация на {{ event.sourceSite || 'источнике' }} ↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import api from '@/services/api';

export default {
  name: 'HomePage',
  data() {
    return {
      events: []
    }
  },
  async created() {
    this.events = await api.getEvents();
  },
  methods: {
    formatDate(dateObj) {
      if (!dateObj) return '';
      const date = new Date(dateObj);
      return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
    },
    getEventTypeName(type) {
      const names = { hackathon: 'Хакатон', meetup: 'Митап', conference: 'Конференция' };
      return names[type] || 'Событие';
    },
    getTypeBadgeClass(type) {
      const classes = { hackathon: 'badge-cyan', meetup: 'badge-indigo', conference: 'badge-emerald' };
      return classes[type] || 'badge-cyan';
    }
  }
}
</script>