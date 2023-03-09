import Vue from 'vue'
import VueRouter from 'vue-router'
import { Message }from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import Login from '../views/Login';
import Welcome from "../views/Welcome";
import Home from '../views/Home.vue';
import CinemaInfo from "../views/cinema/CinemaInfo";
import MovieInfo from "../views/movie/MovieInfo";
import MovieCategory from "../views/movie/MovieCategory";
import HallInfo from "../views/hall/HallInfo";
import SessionInfo from "../views/hall/SessionInfo";
import BillInfo from "../views/bill/BillInfo";
import UserInfo from "../views/user/UserInfo";
import RoleInfo from "../views/role/RoleInfo";
import ResourceInfo from "../views/role/ResourceInfo";
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
      { path: '/cinema', name: 'Cinema', component: CinemaInfo },
      { path: '/movie', name: 'Movie', component: MovieInfo },
      { path: '/movieCategory', component: MovieCategory },
      { path: '/hall', name: 'Hall', component: HallInfo },
      { path: '/session', component: SessionInfo },
      { path: '/user', name: 'User', component: UserInfo },
      { path: '/bill', name: 'Bill', component: BillInfo },
      { path: '/role', component: RoleInfo },
      { path: '/resource', component: ResourceInfo }
    ]
  },
  {
    path: '/*',
    component: Error404
  }
]

const router = new VueRouter({
  routes,
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
