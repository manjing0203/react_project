import { SAVEUSERINFO,CREATEDELETEUSERINFO } from "../actions_type";

 const createSaveUserInfo = value=>{
  localStorage.setItem('user',JSON.stringify(value.user));
  localStorage.setItem('token',value.token)
  return {type:SAVEUSERINFO,data:value}
 }
 const createdeleteUserInfo = ()=>{
  localStorage.removeItem('user');
  localStorage.removeItem('token')
  return {type:CREATEDELETEUSERINFO}
};
 
 export {createSaveUserInfo,createdeleteUserInfo}