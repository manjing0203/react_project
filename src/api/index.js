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
export const addProductReq = (productObj) =>myAxios.post('/manage/product/add',productObj)

