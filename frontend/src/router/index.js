import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { 
      title: 'Главная — IT-Платформа',
      transition: 'fade'
    }
  },
  {
    path: '/events',
    name: 'Events',
    component: () => import('@/views/Events.vue'),
    meta: { 
      title: 'Календарь событий — IT-Платформа',
      transition: 'fade'
    }
  },
  {
    path: '/news',
    name: 'News',
    component: () => import('@/views/News.vue'),
    meta: { 
      title: 'Новости — IT-Платформа',
      transition: 'fade'
    }
  },
  {
    path: '/achievements',
    name: 'Achievements',
    component: () => import('@/views/Achievements.vue'),
    meta: { 
      title: 'Достижения — IT-Платформа',
      transition: 'fade'
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile.vue'),
    meta: { 
      title: 'Профиль — IT-Платформа',
      transition: 'fade'
    }
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: () => import('@/views/PrivacyPolicy.vue'),
    meta: { 
      title: 'Политика конфиденциальности — IT-Платформа',
      transition: 'fade'
    }
  },
  {
    path: '/terms-of-use',
    name: 'TermsOfUse',
    component: () => import('@/views/TermsOfUse.vue'),
    meta: { 
      title: 'Условия использования — IT-Платформа',
      transition: 'fade'
    }
  },
  {
    path: '/faq',
    name: 'FAQ',
    component: () => import('@/views/FAQ.vue'),
    meta: { 
      title: 'FAQ — IT-Платформа',
      transition: 'fade'
    }
  },
  {
    path: '/support',
    name: 'Support',
    component: () => import('@/views/Support.vue'),
    meta: { 
      title: 'Поддержка — IT-Платформа',
      transition: 'fade'
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'IT-Платформа'
  next()
})

export default router