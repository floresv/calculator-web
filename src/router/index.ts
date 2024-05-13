import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RecordsView from '../views/RecordsView.vue'
import { loginStore } from '@/stores/login'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/records',
      name: 'records',
      component: RecordsView
    }
  ]
})

router.beforeEach((to, from, next) => {
  // Must be used within the function!
  const authUserStore = loginStore()
  if (to.path == '/' || authUserStore.isLoggedIn) next()
  else next('/')
})

export default router
