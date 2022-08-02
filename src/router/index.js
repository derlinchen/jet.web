import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/login/Login.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  }
]

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
