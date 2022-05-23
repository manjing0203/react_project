import myAxios from "./myAxios";
import jsonp from 'jsonp';
import {message} from 'antd';
import {WEATHER_CITY,WEATHER_AK} from '../config/config'


//登录请求
export const loginReq = (values) =>  myAxios.post('/login',values)
//获取商品分类列表请求
export const categoryListReq = () => myAxios.get('/manage/category/list')
//天气请求
export const weatherReq = ()=>{
  return new Promise((resolve,reject)=>{
      jsonp(`http://api.weatherdt.com/common/?area=${WEATHER_CITY}&type=forecast|observe|rise|calendar|air|history|alarm&key=${WEATHER_AK}`, (err,data)=>{
        if(err){
          message.error('请求天气接口失败')
          return new Promise(()=>{})
        }else{
          resolve(data)
        }
     })
  })
}
//添加商品分类的请求
export const addListReq = (categoryName) => myAxios.post('/manage/category/add',{categoryName})
//修改商品分类
export const operaListReq = (categoryId,categoryName) => myAxios.post('/manage/category/update',{categoryId,categoryName})
//获取商品分页列表
export const productListReq = (pageNum,pageSize)=>myAxios.get('/manage/product/list',{params:{pageNum,pageSize}})
//更新商品状态
export const updateStatusReq = (productId,status)=>myAxios.post('/manage/product/updateStatus',{productId,status})
//搜索商品
export const searchReq = (pageNum,pageSize,searchType,keyWord)=>myAxios.get('/manage/product/search',{params:{pageNum,pageSize,[searchType]:keyWord}})
//根据商品ID获取商品信息
export const prodInfoByIdReq = (productId)=>myAxios.get('/manage/product/info',{params:{productId}})
//删除图片
export const detelePicReq = (name) =>  myAxios.post('/manage/img/delete',{name})
//添加商品
export const addProductReq = (productObj) => myAxios.post('/manage/product/add',{...productObj})
//修改商品
export const operaProductReq = (productObj) =>myAxios.post('/manage/product/update',{...productObj})
//所有角色列表
export const roleListReq = (pageNum, pageSize)=>myAxios.get('/manage/role/list',{params:{pageNum, pageSize}})
//添加角色
export const addRoleReq = (values)=>myAxios.post('/manage/role/add',values)
//更新角色权限
export const updateRoleReq = (roleObj)=>myAxios.post('/manage/role/update',roleObj)
//获取用户列表
export const userListReq = ()=>myAxios.get('/manage/user/list')
//添加用户
export const addUserReq = (values)=>myAxios.post('/manage/user/add',values)
//更新用户
export const updateUserReq = ({_id,username,phone,email,role_id})=>myAxios.post('/manage/user/update',{_id,username,phone,email,role_id})
//删除用户
export const deleteUserReq = (userId)=>myAxios.post('/manage/user/delete',{userId})