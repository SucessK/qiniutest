import Vue from 'vue'
import VueRouter from 'vue-router'
import B from "@/views/b.vue"
import C from "@/views/c.vue"
import Viewd from "@/views/viewd.vue"
import Up from "@/views/upload.vue"
Vue.use(VueRouter)

const routes = [
  {
    path: '/view',
    component: Viewd
  },
  {
    path: '/',
    name: 'C',
    component: C
  },
  {
    path: '/b',
    name: 'b',
    component: B
  },
  {
    path:'/qq',
    component: Up
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
