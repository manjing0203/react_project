import React, { Component } from 'react'
import {Card,Button,Icon,Form,Input,Select,message} from 'antd'
import { connect } from 'react-redux'
import { categoryListReq,addProductReq } from "../../api"
import PictureWall from '../picture_wall/picture_wall'
import MyEditor from '../rich_text_editor/rich_text_editor'
const {Item} = Form
const {Option} = Select

@connect(
  state => ({categoryList:state.categoryList})
)
@Form.create()
class AddUpdate extends Component {
  state = {
    categoryList:[]
  }

  getCategoryList = async()=>{
    let result = await categoryListReq()
    let {status,data,msg} = result
    if(status === 0){
      this.setState({categoryList:data})
    }else message.error(msg)
  }
  componentDidMount(){
    let {categoryList} = this.props 
    if(categoryList.length){
      this.setState({categoryList})
    }else{
      this.getCategoryList()
    }
    
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
        console.log('收集表单', {...values,imgs,detail});
        let result = await addProductReq({...values,imgs,detail,pCategoryId:'hdgwu672988tgdvc'})
        let {status,data,msg} = result
        if(status === 0) {
          message.success('添加商品成功')
          this.props.history.replace('/admin/prod/product')
        }
        else message.error(msg)
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    let {categoryList} = this.state
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
            <Form 
              onSubmit={this.handleSubmit} 
              className="login-form"
              labelCol={{md:2}}
              wrapperCol={{md:7}}
              >
              <Item label='商品名称'>
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '商品名称必须输入' }],
                })(
                  <Input
                    placeholder="商品名称"
                  />,
                )}
              </Item>
              <Item label='商品描述'>
                {getFieldDecorator('desc', {
                  rules: [{ required: true, message: '商品描述必须输入' }],
                })(
                  <Input
                    placeholder="商品描述"
                  />,
                )}
              </Item>
              <Item label='商品价格'>
                {getFieldDecorator('price', {
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
                <MyEditor ref={this.myEditor}/>
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