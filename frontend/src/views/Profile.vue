<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-16 pt-4">
    
    <!-- Profile Card Header -->
    <div class="card-glass border-cyan-500/30 p-8 space-y-6 relative overflow-hidden">
      <div class="absolute -top-10 -right-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div class="flex items-center space-x-5">
          <div class="w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-1 shadow-lg shadow-cyan-500/20 shrink-0">
            <img :src="profile.avatar" :alt="profile.fullName" class="w-full h-full object-cover rounded-xl" />
          </div>
          <div class="space-y-1 text-left">
            <div class="flex items-center space-x-3">
              <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-100">
                {{ profile.fullName }}
              </h1>
              <span class="badge badge-cyan">Lvl {{ profile.level }}</span>
            </div>
            <p class="text-sm font-mono text-cyan-400">
              {{ profile.role }}
            </p>
            <p class="text-xs text-slate-400">
              📍 {{ profile.city }} • Telegram: {{ profile.telegram }}
            </p>
          </div>
        </div>

        <div class="flex flex-wrap gap-3">
          <button @click="showQRPass = true" class="btn btn-primary text-xs px-4 py-2.5">
            📱 Мой QR-Пропуск
          </button>
        </div>
      </div>

      <!-- XP Bar -->
      <div class="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
        <div class="flex justify-between text-xs font-mono">
          <span class="text-slate-400">Прогресс уровня {{ profile.level }}</span>
          <span class="text-cyan-400 font-bold">{{ profile.xp }} / {{ profile.nextLevelXp }} XP</span>
        </div>
        <div class="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
          <div class="bg-gradient-to-r from-cyan-500 to-indigo-500 h-full rounded-full" :style="{ width: `${(profile.xp / profile.nextLevelXp) * 100}%` }"></div>
        </div>
      </div>
    </div>

    <!-- Main Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Left 2 Cols: Registered Events & Bio -->
      <div class="lg:col-span-2 space-y-6">
        
        <!-- Bio Card -->
        <div class="card-glass space-y-3 text-left">
          <h3 class="text-lg font-bold text-slate-100 flex items-center gap-2">
            <span>📝</span> О себе
          </h3>
          <p class="text-xs text-slate-300 leading-relaxed">
            {{ profile.bio }}
          </p>
        </div>

        <!-- Skills Card -->
        <div class="card-glass space-y-4 text-left">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-bold text-slate-100 flex items-center gap-2">
              <span>⚡</span> Стек и Технологии
            </h3>
            <span class="text-xs font-mono text-slate-400">{{ profile.skills.length }} навыков</span>
          </div>

          <div class="flex flex-wrap gap-2">
            <span 
              v-for="skill in profile.skills" 
              :key="skill"
              class="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 flex items-center space-x-1.5"
            >
              <span>{{ skill }}</span>
              <button @click="removeSkill(skill)" class="text-slate-500 hover:text-rose-400 text-xs">✕</button>
            </span>
          </div>

          <!-- Add Skill Bar -->
          <div class="flex items-center space-x-2 pt-2 border-t border-slate-800">
            <input 
              v-model="newSkill" 
              @keyup.enter="addSkill"
              type="text" 
              placeholder="Добавить навык (напр. GraphQL, Docker)..." 
              class="form-input text-xs"
            />
            <button @click="addSkill" class="btn btn-secondary text-xs px-4 py-2 shrink-0">
              + Добавить
            </button>
          </div>
        </div>

        <!-- Registered Events -->
        <div class="card-glass space-y-4 text-left">
          <h3 class="text-lg font-bold text-slate-100 flex items-center gap-2">
            <span>📅</span> Зарегистрированные события ({{ registeredEvents.length }})
          </h3>

          <div v-if="registeredEvents.length > 0" class="space-y-3">
            <div 
              v-for="event in registeredEvents" 
              :key="event.id"
              class="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between"
            >
              <div class="space-y-1">
                <span class="badge badge-cyan">{{ event.type.toUpperCase() }}</span>
                <h4 class="text-sm font-bold text-slate-100">{{ event.title }}</h4>
                <p class="text-xs text-slate-400 font-mono">📍 {{ event.city || 'Онлайн' }} • {{ formatDate(event.startDate) }}</p>
              </div>

              <button @click="showQRPass = true" class="btn btn-outline text-xs px-3 py-1.5 shrink-0">
                Показать QR
              </button>
            </div>
          </div>
        </div>

      </div>

      <!-- Right Col: Stats & Quick Links -->
      <div class="space-y-6">
        <div class="card-glass space-y-4 text-left">
          <h3 class="text-lg font-bold text-slate-100">Статистика активности</h3>
          <div class="space-y-3 text-xs font-mono">
            <div class="flex justify-between p-2.5 bg-slate-950 rounded-lg border border-slate-800">
              <span class="text-slate-400">Хакатов сыграно:</span>
              <span class="text-cyan-400 font-bold">3</span>
            </div>
            <div class="flex justify-between p-2.5 bg-slate-950 rounded-lg border border-slate-800">
              <span class="text-slate-400">Призовых мест:</span>
              <span class="text-emerald-400 font-bold">1 место</span>
            </div>
            <div class="flex justify-between p-2.5 bg-slate-950 rounded-lg border border-slate-800">
              <span class="text-slate-400">Рейтинг в ДФО:</span>
              <span class="text-indigo-400 font-bold">#14</span>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Digital QR Pass Modal -->
    <div v-if="showQRPass" class="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div class="card-glass max-w-sm w-full border-slate-700 space-y-6 text-center relative animate-fadeIn">
        <button @click="showQRPass = false" class="absolute top-4 right-4 text-slate-400 hover:text-slate-100 text-xl">
          ✕
        </button>

        <div class="space-y-1">
          <span class="badge badge-cyan">ОФИЦИАЛЬНЫЙ ПРОПУСК</span>
          <h3 class="text-xl font-bold text-slate-100">{{ profile.fullName }}</h3>
          <p class="text-xs font-mono text-cyan-400">IT-Платформа ID: #84920</p>
        </div>

        <div class="bg-white p-4 rounded-2xl inline-block mx-auto shadow-2xl">
          <qrcode-vue :value="`IT-PLATFORM-PASS:${profile.id}:${profile.fullName}`" :size="180" />
        </div>

        <p class="text-xs text-slate-400">
          Предъявите этот QR-код на входе для быстрой регистрации на офлайн-мероприятия в Благовещенске.
        </p>

        <button @click="showQRPass = false" class="w-full btn btn-secondary text-xs py-2.5">
          Закрыть
        </button>
      </div>
    </div>

  </div>
</template>

<script>
import api from '@/services/api';
import QrcodeVue from 'qrcode.vue';

export default {
  name: 'ProfilePage',
  components: {
    QrcodeVue
  },
  data() {
    return {
      profile: api.getUserProfile(),
      registeredEvents: [],
      newSkill: '',
      showQRPass: false
    }
  },
  async created() {
    const events = await api.getEvents();
    this.registeredEvents = events.filter(e => this.profile.registeredEvents.includes(e.id));
  },
  methods: {
    addSkill() {
      if (this.newSkill.trim() && !this.profile.skills.includes(this.newSkill.trim())) {
        this.profile.skills.push(this.newSkill.trim());
        this.newSkill = '';
      }
    },
    removeSkill(skill) {
      this.profile.skills = this.profile.skills.filter(s => s !== skill);
    },
    formatDate(dateObj) {
      if (!dateObj) return '';
      const date = new Date(dateObj);
      return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
    }
  }
}
</script>