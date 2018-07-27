import Vue from 'vue'
import Router from 'vue-router'
import {routers,otherRouter,appRouter} from './router'
import iView from 'iview'
import Util from '../libs/util'
import Cookie from 'js-cookie'

Vue.use(Router);
//配置路由
const RouterConfig= {
  routes:routers
};
const router = new Router(RouterConfig);

router.beforeEach((to,from,next)=>{
  iView.LoadingBar.start();
  Util.title(to.meta.title);
  //当前用户未登录且访问的不是登录页
  if(!Cookie.get('user')&&to.name!=='login'){
    next({
      name:'login'
    })
  }else if(Cookie.get('user')&&to.name==='login'){
   //用户已登录且访问的是登录页
    next({
      name:'home'
    })
  }else{
    //其他情况直接跳转
    const curRouterObj = Util.getRouterObjByName(to.name);
    //改变当前title
    if(curRouterObj&&curRouterObj.title){
      Util.title(curRouterObj.title)
    }
  }
  next();
});
router.afterEach((to)=>{
  iView.LoadingBar.finish();
  window.scrollTo(0,0); //回到初始位置
})
export default router;

