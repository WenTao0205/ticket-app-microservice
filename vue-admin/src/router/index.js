import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import Login from '../views/Login';
import Welcome from "../views/Welcome";
import Home from '../views/Home.vue';
import ShowInfo from "../views/show/ShowInfo";
import ConcertShow from "../views/show/show-ranking-management/concertShow"
import InstrumentShow from "../views/show/show-ranking-management/instrumentShow"
import TheatricalShow from "../views/show/show-ranking-management/theatricalShow"
import LivehouseShow from "../views/show/show-ranking-management/livehouseShow"
import HallInfo from "../views/hall/HallInfo";
import OrderInfo from "../views/order/OrderInfo";
import UserInfo from "../views/user/UserInfo";
import Error404 from "../views/Error404";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Login,
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', name: 'Welcome', component: Welcome },
      { path: '/show', name: 'Show', component: ShowInfo },
      { path: '/show/concertHotManage', name: 'concertShow', component: ConcertShow },
      { path: '/show/instrumentHotManage', name: 'instrumentShow', component: InstrumentShow },
      { path: '/show/theatricalHotManage', name: 'theatricalShow', component: TheatricalShow },
      { path: '/show/livehouseHotManage', name: 'livehouseShow', component: LivehouseShow },

      { path: '/hall', name: 'Hall', component: HallInfo },
      { path: '/user', name: 'User', component: UserInfo },
      { path: '/order', name: 'Order', component: OrderInfo }
    ]
  },
  {
    path: '/*',
    component: Error404
  }
]

const router = new VueRouter({
  routes
})

router.afterEach(() => {
  NProgress.done()
})

// 获取原型对象push函数
const originalPush = VueRouter.prototype.push

// 获取原型对象replace函数
const originalReplace = VueRouter.prototype.replace

// 修改原型对象中的push函数
VueRouter.prototype.push = function push(location){
  return originalPush.call(this , location).catch(err=>err)
}

// 修改原型对象中的replace函数
VueRouter.prototype.replace = function replace(location){
  return originalReplace.call(this , location).catch(err=>err)
}

export default router
