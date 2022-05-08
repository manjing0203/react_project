import React,{Component} from "react";
import { connect } from "react-redux";
import {demo1Action,demo2Action} from '../../reduxs/actions/admin_action'

class Admin extends Component{
  render(){
    return (
      <div>
        当前为admin页面,你的用户名为{this.props.state}
      </div>
    )
  }
}

export default connect(
  state =>({user:state}),
  {
    demo1:demo1Action,
    demo2:demo2Action
  }
)(Admin)