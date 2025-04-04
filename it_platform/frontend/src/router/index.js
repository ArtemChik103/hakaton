import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { 
      title: 'Главная - IT-Платформа',
      transition: 'fade'
    }
  },
  {
    path: '/events',
    name: 'Events',
    component: () => import('@/views/Events.vue'),
    meta: { 
      title: 'События - IT-Платформа',
      transition: 'fade'
    }
  },
  {
    path: '/news',
    name: 'News',
    component: () => import('@/views/News.vue'),
    meta: { 
      title: 'Новости - IT-Платформа',
      transition: 'fade'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue'),
    meta: { 
      title: 'О проекте - IT-Платформа',
      transition: 'fade'
    }
  },
  {
    path: '/achievements',
    name: 'Achievements',
    component: () => import('@/views/Achievements.vue'),
    meta: { 
      title: 'Достижения - IT-Платформа',
      transition: 'fade'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/Login.vue'),
    meta: { 
      title: 'Вход - IT-Платформа',
      transition: 'slide'
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/auth/Register.vue'),
    meta: { 
      title: 'Регистрация - IT-Платформа',
      transition: 'slide'
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile.vue'),
    meta: { 
      title: 'Профиль - IT-Платформа',
      transition: 'fade',
      requiresAuth: true
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/admin/AdminPanel.vue'),
    meta: { 
      title: 'Панель администратора - IT-Платформа',
      transition: 'fade',
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: '/organizer',
    name: 'Organizer',
    component: () => import('@/views/organizer/OrganizerPanel.vue'),
    meta: { 
      title: 'Панель организатора - IT-Платформа',
      transition: 'fade',
      requiresAuth: true,
      requiresOrganizer: true
    }
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: () => import('@/views/PrivacyPolicy.vue'),
    meta: { 
      title: 'Политика конфиденциальности - IT-Платформа',
      transition: 'fade'
    }
  },
  {
    path: '/terms-of-use',
    name: 'TermsOfUse',
    component: () => import('@/views/TermsOfUse.vue'),
    meta: { 
      title: 'Условия использования - IT-Платформа',
      transition: 'fade'
    }
  },
  {
    path: '/faq',
    name: 'FAQ',
    component: () => import('@/views/FAQ.vue'),
    meta: { 
      title: 'FAQ - IT-Платформа',
      transition: 'fade'
    }
  },
  {
    path: '/support',
    name: 'Support',
    component: () => import('@/views/Support.vue'),
    meta: { 
      title: 'Поддержка - IT-Платформа',
      transition: 'fade'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Navigation guard for authentication
router.beforeEach((to, from, next) => {
  // Update page title
  document.title = to.meta.title || 'IT-Платформа'

  // Authentication check
  const userStr = localStorage.getItem('user')
  const isAuthenticated = !!userStr
  
  // Redirect if authentication is required but user is not authenticated
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' })
    return
  }
  
  // Admin route check
  if (to.meta.requiresAdmin && isAuthenticated) {
    try {
      const user = JSON.parse(userStr)
      if (!user.is_superuser) {
        next({ name: 'Home' })
        return
      }
    } catch (e) {
      next({ name: 'Login' })
      return
    }
  }
  
  // Organizer route check
  if (to.meta.requiresOrganizer && isAuthenticated) {
    try {
      const user = JSON.parse(userStr)
      if (!(user.is_organizer || user.is_admin || user.is_superuser)) {
        next({ name: 'Home' })
        return
      }
    } catch (e) {
      next({ name: 'Login' })
      return
    }
  }
  
  next()
})

export default router