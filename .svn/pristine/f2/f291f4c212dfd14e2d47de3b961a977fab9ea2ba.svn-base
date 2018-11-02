import * as qiniu from 'qiniu-js';
import axios from './api';

let token = '';
axios.get(`/base/qiniu/token`).then(res=>{
  if(res.data.code===0){
    token = res.data.data.token;
    localStorage.setItem('qnToken',token);
  }
});

let uploader= function (file){

};

export default uploader;
