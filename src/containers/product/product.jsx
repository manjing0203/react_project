import React,{Component} from "react";
import { Card,Button,Icon,Select,Input,Table,message } from 'antd';
import { connect } from "react-redux";
import { productListReq,updateStatusReq,searchReq } from "../../api";
import {PAGE_SIZE} from '../../config/config'
import {saveProductInfoAction} from '../../reduxs/actions/product_action'
const { Option } = Select;

@connect(
 state => ({}),
 {
   saveProductInfo : saveProductInfoAction
 }
)
class Product extends Component{
   state = {
    productList:[],
    total:0,
    current:0,
    searchType:'productName',
    keyWord:''
   }
   //关键字搜索商品
   search = async()=>{
     this.isSearch = true
     this.getProductList()
   }
   //更新商品的状态
   updateStatus = async(productId,status)=>{
      let result = await updateStatusReq(productId,status)
      if(status === 1) status = 2;
      else status = 1;
      let productList = [...this.state.productList]
      if(result.status === 0){
        productList = productList.map((item)=>{
           if(item._id === productId){
             item.status = status
           }
           return item
         })
         this.setState({
           productList
         })
      }else message.error('更新状态失败')
   }
   //获取商品列表
  getProductList = async(current=1)=>{
    let {searchType,keyWord} = this.state
    let result 
    if(this.isSearch) result = await searchReq(current,PAGE_SIZE,searchType,keyWord)
    else result = await productListReq(current,PAGE_SIZE)
    let {status,data,msg} = result
    this.props.saveProductInfo(data.list)
    if(status === 0){
      this.setState({
        productList:data.list,
        total:data.total,
        current
      })
    }else message.error(msg)
  }
//组件挂载
  componentDidMount (){
    this.getProductList()
  }

  render(){
    let {productList,total,current} = this.state
    const dataSource = productList;
    const columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
        key: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        width:"7%",
        render:(price)=>{return '￥'+price}
      },
      {
        title: '状态',
        //dataIndex: 'status',
        key: 'status',
        width:"8%",
        align:'center',
        render :({_id,status})=>{
          return (
            <div>
               <Button type={status===1?'danger':'primary'} onClick={()=>{this.updateStatus(_id,status)}}>{status===1?'下架':'上架'}</Button>
               <span>{status===1?'在售':'已停售'}</span>
            </div>
          ) 
        }
      },
      {
        title: '操作',
        dataIndex: '_id',
        key: 'opera',
        width:"8%",
        render :(id)=>{
          return (
            <div>
               <Button type="link" onClick={()=>{this.props.history.push(`/admin/prod/product/detail/:${id}`)}}>详情</Button>
               <Button type="link" onClick={()=>{this.props.history.push(`/admin/prod/product/add_update/:${id}`)}}>修改</Button>
            </div>
          ) 
        }
      },
    ];
    return (
      <div>
          <Card  
             title={
                (
                  <div>
                     <Select
                        style={{ width: '10%' }}
                        defaultValue="productName"
                        onChange={(value)=>{this.setState({searchType:value})}}
                      >
                        <Option value="productName">按名称搜索</Option>
                        <Option value="productDesc">按描述搜索</Option>
                      </Select>
                      <Input 
                         style={{ width: '20%',marginLeft:20,marginRight:20 }}
                         placeholder="请输入关键字" 
                         allowClear={true}
                         onChange={(event)=>{this.setState({keyWord:event.target.value})}}
                      />
                      <Button type="primary" onClick={()=>{this.search()}}><Icon type="search" />搜索</Button>
                  </div>
                )
             }
             extra={
             <Button type="primary" onClick={()=>{this.props.history.push('/admin/prod/product/add_update')}}>
               <Icon type="plus" />
               添加商品
            </Button>}
            >
              <Table 
               dataSource={dataSource}
               columns={columns}
               bordered
               rowKey="_id"
               pagination={
                 {
                   total,
                   pageSize:PAGE_SIZE,
                   current,
                   onChange:(current)=>{
                     this.getProductList(current);
                    }
                }
               }
                />
          </Card>
      </div>
    )
  }
}
export default Product;