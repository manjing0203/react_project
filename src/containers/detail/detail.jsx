import React, { Component } from 'react'
import {Button,Card,Icon,List, message} from 'antd'
import { connect } from "react-redux";
import {prodInfoByIdReq,categoryListReq} from '../../api'
import {BASE_URL} from '../../config/config'
import './detail.less'
const {Item} = List

@connect(
  state =>({
    productInfo:state.productInfo,
    categoryList:state.categoryList
  }),
)
class Detail extends Component {
  state = {
    name:'',
    desc:'',
    price:'',
    imgs:[],
    detail:'',
    categoryName:'',
  }
 //获取商品信息
  getProdInfo = async()=>{
    let id = this.props.match.params.id.slice(1);
    let {productInfo} = this.props
    let result
    //从redux中获取
    if (productInfo.length !== 0) {
      result = productInfo.find((item)=>{
        return item._id === id
      })
    }else{
      //页面刷新重新发送请求
     let response = await prodInfoByIdReq(id)
     let {status,data,msg} = response
     if(status===0) result = data
     else message.error(msg)
     }
     let {name,desc,price,categoryId,imgs,detail} = result
    this.setState({
      name,
      desc,
      price,
      imgs,
      detail,
    })
    this.categoryId = categoryId;
   }

   //获取商品列表
   getCategoryList = async()=>{
    let response = await categoryListReq()
    let {status,data,msg} = response
    if(status === 0){
      let result = data.find((item)=>{
        return item._id === this.categoryId
      })
      this.setState({
        categoryName : result.name
      })
    }
    else message.error(msg)
    
   }


   //组件挂载
  componentDidMount (){
   this.getProdInfo()
   let {categoryList} = this.props;
   if(categoryList.length){
    let result = categoryList.find((item)=>{
      return item._id === this.categoryId
    })
    this.setState({
      categoryName : result.name
    })
   }else{
     this.getCategoryList()
   }
  }

  render() {
    let {name,desc,price,imgs,detail,categoryName} = this.state;
    return (
      <div>
          <Card
           title={
             <div>
                <Button type='link' onClick={()=>{this.props.history.goBack()}}><Icon type="arrow-left" /></Button>
                <span className='top'>商品详情</span>
             </div>
           } 
           >
            <List>
                <Item className='list-item'>
                  <span className='list-title'>商品名称:</span>
                  <span>{name}</span>
                </Item>
                <Item className='list-item'>
                  <span className='list-title'>商品描述:</span>
                  <span>{desc}</span>
                </Item>
                <Item className='list-item'>
                  <span className='list-title'>商品价格:</span>
                  <span>{price}</span>
                </Item>
                <Item className='list-item'>
                  <span className='list-title'>所属分类:</span>
                  <span>{categoryName}</span>
                </Item>
                <Item className='list-item'>
                  <span className='list-title'>商品图片:</span>
                    {
                        imgs.map((item,index)=>{
                          return <img key={index} src={`${BASE_URL}/upload/${item}`} alt="商品图片" />
                        })
                    }
                </Item>
                <Item className='list-item'>
                  <span className='list-title'>商品详情:</span>
                  <span className='detail' dangerouslySetInnerHTML={{__html:detail}}></span>
                </Item>
            </List>
          </Card>
      </div>
    )
  }
}
export default Detail;
