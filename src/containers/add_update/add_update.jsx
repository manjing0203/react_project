import React, { Component } from 'react'
import {Card,Button,Icon,Form,Input,Select,message} from 'antd'
import { connect } from 'react-redux'
import { categoryListReq,addProductReq,operaProductReq, prodInfoByIdReq } from "../../api"
import PictureWall from '../picture_wall/picture_wall'
import MyEditor from '../rich_text_editor/rich_text_editor'
const {Item} = Form
const {Option} = Select

@connect(
  state => ({
    categoryList:state.categoryList,
    productList:state.productInfo
  })
)
@Form.create()
class AddUpdate extends Component {
  state = {
    categoryList:[],
    updateType:'',
    name:'',
    desc:'',
    price:'',
    categoryId:'',
    imgs:[],
    detail:''
  }

  //获取分类列表
  getCategoryList = async()=>{
    let result = await categoryListReq()
    let {status,data,msg} = result
    if(status === 0){
      this.setState({categoryList:data})
    }else message.error(msg)
  }

  //根据id获取商品列表
  getProductList = async(productId)=>{
    let result = await prodInfoByIdReq(productId)
    let {status,data,msg} = result
    if(status === 0){
      this.setState({...data})
      this.pictureWall.current.setFileList(data.imgs)
    }
    else message.error(msg)
  }

  //组件挂载时
  componentDidMount(){
    let {categoryList,productList} = this.props 
    if(categoryList.length){
      this.setState({categoryList})
    }else{
      this.getCategoryList()
    }

    if(this.props.match.params.id){
       let id = this.props.match.params.id.slice(1)
      this.setState({updateType:'opera' })
      if(productList.length){
        let result = productList.find((item)=>{
          return item._id === id
        })
        this.setState({...result})
        this.pictureWall.current.setFileList(result.imgs)
      }else{
        this.getProductList(id)
      }
    } 
    else this.setState({updateType:'add'})
  }

  pictureWall = React.createRef()
  myEditor = React.createRef()

  //表单提交
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async(err, values) => {
      if (!err) {
        let imgs = this.pictureWall.current.getImgArr()
        let detail = this.myEditor.current.getRichText()
        let result 
        if(this.state.updateType === 'opera'){
          let id = this.props.match.params.id.slice(1)
           result = await operaProductReq({...values,imgs,detail,_id:id})
        }else{
         result = await addProductReq({...values,imgs,detail})
        }
        let {status,msg} = result
        if(status === 0) {
          message.success('操作商品成功')
          this.props.history.replace('/admin/prod/product')
        } else message.error(msg)
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    let {categoryList,updateType} = this.state
    return (
      <div>
        <Card
           title={
            <div>
               <Button type='link' onClick={()=>{this.props.history.goBack()}}><Icon type="arrow-left" /></Button>
               <span className='top'>{updateType==='add'?'添加商品':'修改商品'}</span>
            </div>
          } 
         >
            <Form 
              onSubmit={this.handleSubmit} 
              className="login-form"
              labelCol={{md:2}}
              wrapperCol={{md:7}}
              >
              <Item label='商品名称'>
                {getFieldDecorator('name', {
                  initialValue:this.state.name||'',
                  rules: [{ required: true, message: '商品名称必须输入' }],
                })(
                  <Input
                    placeholder="商品名称"
                  />,
                )}
              </Item>
              <Item label='商品描述'>
                {getFieldDecorator('desc', {
                  initialValue:this.state.desc||'',
                  rules: [{ required: true, message: '商品描述必须输入' }],
                })(
                  <Input
                    placeholder="商品描述"
                  />,
                )}
              </Item>
              <Item label='商品价格'>
                {getFieldDecorator('price', {
                  initialValue:this.state.price||'',
                  rules: [{ required: true, message: '商品价格必须输入' }],
                })(
                  <Input
                    type='number'
                    placeholder="商品价格"
                    prefix='￥'
                    addonAfter='元'
                  />,
                )}
              </Item>
              <Item label='商品分类'>
                {getFieldDecorator('categoryId', {
                  initialValue:this.state.categoryId||'',
                  rules: [{ required: true, message: '商品分类必须选择' }],
                })(
                 <Select placeholder='请选择分类'>
                   {
                      categoryList.map((item)=>{
                        return <Option key={item._id} value={item._id}>{item.name}</Option>
                      })
                   }
                 </Select>
                )}
              </Item>
              <Item label='商品图片' wrapperCol={{md:10}}>
                  <PictureWall ref={this.pictureWall}/>
              </Item>
              <Item label='商品详情' wrapperCol={{md:13}}>
                <MyEditor ref={this.myEditor} detail={this.state.detail}/>
              </Item>
              <Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    提交
                </Button>
              </Item>
            </Form>
        </Card>
      </div>
    )
  }
}
export default AddUpdate;