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

util.setCurrentPath=function(vm,name){
  let title='';
  let isOtherRouter = false;
  vm.$store.state.app.routers.forEach(item=>{

  })
};
export default util;
