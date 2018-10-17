import axios from 'axios';

let baseUrl = '';
let domin = window.location.hostname;
if(domin==='localhost'){ //本地
  baseUrl='192.168.0.24';
}else if(domin==='xxx'){ //正式
  baseUrl=''
}else{ //测试

}

axios.default.baseUrl=baseUrl;

export default axios;
