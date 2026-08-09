import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/tailwind.css'
import './assets/css/custom.css'
import './assets/css/animations.css'

// Проверка состояния аутентификации при запуске приложения
const app = createApp(App)

// Создаем глобальное событие для обновления состояния аутентификации
app.config.globalProperties.$updateAuthState = function() {
  console.log('Обновление состояния аутентификации');
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      console.log('Пользователь авторизован:', user);
      // Здесь можем вызвать события или обновить состояние
    } catch (e) {
      console.error('Ошибка при разборе данных пользователя:', e);
      localStorage.removeItem('user');
    }
  } else {
    console.log('Пользователь не авторизован');
  }
};

// Запускаем проверку при инициализации
app.config.globalProperties.$updateAuthState();

app.use(router).mount('#app') 