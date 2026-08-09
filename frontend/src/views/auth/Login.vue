<template>
  <div class="min-h-screen flex bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="w-full md:w-4/5 lg:w-3/4 mx-auto flex flex-col md:flex-row overflow-hidden bg-white rounded-lg shadow-xl">
      <!-- Левая часть - описание платформы -->
      <div class="w-full md:w-1/2 bg-gradient-to-r from-blue-600 to-blue-800 p-8 flex flex-col justify-center">
        <h2 class="text-3xl font-bold text-white mb-4">IT-Платформа</h2>
        <p class="text-white text-lg mb-6">
          Платформа, на которой собраны все возможности для молодёжи от IT-сообщества в одном месте.
        </p>
        <div class="flex-grow"></div>
        <div class="flex flex-wrap gap-3 mt-4">
          <span class="inline-block bg-blue-400 bg-opacity-20 text-white px-3 py-1 rounded-full text-sm">
            События
          </span>
          <span class="inline-block bg-blue-400 bg-opacity-20 text-white px-3 py-1 rounded-full text-sm">
            Обмен опытом
          </span>
          <span class="inline-block bg-blue-400 bg-opacity-20 text-white px-3 py-1 rounded-full text-sm">
            Развитие
          </span>
        </div>
      </div>
      
      <!-- Правая часть - форма входа -->
      <div class="w-full md:w-1/2 p-8">
        <div class="max-w-md mx-auto">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">Воспользуйтесь всеми возможностями платформы</h2>
          <p class="text-gray-600 mb-8">Введите данные вашего аккаунта или зарегистрируйтесь</p>
          
          <form @submit.prevent="handleLogin" class="space-y-4">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">E-mail</label>
              <input
                id="email"
                v-model="email"
                type="email"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">Пароль</label>
              <div class="relative">
                <input
                  id="password"
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button 
                  type="button" 
                  @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500 mt-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path v-if="showPassword" stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    <path v-else stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path v-if="!showPassword" stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
              <div class="flex justify-end mt-1">
                <a href="#" class="text-sm text-blue-600 hover:text-blue-800">Восстановить пароль</a>
              </div>
            </div>
            
            <div>
              <button
                type="submit"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                :disabled="loading"
              >
                <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ loading ? 'Вход...' : 'Вход' }}
              </button>
            </div>
            
            <div class="mt-6">
              <button
                type="button"
                @click="$router.push('/register')"
                class="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Регистрация
              </button>
            </div>
          </form>
          
          <div v-if="error" class="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
            {{ error }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      loading: false,
      error: null
    }
  },
  methods: {
    async handleLogin() {
      try {
        this.loading = true;
        this.error = null;
        
        // Запрос к API для входа
        const response = await fetch('/api/users/login/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': this.getCsrfToken()
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password
          }),
          credentials: 'include'
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Ошибка входа');
        }
        
        const data = await response.json();
        
        // Сохраняем данные пользователя в localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Вызываем глобальный метод обновления состояния аутентификации
        if (this.$updateAuthState) {
          this.$updateAuthState();
        }
        
        // Проверяем роль пользователя и перенаправляем
        const user = data.user;
        if (user.is_admin || user.is_superuser) {
          // Если пользователь админ, перенаправляем на админ-панель
          this.$router.push('/admin');
        } else if (user.is_organizer) {
          // Если пользователь организатор, перенаправляем на панель организатора
          this.$router.push('/organizer');
        } else {
          // Обычного пользователя перенаправляем на страницу профиля
          this.$router.push('/profile');
        }
      } catch (err) {
        this.error = err.message || 'Ошибка при входе. Проверьте учетные данные.';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    getCsrfToken() {
      // Получаем CSRF-токен из cookies
      const cookies = document.cookie.split(';');
      for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'csrftoken') {
          return value;
        }
      }
      return '';
    }
  }
}
</script>

<style scoped>
/* Дополнительные стили при необходимости */
</style> 