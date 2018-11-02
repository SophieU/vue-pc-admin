import axios from 'axios';
import router from '../router/index';
import iView from 'iview';
import Cookies from 'js-cookie';

let baseUrl = '';
let domin = window.location.hostname;
if(domin==='localhost'){ //本地
  baseUrl='http://101.132.99.21:8109/repair/call/center/v1/';
  // baseUrl='http://192.168.0.196:8080/repair/call/center/v1/';
  localStorage.setItem('baseURL','http://101.132.99.21:8109/repair/call/center/v1/')
  // localStorage.setItem('baseURL','http://192.168.0.196:8080/repair/call/center/v1/')
}else if(domin==='xxx'){ //正式
  baseUrl=''
}else{ //测试
  baseUrl='http://101.132.99.21:8109/repair/call/center/v1/';
  localStorage.setItem('baseURL','http://101.132.99.21:8109/repair/call/center/v1/');
}
axios.defaults.headers.common['Content-Type']='application/json';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL =baseUrl;
axios.defaults.timeout =10000;
axios.defaults.withCredentials = true; //让ajax携带cookie

//请求拦截器
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// 响应拦截器
let countRes = 0;
axios.interceptors.response.use(function (response) {
  let code = response.data.code;
  let method = response.config.method;
  if(code===904&&method!=='option'){
    // if(countRes<1){
    //   iView.Message.error(response.data.msg);
    // }
    // countRes++;
    // Cookies.remove('user');
    // router.push({name:'login'});
    Cookies.remove('user');
    router.push({name:'login'});
    return {}
  }else{
    return response;
  }
  /*else{
    countRes=0;
  }*/


  // Do something with response data
}, function (error) {
  // Do something with response error
  console.log('interceptor error--------'+error);
  return Promise.reject(error);
});

export default axios;
