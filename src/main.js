// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import iView from 'iview'
import router from './router'
import store from './store'
import {appRouter} from './router/router'
import util from './libs/util'
import 'iview/dist/styles/iview.css'
import axios from './libs/api';

Vue.config.productionTip = false

// axios.defaults.baseURL='http://101.132.99.21:8109';
// axios.defaults.timeout=10000;
Vue.prototype.$http = axios;

Vue.use(iView)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render:h=>h(App),
  data:{
    currentPageName:''
  },
  mounted(){
    this.currentPage=this.$route.name;
    //显示打开的页面列表
    this.$store.commit('setOpenedList');
    this.$store.commit('initCachepage');
    // 权限菜单过滤相关
    // this.$store.commit('updateMenulist');

  },
  created(){
    let tagsList = [];
    appRouter.map(item=>{
      if(item.children.length<=1){
        tagsList.push(item.children[0]);
      }else{
        tagsList.push(...item.children);
      }
    });
    this.$store.commit('setTagsList',tagsList);
  }
})
