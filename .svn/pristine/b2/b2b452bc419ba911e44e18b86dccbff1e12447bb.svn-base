// import {otherRouter,appRouter} from '@/router/router'
import {appRouter} from '@/router/router'
import util from '@/libs/util'
import Vue from 'vue'
import axios from 'axios'
import Cookies from 'js-cookie'

const app = {
  state:{
    cachePage:[], //缓存页
    openedSubmenuArr:[], //要展开的菜单数组
   /* pageOpenedList:[{  //已经打开的tag列表
      title:'首页',
      path:'/',
      name:'home'
    }],*/
    currentPageName: '',
    currentPath:[ //面包屑数组
      {
        title:'首页',
        path:'',
        name:'home'
      }
    ],
    menuList:[],//菜单
    routers:[
      // otherRouter,
      ...appRouter
    ], //路由
    // dontCache:['notice'], //这里定义不要缓存的页面，如notice，见router中的name
    // curVillage:localStorage.getItem('village'), //当前选中的小区
    // tagsList:[...otherRouter.children],
    staffServiceType:[], //员工服务类型id列表
    staffAccount:{},//员工账号信息
    deleteModal:{
      model:false,
      callback:function(){
      }
    }, //删除弹窗
    uploadProgressPercent:0,
    uploadProgressVisible:false,
   /* uploadProgress:{//上传进度动画
      visible:false,
      percent:0,
    }*/
  },
  mutations:{
    setUploadProgress(state,visible){
      state.uploadProgressVisible=visible;
    },
    setUploadPercent(state,percent){
      state.uploadProgressPercent=percent;
    },
    setDeleteModal(state,control){
      if(control.model){
        state.deleteModal={
          model:control.model,
          callback:control.callback
        }
      }else{
        state.deleteModal={
          model:control.model,
          callback:function(){}
        };
      }
    },
    setStaffServiceType(state,list){
      state.staffServiceType=list;
    },
    setStaffAccount(state,account){
      state.staffAccount=account;
    },
    // setTagsList (state, list) {
    //   state.tagsList.push(...list);
    // },
    //更新菜单，以及权限设定
    updateMenulist(state){
      let menuList = [];
      axios.get(`/user/basicInfo`).then(res=>{
        if(res.data.code===0){
          Cookies.set('username',res.data.data.loginName);
          //权限菜单名数组
          let menu= res.data.data.resourceList.map(item=>{
            return item.path;
          });

//筛选
          let menuHasAdd = []; //用于存放已添加的菜单项name（外层）
         menuList= appRouter.filter(item=>{
            let childRouter = item.children; //必然存在

           if(item.meta.single){
             if(menu.indexOf(item.children[0].name)>-1){
               return true;
             }else if(item.children[0].name==='home'){
                return true;
              }
           }else{
             let childFilter = childRouter.filter(child=>{
               //无三级菜单
               if(!child.children){
                 if(menu.indexOf(child.name)>-1){
                  return true;
                 }
               }else{
                 let groundRouter = child.children;
                 if(child.meta.hideChild){
                   if(menu.indexOf(child.children[0].name)>-1){
                     return true
                   }
                 }else{
                  let groundFilter =  groundRouter.filter(ground=>{
                     if(menu.indexOf(ground.name)>-1){
                       return true;
                     }
                   });
                  if(groundFilter.length>0){
                    child.children=groundFilter;
                    return true;
                  }
                 }
               }
             });
             if(childFilter.length>0){
               return true;
             }

             /*let filterRes = false;
             childRouter.forEach(child=>{
               //无三级菜单
               if(!child.children){
                if(menu.indexOf(child.name)>-1){
                  filterRes = true;
                }
               }else if(child.children&&child.children.length>1){
                 let groundRouter = child.children;
                 if(child.meta.hideChild){
                   if(menu.indexOf(child.children[0].name)>-1){
                     filterRes=true;
                   }
                 }
                 groundRouter.forEach(ground=>{

                 })
               }
             })
             return filterRes;*/
           }


          });

          state.menuList=menuList;
        }else{
          console.log('获取菜单权限失败')
          state.menuList=menuList;
        }
      });
    },
    //展开子菜单
    addOpenSubmenu (state, name) {
      let hasThisName = false; //判定是否有这个name
      let isEmpty = false;
      let isArr = false; //用于判断是否为三级菜单子目录
      if (name.length === 0) {
        isEmpty = true;
      }
      if (state.openedSubmenuArr.indexOf(name) > -1) {
        hasThisName = true;
      }
      if(name instanceof Array){
        isArr=true
      }
      // 普通二级子菜单
      if (!hasThisName && !isEmpty&&!isArr) {
        // state.openedSubmenuArr.push(name);
        state.openedSubmenuArr=[name];
      }else if(!hasThisName && !isEmpty&&isArr){
        //三级子菜单
        state.openedSubmenuArr=name
      }
    },
    //退出登录后，清空子菜单
    clearOpenSubmenu(state,name){
      state.openedSubmenuArr=[]
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
      // otherRouter.children[0]
      state.pageOpenedList = localStorage.pageOpenedList ? JSON.parse(localStorage.pageOpenedList) : [];
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
      state.pageOpenedList.push(tagObj);
      localStorage.pageOpenedList=JSON.stringify(state.pageOpenedList);
    }
  }
}
export default app;
