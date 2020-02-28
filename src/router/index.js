import Vue from 'vue'
import VueRouter from 'vue-router'
import AddGen from '../views/add-gen.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'addGen',
    component: AddGen
  },
  {
    path: '/sub',
    name: 'subGen',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/sub-gen.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
