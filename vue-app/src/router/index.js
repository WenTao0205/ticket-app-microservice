import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from "@/components/layout/Layout"
import Me from "@/views/me/Index"

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import("@/views/Login")
  },

  {
    path: '/register',
    name: 'Register',
    component: () => import("@/views/Register")
  },

  //公共布局下的路由
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import("@/views/Home")
      },
      {
        path: '/show',
        name: 'Show',
        component: () => import("@/views/show/Index"),
        children: [
          {
            path: '/',
            name: 'Info',
            component: () => import("@/views/show/Info")
          }
        ]
      },
      {
        path: '/films',
        component: () => import("@/views/Films")
      },
      {
        path: '/seat',
        name: 'Seat',
        component: () => import("@/views/Seat")
      },
      {
        path: '/pay',
        name: 'Pay'
      },
      {
        path: '/me',
        component: Me,
        children: [
          {
            path: 'order',
            name: 'Order',
            component: () => import("@/views/me/Order")
          },
          {
            path: 'setting',
            name: 'Setting',
            component: () => import("@/views/me/Setting")
          },
        ]
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
