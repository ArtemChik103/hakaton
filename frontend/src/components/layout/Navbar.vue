<template>
  <div>
    <nav class="app-navbar text-white p-4">
      <div class="container mx-auto flex justify-between items-center">
        <div class="flex items-center">
          <router-link to="/" class="text-2xl font-bold">IT-Платформа</router-link>
        </div>
        <div class="hidden md:flex space-x-6">
          <router-link to="/events" class="nav-link hover:text-blue-200 transition">События</router-link>
          <router-link to="/news" class="nav-link hover:text-blue-200 transition">Новости</router-link>
        </div>
        
        <!-- Кнопки входа и регистрации (если пользователь не авторизован) -->
        <div v-if="!isAuthenticated" class="hidden md:flex items-center space-x-4">
          <router-link to="/login" class="nav-link hover:text-blue-200 transition">
            Вход
          </router-link>
          <router-link to="/register" class="btn btn-secondary text-white px-4 py-2 rounded-md transition">
            Регистрация
          </router-link>
        </div>
        
        <!-- Информация о пользователе и выход (если пользователь авторизован) -->
        <div v-else class="hidden md:flex items-center space-x-4">
          <router-link to="/profile" class="text-blue-300 hover:text-white transition flex items-center">
            <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            <span>{{ userName }}</span>
          </router-link>
          <router-link v-if="isOrganizer && !isAdmin" to="/organizer" class="text-blue-300 hover:text-white transition flex items-center">
            <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
            </svg>
            <span>Панель организатора</span>
          </router-link>
          <router-link v-if="isAdmin" to="/admin" class="text-blue-300 hover:text-white transition flex items-center">
            <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span>Администрирование</span>
          </router-link>
          <button @click="logout" class="btn btn-secondary text-white px-4 py-2 rounded-md transition">
            Выйти
          </button>
        </div>
        
        <div class="md:hidden">
          <button @click="toggleMobileMenu" class="focus:outline-none">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Мобильное меню -->
      <div v-if="mobileMenuOpen" class="md:hidden bg-blue-700 mt-2 p-4 rounded">
        <div class="flex flex-col space-y-3">
          <router-link to="/events" class="hover:text-blue-300 transition">События</router-link>
          <router-link to="/news" class="hover:text-blue-300 transition">Новости</router-link>
          <div class="pt-2 border-t border-blue-600">
            <template v-if="!isAuthenticated">
              <router-link to="/login" class="block hover:text-blue-300 transition mb-2 text-left w-full">
                Вход
              </router-link>
              <router-link to="/register" class="block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition text-center w-full">
                Регистрация
              </router-link>
            </template>
            <template v-else>
              <router-link to="/profile" class="block text-blue-300 hover:text-white transition mb-2 flex items-center">
                <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                <span>{{ userName }}</span>
              </router-link>
              <router-link v-if="isOrganizer && !isAdmin" to="/organizer" class="block text-blue-300 hover:text-white transition mb-2 flex items-center">
                <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
                <span>Панель организатора</span>
              </router-link>
              <router-link v-if="isAdmin" to="/admin" class="block text-blue-300 hover:text-white transition mb-2 flex items-center">
                <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span>Администрирование</span>
              </router-link>
              <button @click="logout(); mobileMenuOpen = false" class="block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition text-center w-full">
                Выйти
              </button>
            </template>
          </div>
        </div>
      </div>
    </nav>

    <!-- Модальное окно входа -->
    <div v-if="showLoginModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div 
        class="bg-white rounded-lg shadow-xl max-w-md w-full mx-auto relative" 
        @click.stop
        ref="loginModal"
      >
        <div class="flex justify-between items-center p-4 border-b">
          <h2 class="text-xl font-bold">Вход в аккаунт</h2>
          <button @click="closeLoginModal" class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div class="p-4">
          <simple-login-form @close="closeLoginModal" />
        </div>
      </div>
    </div>

    <!-- Модальное окно регистрации -->
    <div v-if="showRegisterModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div 
        class="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-auto relative" 
        @click.stop
        ref="registerModal"
      >
        <div class="flex justify-between items-center p-4 border-b">
          <h2 class="text-xl font-bold">Регистрация</h2>
          <button @click="closeRegisterModal" class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div class="p-4">
          <simple-register-form @close="closeRegisterModal" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SimpleLoginForm from '@/components/auth/SimpleLoginForm.vue';
import SimpleRegisterForm from '@/components/auth/SimpleRegisterForm.vue';
import { userApi } from '@/utils/api.js';

export default {
  name: 'SiteNavbar',
  components: {
    SimpleLoginForm,
    SimpleRegisterForm
  },
  data() {
    return {
      mobileMenuOpen: false,
      showLoginModal: false,
      showRegisterModal: false,
      user: null,
      authCheckInterval: null
    }
  },
  computed: {
    isAuthenticated() {
      return !!this.user;
    },
    userName() {
      if (!this.user) return '';
      return this.user.email || 'Пользователь';
    },
    isOrganizer() {
      return this.user && (this.user.is_organizer || this.user.is_admin || this.user.is_superuser);
    },
    isAdmin() {
      return this.user && this.user.is_superuser;
    }
  },
  created() {
    // Проверяем, есть ли данные пользователя в localStorage
    this.updateUserFromStorage();
    
    // Добавляем слушатель событий для закрытия модальных окон по Escape
    window.addEventListener('keydown', this.handleKeyDown);
    
    // Слушаем событие storage для обработки изменений в других вкладках
    window.addEventListener('storage', this.handleStorageChange);
    
    // Добавляем проверку каждую секунду
    this.authCheckInterval = setInterval(this.updateUserFromStorage, 2000);
  },
  beforeUnmount() {
    // Удаляем слушатели событий при уничтожении компонента
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('storage', this.handleStorageChange);
    
    // Очищаем интервал
    if (this.authCheckInterval) {
      clearInterval(this.authCheckInterval);
    }
  },
  methods: {
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    },
    openLoginModal() {
      this.showLoginModal = true;
      document.body.classList.add('modal-open');
    },
    closeLoginModal() {
      this.showLoginModal = false;
      document.body.classList.remove('modal-open');
    },
    openRegisterModal() {
      this.showRegisterModal = true;
      document.body.classList.add('modal-open');
    },
    closeRegisterModal() {
      this.showRegisterModal = false;
      document.body.classList.remove('modal-open');
    },
    handleKeyDown(e) {
      // Закрываем модальные окна по клавише Escape
      if (e.key === 'Escape') {
        if (this.showLoginModal) this.closeLoginModal();
        if (this.showRegisterModal) this.closeRegisterModal();
      }
    },
    handleStorageChange(e) {
      // Если изменяется localStorage в другой вкладке
      if (e.key === 'user') {
        if (e.newValue) {
          try {
            this.user = JSON.parse(e.newValue);
          } catch (error) {
            console.error('Ошибка при разборе данных пользователя', error);
            this.user = null;
          }
        } else {
          this.user = null;
        }
      }
    },
    logout() {
      // Отправляем запрос на выход пользователя через API-утилиту
      userApi.logout()
        .then(() => {
          // Удаляем данные пользователя из localStorage
          localStorage.removeItem('user');
          this.user = null;
          
          // Перезагружаем страницу для сброса состояния приложения
          window.location.reload();
        })
        .catch(error => {
          console.error('Ошибка при выходе', error);
          // Даже в случае ошибки удаляем данные пользователя из localStorage
          localStorage.removeItem('user');
          this.user = null;
        });
    },
    updateUserFromStorage() {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          const parsedUser = JSON.parse(userStr);
          
          // Проверяем, изменились ли данные
          if (!this.user || JSON.stringify(this.user) !== JSON.stringify(parsedUser)) {
            console.log('Обновляем данные пользователя в Navbar');
            this.user = parsedUser;
          }
        } catch (e) {
          console.error('Ошибка при разборе данных пользователя', e);
          localStorage.removeItem('user');
          this.user = null;
        }
      } else if (this.user) {
        // Если в хранилище нет данных, но в компоненте они есть - сбрасываем
        console.log('Сбрасываем данные пользователя в Navbar');
        this.user = null;
      }
    }
  }
}
</script>

<style scoped>
/* Стили для модальных окон */
.modal-open {
  overflow: hidden !important;
}

/* Анимация для модальных окон */
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
}

/* Обеспечиваем максимальное z-index для модальных окон */
.fixed.inset-0 {
  isolation: isolate;
}

/* Ограничиваем размер модальных окон на мобильных устройствах */
@media (max-width: 640px) {
  .max-w-md, .max-w-2xl {
    max-width: 90vw;
  }
  
  .overflow-y-auto {
    max-height: 90vh;
  }
}
</style> 