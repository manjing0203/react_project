import React,{Component} from "react";
import logo from "./imgs/logo.png";
import "./css/login.css";
import {Form,Icon,Input,Button } from 'antd';
const {Item} = Form;

class Login extends Component{
  //登录提交信息,发送请求
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  render(){
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <header>
          <img src={logo} alt="logo" />
          <h1>商品管理系统</h1>
        </header>
        <section>
          <h1>用户登录</h1>
          <Form onSubmit={this.handleSubmit} className="login-form">
           <Item>
             {getFieldDecorator('username', {
               rules: [{ required: true, message: 'Please input your username!' }],
             })(
               <Input
                 prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                 placeholder="用户名"
               />,
             )}
           </Item>
           <Item>
             {getFieldDecorator('password', {
               rules: [{ required: true, message: 'Please input your Password!' }],
             })(
               <Input
                 prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                 type="password"
                 placeholder="密码"
               />,
             )}
           </Item>
           <Item>
             {getFieldDecorator('remember', {
               valuePropName: 'checked',
               initialValue: true,
             })()}
             <Button type="primary" htmlType="submit" className="login-form-button">
               登录
             </Button>
            </Item>
        </Form>
        </section>
      </div>
    )
  }
}

export default Form.create()(Login);
