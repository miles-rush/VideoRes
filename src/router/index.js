import Vue from 'vue'
import VueRouter from 'vue-router'
const Search = () => import('../components/Search.vue')
const Play = () => import('../components/Movie.vue')
const Phone = () => import('../components/Phone.vue')


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
  }
  
]

const router = new VueRouter({
  routes
})

export default router
