import myAxios from "axios";
import { message } from "antd";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'

const instance = myAxios.create();
instance.interceptors.request.use(function (config) {
  NProgress.start();
  let {method,data} = config
  if(method.toLowerCase() === 'post'){
    if(data instanceof Object){
      config.data = new URLSearchParams(data)
    }
  }
  return config;
});

instance.interceptors.response.use((response)=>{
  NProgress.done()
  return response.data;
},(error)=>{
  NProgress.done()
  message.error(error.message,1);
  return new Promise(()=>{})
}
);

export default instance;