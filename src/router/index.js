import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/applications',
    name: 'Applications',
    component: () => import('../views/Applications.vue')
  },
  {
    path: '/tmc',
    name: 'Tmc',
    component: () => import('../views/Tmc.vue')
  },
  {
    path: '/rm',
    name: 'Rm',
    component: () => import('../views/Rm.vue')
  },
  {
    path: '/tmc-video',
    name: 'Tmc-video',
    component: () => import('../views/Tmc-video.vue')
  },
  {
    path: '/departments',
    name: 'Departments',
    component: () => import('../views/Departments.vue')
  },
  {
    path: '/reports',
    name: 'Reports',
    component: () => import('../views/Reports.vue')
  },
  {
    path: '/trash',
    name: 'Trash',
    component: () => import('../views/Trash.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

export default router
