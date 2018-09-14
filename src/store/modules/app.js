import {otherRouter,appRouter} from '@/router/router'
import util from '@/libs/util'
import Vue from 'vue'

const app = {
  state:{
    cachePage:[], //缓存页
    openedSubmenuArr:[], //要展开的菜单数组
    pageOpenedList:[{  //已经打开的tag列表
      title:'首页123456789',
      path:'/',
      name:'home'
    },{
      title:'小区公告',
      path:'/content/notice',
      name:'notice'
    }],
    currentPageName: '',
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
    tagsList:[...otherRouter.children],
  },
  mutations:{
    setTagsList (state, list) {
      state.tagsList.push(...list);
    },
    //更新菜单，以及权限设定
    updateMenulist(state){
      let accessCode = 102;
      let menuList = [];
      state.menuList=appRouter;
      // appRouter.forEach((item,index)=>{
      //
      // })
    },
    //展开子菜单
    addOpenSubmenu (state, name) {
      let hasThisName = false;
      let isEmpty = false;
      if (name.length === 0) {
        isEmpty = true;
      }
      if (state.openedSubmenuArr.indexOf(name) > -1) {
        hasThisName = true;
      }
      if (!hasThisName && !isEmpty) {
        // state.openedSubmenuArr.push(name);
        state.openedSubmenuArr=[name];
      }
    },
    //关闭标签页
    closePage(state,name){
      state.cachePage.forEach((item,index)=>{
        if(item===name){
          state.cachePage.splice(index,1);
        }
      })
    },
    initCachepage(state){
      if(localStorage.cachePage){
        state.cachePage=JSON.parse(localStorage.cachePage);
      }
    },
    //关闭页
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
    },
    pageOpenedList(state,get){
      let openedPage = state.pageOpenedList[get.index];
      if(get.argu){
        openedPage.argu=get.argu;
      }
      if(get.query){
        openedPage.query = get.query;
      }
      state.pageOpenedList.splice(get.index,1,openedPage);
      localStorage.pageOpenedList=JSON.stringify(state.pageOpenedList)
    },
    clearAllTags (state) {
      state.pageOpenedList.splice(1);
      state.cachePage.length = 0;
      localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
    },
    clearOtherTags (state, vm) {
      let currentName = vm.$route.name;
      let currentIndex = 0;
      state.pageOpenedList.forEach((item, index) => {
        if (item.name === currentName) {
          currentIndex = index;
        }
      });
      if (currentIndex === 0) {
        state.pageOpenedList.splice(1);
      } else {
        state.pageOpenedList.splice(currentIndex + 1);
        state.pageOpenedList.splice(1, currentIndex - 1);
      }
      let newCachepage = state.cachePage.filter(item => {
        return item === currentName;
      });
      state.cachePage = newCachepage;
      localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
    },

    //设置已打开的菜单
    setOpenedList (state) {
      state.pageOpenedList = localStorage.pageOpenedList ? JSON.parse(localStorage.pageOpenedList) : [otherRouter.children[0]];
    },
    setCurrentPath (state, pathArr) {
      state.currentPath = pathArr;
    },
    setCurrentPageName(state,name){
      state.currentPageName=name;
    },
    //新增tag
    increateTag(state,tagObj){
      if(!util.oneOf(tagObj.name,state.dontCache)){
        state.cachePage.push(tagObj.name);
        localStorage.cachePage = JSON.stringify(state.cachePage);
      }
      console.log(tagObj)
      state.pageOpenedList.push(tagObj);
      localStorage.pageOpenedList=JSON.stringify(state.pageOpenedList);
    }
  }
}
export default app;
