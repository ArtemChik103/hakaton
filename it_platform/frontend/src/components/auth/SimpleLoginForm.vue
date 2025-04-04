<template>
  <div class="max-w-md mx-auto">
    <div class="text-red-500 mb-4" v-if="error">{{ error }}</div>
    
    <form @submit.prevent="handleLogin" class="space-y-4">
      <div>
        <label for="login-email" class="block text-gray-700 mb-2">Email</label>
        <input 
          type="email" 
          id="login-email" 
          v-model="email" 
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
        >
      </div>
      
      <div>
        <label for="login-password" class="block text-gray-700 mb-2">Пароль</label>
        <input 
          type="password" 
          id="login-password" 
          v-model="password" 
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
        >
      </div>
      
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input 
            type="checkbox" 
            id="remember-me" 
            v-model="rememberMe"
            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          >
          <label for="remember-me" class="ml-2 block text-sm text-gray-900">
            Запомнить меня
          </label>
        </div>
        <a href="#" class="text-sm text-blue-600 hover:underline">Забыли пароль?</a>
      </div>
      
      <div class="flex justify-between">
        <button 
          type="submit" 
          class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition" 
          :disabled="loading"
        >
          <span v-if="loading">Вход...</span>
          <span v-else>Войти</span>
        </button>
        <button 
          type="button" 
          @click="$emit('close')" 
          class="text-gray-600 hover:text-gray-800"
        >
          Отмена
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { userApi } from '@/utils/api.js';

export default {
  name: 'SimpleLoginForm',
  emits: ['close'],
  data() {
    return {
      email: '',
      password: '',
      rememberMe: false,
      error: null,
      loading: false
    }
  },
  methods: {
    async handleLogin() {
      this.error = null;
      
      if (!this.email || !this.password) {
        this.error = 'Пожалуйста, введите email и пароль';
        return;
      }
      
      this.loading = true;
      
      try {
        // Подготовка данных для API
        const loginData = {
          email: this.email,
          password: this.password,
          remember_me: this.rememberMe
        };
        
        console.log('Отправка запроса на вход:', { email: this.email, password: '***' });
        
        // Отправка запроса через API-утилиту
        const result = await userApi.login(loginData);
        
        // Обработка результата
        if (result.success) {
          // Если вход успешен - сохраняем данные пользователя
          localStorage.setItem('user', JSON.stringify(result.data.user));
          
          // Закрываем модальное окно
          this.$emit('close');
          
          // Перезагружаем страницу чтобы обновить интерфейс
          window.location.reload();
        } else {
          // Обрабатываем ошибки API
          const data = result.error;
          if (typeof data === 'object') {
            // Если есть конкретные ошибки в ответе
            if (data.non_field_errors) {
              this.error = data.non_field_errors.join(', ');
            } else if (data.detail) {
              this.error = data.detail;
            } else {
              this.error = 'Неверный email или пароль';
            }
          } else {
            // Если ошибка в виде строки
            this.error = data;
          }
        }
      } catch (error) {
        console.error('Ошибка при входе:', error);
        this.error = 'Произошла ошибка при входе. Пожалуйста, попробуйте позже.';
      } finally {
        this.loading = false;
      }
    }
  }
}
</script> 