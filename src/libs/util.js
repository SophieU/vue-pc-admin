import axios from 'axios';
import packjson from '../../package.json';

let util={};
util.title=function(title){
  let Title='物业后台';
  if(title){
    Title+='-'+title;
  }
  window.document.title=Title;
};

//判断数组是否包含某一个数组
util.inOf=function(arr,targetArr){
  let res = true;
  arr.forEach(item=>{
    if(targetArr.indexOf(arr)<0){
      res = false;
    }
  })
  return res;
};
//判断元素是否在数组中
util.oneOf=function(ele,targetArr){
  if(targetArr.indexOf(ele)<0){
    return false;
  }else{
    return true;
  }
};
//根据路由name获取Router对象中的当前对象
util.getRouterObjByName=function(routers,name){
  if(!name||!routers||!router.length){
    return null;
  }
  let routerObj=null;
  for(let item of routers){
    if(item.name===name){
      return item;
    }
    routerObj=util.getRouterObjByName(item.children,name);
    if(routerObj){
      return routerObj;
    }
  }
  return null;
};
util.handleTitle=function(vm,item){
    return item.title;
};
//返回当前路由的全部路径值 数组
util.setCurrentPath=function(vm,name){
  let title = '';
  let isOtherRouter = false;

  //获取 title，并判断当前是否为otherRouter中的组件
  vm.$store.state.app.routers.forEach(item => {
    //只有一个子路由

    if (item.children.length === 1) {
      if (item.children[0].name === name) {
        title = util.handleTitle(vm, item);
        if (item.name === 'otherRouter') {
          isOtherRouter = true;
        }
      }
    } else {
      //多个子路由
      item.children.forEach(child => {
        if (child.name === name) {
          title = util.handleTitle(vm, child);
          if (item.name === 'otherRouter') {
            isOtherRouter = true;
          }
        }
      });
    }
  });

  let currentPathArr = [];
//如果当前name为home主页时
  if (name === 'home') {
    currentPathArr = [
      {
        title:'首页',
        path: '',
        name: 'home'
      }
    ];
    //当前 name为不在菜单栏中显示的Main组件子菜单index时
  } else if ((name.indexOf('_index') >= 0 || isOtherRouter) && name !== 'home') {
    currentPathArr = [
      {
        title: '首页',
        path: '/home',
        name: 'home'
      },
      {
        title: title,
        path: '',
        name: name
      }
    ];
  } else {
    //当前 name为左侧菜单栏中的组件
    //获取当前路由对象

    let currentPathObj = vm.$store.state.app.routers.filter(item => {
      if (item.children.length <= 1) {
        return item.children[0].name === name;
      }else {
        let i = 0;
        let childArr = item.children;
        let len = childArr.length;

        while (i < len) {
          if (childArr[i].name === name) {
            return true;
          }else if(childArr[i].children){
            //有子路由
            let j=0;
            let subChildArr = childArr[i].children;
            let subLen = subChildArr.length;
            while(j<subLen){
              if(subChildArr[j].name===name){
                return true;
              }
              j++;
            }
          }
          i++;
        }
        return false;
      }
    })[0];
    if (currentPathObj.children.length <= 1 && currentPathObj.name === 'home') {

      currentPathArr = [
        {
          title: '首页',
          path: '',
          name: 'home'
        }
      ];
    } else if (currentPathObj.children.length <= 1 && currentPathObj.name !== 'home') {
      currentPathArr = [
        {
          title: '首页',
          path: '/home',
          name: 'home'
        },
        {
          title: currentPathObj.title,
          path: '',
          name: name
        }
      ];
    } else {
      // let childObj = currentPathObj.children.filter((child) => {
      //   return child.name === name;
      // })[0];
      let childObj = null;
      currentPathObj.children.map((child) => {
        if(child.name===name) childObj = child;
        if(child.children){
          let i = 0;
          let subChild = child.children;
          let len = subChild.length;
          while(i<len){
            if(subChild[i].name===name){
              childObj= subChild[i];
            }
            i++;
          }
        }
      });
      currentPathArr = [
        {
          title: '首页',
          path: '/home',
          name: 'home'
        },
        {
          title: currentPathObj.title,
          path: '',
          name: currentPathObj.name
        },
        {
          title: childObj.title,
          path: currentPathObj.path + '/' + childObj.path,
          name: name
        }
      ];
    }
  }
  vm.$store.commit('setCurrentPath', currentPathArr);

  return currentPathArr;
};
util.openNewPage = function (vm, name, argu, query) {
  let pageOpenedList = vm.$store.state.app.pageOpenedList;
  let openedPageLen = pageOpenedList.length;
  let i = 0;
  let tagHasOpened = false;
  while (i < openedPageLen) {
    if (name === pageOpenedList[i].name) { // 页面已经打开
      vm.$store.commit('pageOpenedList', {
        index: i,
        argu: argu,
        query: query
      });
      tagHasOpened = true;
      break;
    }
    i++;
  }
  if (!tagHasOpened) {
    // let tag = vm.$store.state.app.tagsList.filter((item) => {
    //   if (item.children) {
    //     return name === item.children[0].name;
    //   } else {
    //     return name === item.name;
    //   }
    // });
    // tag = tag[0];

    let tag = null;
    vm.$store.state.app.tagsList.forEach(item=>{
      if(item.children){
        item.children.forEach(child=>{
          if(child.name===name){
            tag = child;
          }
        })
      }else{
        if(item.name===name){
          tag=item;
        }
      }
    });


    if (tag) {
      // tag = tag.children ? tag.children[0] : tag;
      if (argu) {
        tag.argu = argu;
      }
      if (query) {
        tag.query = query;
      }
      vm.$store.commit('increateTag', tag);
    }
  }
  vm.$store.commit('setCurrentPageName', name);
};
export default util;
