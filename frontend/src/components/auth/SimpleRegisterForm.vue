<template>
  <div class="max-w-lg mx-auto">
    <div class="text-red-500 mb-4" v-if="error">{{ error }}</div>
    
    <form @submit.prevent="handleRegister" class="space-y-4">
      <div>
        <label for="email" class="block text-gray-700 mb-2">Email</label>
        <input 
          type="email" 
          id="email" 
          v-model="email" 
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
        >
      </div>
      
      <div>
        <label for="password" class="block text-gray-700 mb-2">Пароль</label>
        <input 
          type="password" 
          id="password" 
          v-model="password" 
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
        >
        <p class="text-sm text-gray-500 mt-1">Минимум 8 символов, должен содержать буквы и цифры</p>
      </div>
      
      <div>
        <label for="password2" class="block text-gray-700 mb-2">Подтверждение пароля</label>
        <input 
          type="password" 
          id="password2" 
          v-model="password2" 
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
        >
      </div>
      
      <div>
        <label for="first_name" class="block text-gray-700 mb-2">Имя</label>
        <input 
          type="text" 
          id="first_name" 
          v-model="first_name" 
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
        >
      </div>
      
      <div>
        <label for="last_name" class="block text-gray-700 mb-2">Фамилия</label>
        <input 
          type="text" 
          id="last_name" 
          v-model="last_name" 
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
        >
      </div>
      
      <div class="flex items-center">
        <input 
          type="checkbox" 
          id="agree" 
          v-model="agree" 
          required
          class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        >
        <label for="agree" class="ml-2 block text-sm text-gray-900">
          Я согласен с <a href="#" class="text-blue-600 hover:underline">условиями использования</a> и <a href="#" class="text-blue-600 hover:underline">политикой конфиденциальности</a>
        </label>
      </div>
      
      <div class="flex justify-between">
        <button 
          type="submit" 
          class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition" 
          :disabled="loading"
        >
          <span v-if="loading">Регистрация...</span>
          <span v-else>Зарегистрироваться</span>
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
  name: 'SimpleRegisterForm',
  emits: ['close'],
  data() {
    return {
      email: '',
      password: '',
      password2: '',
      first_name: '',
      last_name: '',
      agree: false,
      error: null,
      loading: false
    }
  },
  methods: {
    async handleRegister() {
      this.error = null;
      
      // Валидация
      if (this.password !== this.password2) {
        this.error = 'Пароли не совпадают';
        return;
      }
      
      if (this.password.length < 8) {
        this.error = 'Пароль должен содержать не менее 8 символов';
        return;
      }
      
      if (!this.agree) {
        this.error = 'Необходимо согласиться с условиями использования';
        return;
      }
      
      this.loading = true;
      
      try {
        // Подготовка данных для API
        const userData = {
          email: this.email,
          password: this.password,
          password_confirm: this.password2,
          first_name: this.first_name,
          last_name: this.last_name
        };
        
        // Отправка запроса через API-утилиту
        const result = await userApi.register(userData);
        
        if (result.success) {
          // Если регистрация успешна
          alert('Регистрация успешна! Теперь вы можете войти в систему.');
          this.$emit('close');
        } else {
          // Обрабатываем ошибки API
          const data = result.error;
          if (typeof data === 'object') {
            // Если есть конкретные ошибки в ответе
            if (data.email) {
              this.error = `Email: ${data.email.join(', ')}`;
            } else if (data.password) {
              this.error = `Пароль: ${data.password.join(', ')}`;
            } else if (data.non_field_errors) {
              this.error = data.non_field_errors.join(', ');
            } else if (data.detail) {
              this.error = data.detail;
            } else {
              this.error = 'Ошибка при регистрации. Пожалуйста, проверьте введенные данные.';
            }
          } else {
            // Если ошибка в виде строки
            this.error = data;
          }
        }
      } catch (error) {
        console.error('Ошибка при регистрации:', error);
        this.error = 'Произошла ошибка при регистрации. Пожалуйста, попробуйте позже.';
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
/* Дополнительные стили при необходимости */
</style>