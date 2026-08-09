import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/tailwind.css'
import './assets/css/animations.css'

const app = createApp(App)

app.config.globalProperties.$updateAuthState = function() {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch (e) {
      localStorage.removeItem('user');
    }
  }
  return null;
};

app.use(router)
if (store) app.use(store)

app.mount('#app')