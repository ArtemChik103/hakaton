<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-16 pt-4 text-left">
    
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
      <div>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-100">
          IT-Дайджест & Новости
        </h1>
        <p class="text-slate-400 text-xs mt-1">
          Новости IT-сферы Амурской области, грантовые программы Минцифры АО, анонсы АмГУ и всероссийские IT-события.
        </p>
      </div>

      <!-- Scope Filter -->
      <div class="flex items-center space-x-2 bg-slate-900/90 border border-slate-800 p-1.5 rounded-xl">
        <button 
          @click="scopeFilter = 'all'"
          class="px-4 py-1.5 rounded-lg text-xs font-mono transition-all"
          :class="scopeFilter === 'all' ? 'bg-cyan-500 text-white font-bold' : 'text-slate-400 hover:text-slate-200'"
        >
          🌐 Все новости
        </button>
        <button 
          @click="scopeFilter = 'amur'"
          class="px-4 py-1.5 rounded-lg text-xs font-mono transition-all"
          :class="scopeFilter === 'amur' ? 'bg-cyan-500 text-white font-bold' : 'text-slate-400 hover:text-slate-200'"
        >
          📍 Амурская область & ДФО
        </button>
      </div>
    </div>

    <!-- News Grid -->
    <div v-if="filteredNews.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="item in filteredNews" 
        :key="item.id"
        class="card-glass card-interactive flex flex-col justify-between"
      >
        <div class="space-y-3">
          <!-- Category & Source -->
          <div class="flex items-center justify-between text-xs font-mono">
            <span class="text-cyan-400 font-semibold">{{ item.category }}</span>
            <span class="text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
              {{ item.source }}
            </span>
          </div>

          <!-- Title -->
          <h3 @click="openNewsModal(item)" class="text-xl font-bold text-slate-100 hover:text-cyan-400 transition cursor-pointer leading-snug">
            {{ item.title }}
          </h3>

          <!-- Summary -->
          <p class="text-xs text-slate-400 line-clamp-3 leading-relaxed">
            {{ item.summary }}
          </p>
        </div>

        <!-- Footer -->
        <div class="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
          <span class="text-slate-400">⏱ {{ item.readTime }}</span>
          <a 
            :href="item.sourceUrl" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="text-cyan-400 hover:underline font-semibold"
          >
            Источник {{ item.source }} ↗
          </a>
        </div>
      </div>
    </div>

    <!-- Modal for Reading Full News -->
    <div v-if="selectedArticle" class="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div class="card-glass max-w-2xl w-full border-slate-700 space-y-6 relative animate-fadeIn">
        <button @click="selectedArticle = null" class="absolute top-4 right-4 text-slate-400 hover:text-slate-100 text-xl">
          ✕
        </button>

        <div class="space-y-2">
          <div class="flex items-center space-x-2 text-xs font-mono text-cyan-400">
            <span>{{ selectedArticle.category }}</span>
            <span>•</span>
            <span>{{ selectedArticle.source }}</span>
          </div>
          <h2 class="text-2xl font-extrabold text-slate-100">
            {{ selectedArticle.title }}
          </h2>
        </div>

        <div class="text-sm text-slate-300 leading-relaxed border-t border-b border-slate-800 py-4 space-y-3 whitespace-pre-line">
          <p>{{ selectedArticle.content }}</p>
        </div>

        <div class="flex items-center justify-between">
          <a :href="selectedArticle.sourceUrl" target="_blank" rel="noopener noreferrer" class="btn btn-primary px-6 py-2 text-xs">
            Читать полностью на {{ selectedArticle.source }} ↗
          </a>
          <button @click="selectedArticle = null" class="btn btn-secondary text-xs px-4 py-2">
            Закрыть
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { fetchLiveParsedNews } from '@/services/newsScraper';

export default {
  name: 'NewsPage',
  data() {
    return {
      news: [],
      scopeFilter: 'all',
      selectedArticle: null
    }
  },
  computed: {
    filteredNews() {
      if (this.scopeFilter === 'amur') {
        return this.news.filter(n => n.isAmurRegion);
      }
      return this.news;
    }
  },
  async created() {
    this.news = await fetchLiveParsedNews();
  },
  methods: {
    openNewsModal(article) {
      this.selectedArticle = article;
    }
  }
}
</script>