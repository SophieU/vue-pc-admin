import {otherRouter,appRouter} from '@/router/router'
import Vue from 'vue'

const app = {
  state:{
    cachePage:[], //缓存页
    openedSubmenuArr:[], //要展开的菜单数组
    pageOpenedList:[{  //已经打开的tag列表
      title:'首页',
      path:'/',
      name:'home'
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
    curVillage:localStorage.getItem('village'), //当前选中的小区
  },
  mutations:{
    //更新菜单，以及权限设定
    updateMenuList(state){
      let accessCode = 102;
      let menuList = [];
      state.menuList=appRouter;
      // appRouter.forEach((item,index)=>{
      //
      // })
    },
    //关闭标签页
    closePage(state,name){
      state.cachePage.forEach((item,index)=>{
        if(item===name){
          state.cachePage.splice(index,1);
        }
      })
    },
    removeTag(state,name){
      state.pageOpenedList.map((item,index)=>{
        if(item.name===name){
          state.pageOpenedList.splice(index,1);
        }
      })
    },
    setCurVillage(state,name){
      localStorage.setItem('village',name);
      state.curVillage=name;
    }
  }
}
export default app;
