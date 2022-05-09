import {SAVEUSERINFO,CREATEDELETEUSERINFO} from '../actions_type';

let user = JSON.parse(localStorage.getItem('user'));
let token = localStorage.getItem('token');
let initState = {
  user:user || {},
  isLogin:user&&token?true:false,
  token:token || ''
}
export default function operaAction(preState=initState,action) {
  let {type,data} = action;
  let newState
  switch (type) {
    case SAVEUSERINFO:
      newState = {
        user:data.user,
        isLogin:true,
        token:data.token
      }
      return newState;
    case CREATEDELETEUSERINFO:
      newState = {
        user:{},
        isLogin:false,
        token:''
      }
      return newState;
    default:
      return preState;
  }
}