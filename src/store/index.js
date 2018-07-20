import Vue from 'vue'
import Vuex from 'vuex'

//导入模块
import app from './modules/app'

//使用Vuex
Vue.use(Vuex);

const store = new Vuex.Store({
  state:{

  },
  mutations:{

  },
  actions:{},
  modules:{
    app,
  }
});

export default store;
