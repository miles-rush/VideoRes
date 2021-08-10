import Vue from 'vue'
import VueRouter from 'vue-router'
const Search = () => import('../components/Search.vue')
const Play = () => import('../components/Movie.vue')
const Phone = () => import('../components/Phone.vue')
const Load = () => import('../components/clock/Load.vue')
const LoadPhone = () => import('../components/clock/LoadPhone.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'search',
    component: Search
  },
  {
    path:'/play',
    name:'play',
    component: Play
  },
  {
    path:'/phone',
    name:'phone',
    component: Phone
  },
  {
    path:'/load',
    name:'load',
    component: Load
  },
  {
    path:'/loadphone',
    name:'loadphone',
    component: LoadPhone
  },
]

const router = new VueRouter({
  routes
})

export default router
