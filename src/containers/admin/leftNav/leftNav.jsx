import React, { Component } from 'react';
import {Link,withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu, Icon } from 'antd';
import {menuList} from '../../../config/menu-config';
import {createSaveTitleAction} from '../../../reduxs/actions/leftNav_action'
const { SubMenu,Item } = Menu;

@connect(
  state =>({}),
  {
    saveTitle:createSaveTitleAction
  }
)
@withRouter
class LeftNav extends Component {
  createMenu = (target)=>{
    return target.map((item)=>{
       if(!item.children){
         return (
          <Item key={item.key} onClick={()=>{this.props.saveTitle(item.title)}}>
            <Link to={item.path}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Item>
         )
       }else{
         return(
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
           {this.createMenu(item.children)} 
          </SubMenu>
         )
       }
     })
  }
  render() {
    let {pathname} = this.props.location
    return (
      <div>
        <Menu
          selectedKeys={pathname.indexOf('product') !==-1 ? 'product' : pathname.split('/').reverse()[0]}
          defaultOpenKeys={pathname.split('/').splice(2)}
          mode="inline"
          theme="dark"
          //inlineCollapsed={this.state.collapsed}
        >
         {this.createMenu(menuList)}
        </Menu>
      </div>
    )
  }
}
export default LeftNav;