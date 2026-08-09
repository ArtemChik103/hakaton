<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-16 pt-4">
    
    <!-- Header -->
    <div class="border-b border-slate-800 pb-6 text-left">
      <div class="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-indigo-400 mb-1">
        <span>🏆 Геймификация & XP</span>
        <span>•</span>
        <span>Рейтинг IT-Специалиста</span>
      </div>
      <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-100">
        Система Достижений
      </h1>
      <p class="text-slate-400 text-sm mt-1">Участвуйте в мероприятиях, создавайте проекты и получайте бейджи активности</p>
    </div>

    <!-- User XP Status Bar -->
    <div class="card-glass bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border-indigo-500/30 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
      <div class="flex items-center space-x-4">
        <div class="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-indigo-500/20">
          Lvl 7
        </div>
        <div class="space-y-1 text-left">
          <h3 class="text-lg font-bold text-slate-100">Александр Второв</h3>
          <p class="text-xs font-mono text-cyan-400">Senior Fullstack Engineer • 2850 XP</p>
          <div class="w-48 sm:w-64 bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
            <div class="bg-gradient-to-r from-cyan-500 to-indigo-500 h-full w-[80%] rounded-full"></div>
          </div>
        </div>
      </div>

      <div class="flex items-center space-x-6 text-center">
        <div>
          <div class="text-2xl font-extrabold text-cyan-400 font-mono">4</div>
          <div class="text-xs text-slate-400 font-mono">Разблокировано</div>
        </div>
        <div class="w-px h-8 bg-slate-800"></div>
        <div>
          <div class="text-2xl font-extrabold text-indigo-400 font-mono">2250</div>
          <div class="text-xs text-slate-400 font-mono">Заработано XP</div>
        </div>
      </div>
    </div>

    <!-- Achievements Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="item in achievements" 
        :key="item.id"
        class="card-glass flex flex-col justify-between transition-all"
        :class="item.unlocked ? 'border-cyan-500/30 bg-slate-900/80' : 'opacity-60 border-slate-800/80'"
      >
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" :class="item.unlocked ? 'bg-cyan-500/10 border border-cyan-500/20' : 'bg-slate-950 border border-slate-800'">
              {{ item.icon }}
            </div>
            <span class="badge" :class="item.unlocked ? 'badge-emerald' : 'badge-amber'">
              +{{ item.xp }} XP
            </span>
          </div>

          <div class="space-y-1 text-left">
            <h3 class="text-lg font-bold text-slate-100">
              {{ item.title }}
            </h3>
            <p class="text-xs text-slate-400 leading-relaxed">
              {{ item.description }}
            </p>
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="pt-4 mt-4 border-t border-slate-800 space-y-2">
          <div class="flex justify-between text-xs font-mono">
            <span class="text-slate-400">Прогресс:</span>
            <span :class="item.unlocked ? 'text-emerald-400 font-bold' : 'text-slate-300'">
              {{ item.progress }} / {{ item.maxProgress }}
            </span>
          </div>
          <div class="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
            <div 
              class="h-full rounded-full transition-all duration-500" 
              :class="item.unlocked ? 'bg-emerald-500' : 'bg-amber-500/60'"
              :style="{ width: `${(item.progress / item.maxProgress) * 100}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import api from '@/services/api';

export default {
  name: 'AchievementsPage',
  data() {
    return {
      achievements: []
    }
  },
  async created() {
    this.achievements = await api.getAchievements();
  }
}
</script>