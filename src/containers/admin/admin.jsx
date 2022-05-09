import React,{Component} from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {createdeleteUserInfo} from '../../reduxs/actions/login_action'

class Admin extends Component{
  lgout = ()=>{
    this.props.deleteUserInfo()
  }
  render(){
    if(this.props.userInfo.isLogin){
      return (
        <div>
          当前为admin页面,你的用户名为{this.props.userInfo.user.username}<br/>
          <button onClick={this.lgout}>退出登录</button>
        </div>
      )
    }else{
      return <Redirect to="/login"/>
    }
    
  }
}

export default connect(
  state =>({userInfo:state.userInfo}),
  {
    deleteUserInfo:createdeleteUserInfo
  }
)(Admin)