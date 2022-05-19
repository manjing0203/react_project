import React,{Component} from "react";
import { connect } from "react-redux";
import { Route,Switch,Redirect } from "react-router-dom";
import { Layout } from 'antd';
import {createdeleteUserInfo} from '../../reduxs/actions/login_action'
import Header from '../admin/header/header';
import LeftNav from "./leftNav/leftNav";
import Home from "../../components/home/home";
import Categroy from "../categroy/categroy";
import Product from "../product/product";
import User from "../user/user";
import Role from "../role/role";
import Bar from "../bar/bar";
import Line from "../line/line";
import Pie from "../pie/pie";
import Detail from '../detail/detail';
import AddUpdate from "../add_update/add_update";
import '../admin/css/admin.less'
import LeftNavHeader from "../../components/leftNav-header/leftNav-header";

//import { listReq } from "../../api";
const { Footer, Sider, Content } = Layout;

@connect(
  state =>({userInfo:state.userInfo}),
  {
    deleteUserInfo:createdeleteUserInfo
  }
)
class Admin extends Component{
 
  // 测试获取商品列表
  // demo = async()=>{
  //   let result = await listReq();
  //   console.log(result);
  // }
  render(){
    if(this.props.userInfo.isLogin){
      return (
           <Layout className="admin">
              <Sider className="sider">
                <LeftNavHeader></LeftNavHeader>
                <LeftNav></LeftNav>
              </Sider>
              <Layout>
                <Header></Header>
                <Content className="content">
                  <Switch>
                    <Route path="/admin/home" component={Home}></Route>
                    <Route path="/admin/prod/category" component={Categroy}></Route>
                    <Route path="/admin/prod/product" component={Product} exact></Route>
                    <Route path="/admin/prod/product/detail/:id" component={Detail}></Route>
                    <Route path="/admin/prod/product/add_update" component={AddUpdate} exact></Route>
                    <Route path="/admin/prod/product/add_update/:id" component={AddUpdate}></Route>
                    <Route path="/admin/user" component={User}></Route>
                    <Route path="/admin/role" component={Role}></Route>
                    <Route path="/admin/charts/bar" component={Bar}></Route>
                    <Route path="/admin/charts/line" component={Line}></Route>
                    <Route path="/admin/charts/pie" component={Pie}></Route>
                    <Redirect to="/admin/home"/>
                  </Switch>
                </Content>
                <Footer className="footer">
                  请使用谷歌浏览器,以便获得最佳的效果
                  {/* <Button onClick={this.demo}>点我</Button> */}
                </Footer>
              </Layout>
            </Layout>
      )
    }else{
      return <Redirect to="/login"/>
    }
    
  }
}

export default Admin;