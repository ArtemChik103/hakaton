<template>
  <header class="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-2xl border-b border-white/10 transition-all duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        
        <!-- Logo -->
        <div class="flex items-center space-x-3">
          <router-link to="/" class="group flex items-center space-x-3">
            <div class="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-md shadow-cyan-500/20">
              <span class="text-lg">⚡</span>
            </div>
            <span class="text-xl font-bold tracking-tight text-slate-100">
              IT-Платформа
            </span>
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-1">
          <router-link 
            to="/" 
            class="px-4 py-2 rounded-lg text-sm font-medium transition-all"
            :class="$route.path === '/' ? 'text-cyan-400 font-semibold' : 'text-slate-300 hover:text-slate-100'"
          >
            Главная
          </router-link>
          <router-link 
            to="/events" 
            class="px-4 py-2 rounded-lg text-sm font-medium transition-all"
            :class="$route.path.startsWith('/events') ? 'text-cyan-400 font-semibold' : 'text-slate-300 hover:text-slate-100'"
          >
            Календарь событий
          </router-link>
          <router-link 
            to="/news" 
            class="px-4 py-2 rounded-lg text-sm font-medium transition-all"
            :class="$route.path.startsWith('/news') ? 'text-cyan-400 font-semibold' : 'text-slate-300 hover:text-slate-100'"
          >
            Новости
          </router-link>
          <router-link 
            to="/achievements" 
            class="px-4 py-2 rounded-lg text-sm font-medium transition-all"
            :class="$route.path.startsWith('/achievements') ? 'text-cyan-400 font-semibold' : 'text-slate-300 hover:text-slate-100'"
          >
            Достижения
          </router-link>
          <router-link 
            to="/faq" 
            class="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-slate-100"
          >
            FAQ
          </router-link>
        </nav>

        <!-- User Controls -->
        <div class="hidden md:flex items-center space-x-4">
          <router-link to="/profile" class="flex items-center space-x-2.5 bg-slate-900 hover:bg-slate-800 p-1.5 pr-3 rounded-lg border border-white/10 transition-all">
            <div class="w-8 h-8 rounded-md bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow">
              AV
            </div>
            <div class="flex flex-col text-left">
              <span class="text-xs font-semibold text-slate-200">Александр В.</span>
              <span class="text-[10px] text-cyan-400 font-mono">Lvl 7</span>
            </div>
          </router-link>
        </div>

        <!-- Mobile Hamburger -->
        <div class="flex md:hidden">
          <button 
            @click="mobileMenuOpen = !mobileMenuOpen" 
            class="p-2 rounded-lg text-slate-400 hover:text-slate-100 focus:outline-none"
          >
            <span class="text-2xl">{{ mobileMenuOpen ? '✕' : '☰' }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Drawer -->
    <div v-if="mobileMenuOpen" class="md:hidden bg-slate-950 border-b border-slate-800 px-4 pt-2 pb-6 space-y-2">
      <router-link @click="mobileMenuOpen = false" to="/" class="block px-4 py-2 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-900">
        Главная
      </router-link>
      <router-link @click="mobileMenuOpen = false" to="/events" class="block px-4 py-2 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-900">
        Календарь событий
      </router-link>
      <router-link @click="mobileMenuOpen = false" to="/news" class="block px-4 py-2 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-900">
        Новости
      </router-link>
      <router-link @click="mobileMenuOpen = false" to="/achievements" class="block px-4 py-2 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-900">
        Достижения
      </router-link>
      <router-link @click="mobileMenuOpen = false" to="/profile" class="block px-4 py-2 rounded-lg text-sm font-medium text-cyan-400 bg-cyan-500/10">
        Профиль разработчика
      </router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: 'SiteNavbar',
  data() {
    return {
      mobileMenuOpen: false
    }
  }
}
</script>