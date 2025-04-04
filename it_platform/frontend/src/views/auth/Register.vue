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
      
      <!-- Правая часть - форма регистрации -->
      <div class="w-full md:w-1/2 p-8">
        <div class="max-w-md mx-auto">
          <h2 class="text-2xl font-bold text-gray-800 mb-2">Регистрация</h2>
          
          <!-- Круглый индикатор прогресса -->
          <div class="flex items-center mb-6">
            <div class="rounded-full h-8 w-8 flex items-center justify-center bg-blue-600 text-white">
              1
            </div>
            <div class="h-1 flex-1 mx-2" :class="step > 1 ? 'bg-blue-600' : 'bg-gray-300'"></div>
            <div class="rounded-full h-8 w-8 flex items-center justify-center" :class="step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-500'">
              2
            </div>
          </div>
          
          <!-- Шаг 1: Основная информация -->
          <div v-if="step === 1">
            <form @submit.prevent="goToNextStep" class="space-y-4">
              <div>
                <label for="firstName" class="block text-sm font-medium text-gray-700">Имя <span class="text-red-500">*</span></label>
                <input
                  id="firstName"
                  v-model="form.firstName"
                  type="text"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label for="lastName" class="block text-sm font-medium text-gray-700">Фамилия <span class="text-red-500">*</span></label>
                <input
                  id="lastName"
                  v-model="form.lastName"
                  type="text"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label for="middleName" class="block text-sm font-medium text-gray-700">Отчество (при наличии)</label>
                <input
                  id="middleName"
                  v-model="form.middleName"
                  type="text"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label for="birthDate" class="block text-sm font-medium text-gray-700">Дата рождения <span class="text-red-500">*</span></label>
                <div class="relative">
                  <input
                    id="birthDate"
                    v-model="form.birthDate"
                    type="date"
                    required
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Пол <span class="text-red-500">*</span></label>
                <div class="flex items-center space-x-6">
                  <div class="flex items-center">
                    <input
                      id="gender-male"
                      v-model="form.gender"
                      name="gender"
                      type="radio"
                      value="male"
                      required
                      class="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                    />
                    <label for="gender-male" class="ml-2 block text-sm font-medium text-gray-700">Мужчина</label>
                  </div>
                  <div class="flex items-center">
                    <input
                      id="gender-female"
                      v-model="form.gender"
                      name="gender"
                      type="radio"
                      value="female"
                      required
                      class="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                    />
                    <label for="gender-female" class="ml-2 block text-sm font-medium text-gray-700">Женщина</label>
                  </div>
                </div>
              </div>
              
              <div class="pt-4">
                <button
                  type="submit"
                  class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Продолжить
                </button>
              </div>
            </form>
          </div>
          
          <!-- Шаг 2: Контактная информация и пароль -->
          <div v-else-if="step === 2">
            <form @submit.prevent="register" class="space-y-4">
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700">Email <span class="text-red-500">*</span></label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label for="phone" class="block text-sm font-medium text-gray-700">Телефон <span class="text-red-500">*</span></label>
                <input
                  id="phone"
                  v-model="form.phone"
                  type="tel"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label for="location" class="block text-sm font-medium text-gray-700">Город <span class="text-red-500">*</span></label>
                <div class="relative">
                  <input
                    id="location"
                    v-model="form.location"
                    type="text"
                    required
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <!-- Выбор роли -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Выберите роль <span class="text-red-500">*</span></label>
                <div class="flex flex-col space-y-2">
                  <div class="flex items-center">
                    <input
                      id="role-participant"
                      v-model="form.isOrganizer"
                      name="userRole"
                      type="radio"
                      :value="false"
                      class="focus:ring-blue-500 h-5 w-5 text-blue-600 border-gray-300"
                    />
                    <label for="role-participant" class="ml-3 block text-sm font-medium text-gray-700">
                      Участник
                      <p class="text-xs text-gray-500">Доступ к участию в мероприятиях и получению достижений</p>
                    </label>
                  </div>
                  
                  <div class="flex items-center">
                    <input
                      id="role-organizer"
                      v-model="form.isOrganizer"
                      name="userRole"
                      type="radio"
                      :value="true"
                      class="focus:ring-blue-500 h-5 w-5 text-blue-600 border-gray-300"
                    />
                    <label for="role-organizer" class="ml-3 block text-sm font-medium text-gray-700">
                      Организатор
                      <p class="text-xs text-gray-500">Возможность создавать и управлять мероприятиями</p>
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <label for="password" class="block text-sm font-medium text-gray-700">Пароль <span class="text-red-500">*</span></label>
                <div class="relative">
                  <input
                    id="password"
                    v-model="form.password"
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
              </div>
              
              <div>
                <label for="passwordConfirm" class="block text-sm font-medium text-gray-700">Повторите пароль <span class="text-red-500">*</span></label>
                <div class="relative">
                  <input
                    id="passwordConfirm"
                    v-model="form.passwordConfirm"
                    :type="showPasswordConfirm ? 'text' : 'password'"
                    required
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button 
                    type="button" 
                    @click="showPasswordConfirm = !showPasswordConfirm"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500 mt-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                      <path v-if="showPasswordConfirm" stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      <path v-else stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path v-if="!showPasswordConfirm" stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <!-- Капча -->
              <div class="border border-gray-300 rounded-md p-3 bg-gray-50">
                <div class="flex items-center">
                  <input
                    id="captcha"
                    v-model="form.captchaChecked"
                    type="checkbox"
                    required
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label for="captcha" class="ml-2 block text-sm text-gray-700">
                    Я не робот
                  </label>
                </div>
                <div class="text-xs text-gray-500 mt-2">
                  Нажмите, чтобы продолжить
                </div>
              </div>
              
              <!-- Соглашение с политикой -->
              <div class="flex items-center">
                <input
                  id="terms"
                  v-model="form.termsAccepted"
                  type="checkbox"
                  required
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label for="terms" class="ml-2 block text-sm text-gray-700">
                  Я принимаю <a href="#" class="text-blue-600 hover:text-blue-800">условия соглашения</a> о пользовании информационными системами и ресурсами платформы
                </label>
              </div>
              
              <div class="flex space-x-4 pt-4">
                <button
                  type="button"
                  @click="step = 1"
                  class="w-1/3 flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Назад
                </button>
                <button
                  type="submit"
                  class="w-2/3 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  :disabled="loading"
                >
                  <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {{ loading ? 'Регистрация...' : 'Зарегистрироваться' }}
                </button>
              </div>
            </form>
          </div>
          
          <!-- Шаг 3: Успешная регистрация -->
          <div v-else-if="step === 3" class="text-center">
            <div class="mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">Регистрация успешна!</h3>
            <p class="text-gray-600 mb-6">
              Ваш аккаунт на IT-Платформе создан. Теперь вы можете войти, используя указанные данные.
            </p>
            <button
              @click="$router.push('/login')"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Войти в аккаунт
            </button>
          </div>
          
          <!-- Отображение ошибки -->
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
  name: 'RegisterView',
  data() {
    return {
      step: 1,
      showPassword: false,
      showPasswordConfirm: false,
      loading: false,
      error: null,
      form: {
        firstName: '',
        lastName: '',
        middleName: '',
        birthDate: '',
        gender: '',
        email: '',
        phone: '',
        location: '',
        password: '',
        passwordConfirm: '',
        captchaChecked: false,
        termsAccepted: false,
        isOrganizer: false
      }
    }
  },
  methods: {
    validateStep1() {
      // Валидация полей первого шага
      if (!this.form.firstName) {
        this.error = 'Пожалуйста, укажите имя';
        return false;
      }
      if (!this.form.lastName) {
        this.error = 'Пожалуйста, укажите фамилию';
        return false;
      }
      if (!this.form.birthDate) {
        this.error = 'Пожалуйста, укажите дату рождения';
        return false;
      }
      if (!this.form.gender) {
        this.error = 'Пожалуйста, укажите пол';
        return false;
      }
      
      return true;
    },
    
    validateStep2() {
      // Валидация полей второго шага
      if (!this.form.email) {
        this.error = 'Пожалуйста, укажите email';
        return false;
      }
      if (!this.form.phone) {
        this.error = 'Пожалуйста, укажите телефон';
        return false;
      }
      if (!this.form.location) {
        this.error = 'Пожалуйста, укажите город';
        return false;
      }
      if (typeof this.form.isOrganizer !== 'boolean') {
        this.error = 'Пожалуйста, выберите роль';
        return false;
      }
      if (!this.form.password) {
        this.error = 'Пожалуйста, укажите пароль';
        return false;
      }
      if (this.form.password !== this.form.passwordConfirm) {
        this.error = 'Пароли не совпадают';
        return false;
      }
      if (!this.form.captchaChecked) {
        this.error = 'Пожалуйста, подтвердите, что вы не робот';
        return false;
      }
      if (!this.form.termsAccepted) {
        this.error = 'Необходимо принять условия соглашения';
        return false;
      }
      
      return true;
    },
    
    goToNextStep() {
      this.error = null;
      
      if (this.validateStep1()) {
        this.step = 2;
      }
    },
    
    async register() {
      try {
        this.error = null;
        
        if (!this.validateStep2()) {
          return;
        }
        
        this.loading = true;
        
        // Подготавливаем данные для API
        const userData = {
          email: this.form.email,
          phone: this.form.phone,
          password: this.form.password,
          password_confirm: this.form.passwordConfirm,
          first_name: this.form.firstName,
          last_name: this.form.lastName,
          middle_name: this.form.middleName || '',
          birth_date: this.form.birthDate,
          gender: this.form.gender,
          location: this.form.location,
          is_organizer: this.form.isOrganizer
        };
        
        console.log('Отправляем данные:', userData);
        
        // Запрос к API для регистрации
        const response = await fetch('/api/users/register/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': this.getCsrfToken()
          },
          body: JSON.stringify(userData),
          credentials: 'include'
        });
        
        console.log('Получен ответ:', response.status, response.statusText);
        
        // Попробуем получить тело ответа как текст
        const responseText = await response.text();
        console.log('Тело ответа:', responseText);
        
        if (!response.ok) {
          try {
            const errorData = JSON.parse(responseText);
            // Обрабатываем возможные ошибки валидации
            const errorMessage = errorData.email || 
                              errorData.phone || 
                              errorData.password || 
                              errorData.non_field_errors || 
                              'Ошибка при регистрации';
            throw new Error(errorMessage);
          } catch (parseError) {
            throw new Error('Некорректный ответ от сервера: ' + responseText.substring(0, 100) + '...');
          }
        }
        
        try {
          const data = JSON.parse(responseText);
          
          // Сохраняем данные пользователя в localStorage
          localStorage.setItem('user', JSON.stringify(data.user));
          
          // Переход к шагу успешной регистрации
          this.step = 3;
        } catch (parseError) {
          throw new Error('Не удалось разобрать ответ как JSON: ' + parseError.message);
        }
      } catch (err) {
        this.error = err.message || 'Ошибка при регистрации. Пожалуйста, попробуйте позже.';
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