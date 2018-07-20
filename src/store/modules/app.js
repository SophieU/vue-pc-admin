import {otherRouter,appRouter} from '@/router/router'
import Vue from 'vue'

const app = {
  state:{
    cachePage:[], //缓存页
    pageOpenedList:[{
      title:'首页',
      path:'',
      name:'home_index'
    }],
    currentPath:[ //面包屑数组
      {
        title:'首页',
        path:'',
        name:'home_index'
      }
    ],
    menuList:[],//菜单
    routers:[
      otherRouter,
      ...appRouter
    ], //路由
    dontCache:['notice'], //这里定义不要缓存的页面，如notice，见router中的name
  },
  mutations:{
    updateMenuList(state){
      let accessCode = 102;
      let menuList = [];
      state.menuList=appRouter;
      // appRouter.forEach((item,index)=>{
      //
      // })
    }
  }
}
export default app;
