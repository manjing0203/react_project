import axios from "axios";
import { message } from "antd";
import NProgress from 'nprogress';
import qs from 'qs'
import store from '../reduxs/store';
import {createdeleteUserInfo} from '../reduxs/actions/login_action'
import 'nprogress/nprogress.css'

const instance = axios.create();
//请求拦截器
instance.interceptors.request.use(function (config) {
  NProgress.start();
  //发送请求时请求头携带token
   let {token} = store.getState().userInfo
   if(token) config.headers.Authorization =  token
  let {method,data} = config
  //统一处理post携带参数为urlencoeded参数
  if(method.toLowerCase() === 'post'){
    if(data instanceof Object){
      config.data = new URLSearchParams(data)
    //当参数中有数组时
   for(let i in data){
    if(data[i] instanceof Array){
      config.data = qs.stringify(data,{arrayFormat:'indices'})
    }
  }
    }
  }
  return config;
});
//响应拦截器
instance.interceptors.response.use((response)=>{
  NProgress.done()
  return response.data;
},(error)=>{
  NProgress.done()
  //7天登录过期了,如何处理
  if(error.response.status === 401){
    console.log(888)
     message.error('登录过期,请重新登录')
     store.dispatch(createdeleteUserInfo())
  }else{
    message.error(error.message,1);
    return new Promise(()=>{})
  }
}
);

export default instance;