import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login/Login'
import Main from '@/pages/Main'
import {routers,otherRouter,appRouter} from './router'
import iView from 'iview'

Vue.use(Router);
//配置路由
const RouterConfig= {
  routes:routers
}
export default new Router(RouterConfig);

// export default new Router({
//   routes: [
//     {
//       path: '/login',
//       name: 'login',
//       component: Login
//     },{
//     path:'/',
//       name:'home',
//       component:Main,
//     },{
//       path:'*',
//       name:'notfound',
//       component:()=>import('@/pages/NotFound.vue')
//     }
//   ]
// })
