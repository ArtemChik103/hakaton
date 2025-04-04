<template>
  <div class="min-h-screen" style="background-color: var(--background-light)">
    <Navbar ref="navbar" class="app-navbar" />
    <main class="container mx-auto py-8 px-4">
      <router-view v-slot="{ Component, route }">
        <transition :name="route.meta.transition || 'page'" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </main>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  },
  mounted() {
    // Проверяем состояние аутентификации при монтировании компонента
    this.checkAuthState();
    
    // Добавляем обработчик события для роутера, чтобы проверять 
    // состояние аутентификации при каждом переходе
    this.$router.beforeEach((to, from, next) => {
      console.log('Переход на новый маршрут:', to.path);
      this.checkAuthState();
      next();
    });
  },
  methods: {
    checkAuthState() {
      console.log('Проверка состояния аутентификации в App.vue');
      const userStr = localStorage.getItem('user');
      if (userStr && this.$refs.navbar) {
        // Обновляем состояние в Navbar
        this.$refs.navbar.updateUserFromStorage();
      }
    }
  }
}
</script>

<style>
/* Переходы страниц */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-enter-from {
  transform: translateX(50px);
  opacity: 0;
}

.slide-leave-to {
  transform: translateX(-50px);
  opacity: 0;
}

/* Стандартный переход страницы */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style> 