import React,{Component} from "react";
//把header非路由组件包装成路由组件
import {withRouter} from 'react-router-dom';
import { Button,Icon,Modal } from "antd";
import screenfull from 'screenfull'; 
import { connect } from "react-redux";
import dayjs from 'dayjs';
import {createdeleteUserInfo} from '../../../reduxs/actions/login_action'
import {weatherReq} from '../../../api'
import {menuList} from '../../../config/menu-config'
import './css/header.less'
const { confirm } = Modal;

@connect(
  state =>({
    userInfo:state.userInfo,
    title:state.title
  }),
  {
    deleteUserInfo:createdeleteUserInfo
  }
)
@withRouter
 class Header extends Component{
  state = {
    isFull:false,
    date:dayjs().format('YYYY年 MM月DD日 HH:mm:ss '),
    weatherInfo:{},
    title:'' 
  }

  //全屏按钮
  screenfull = ()=>{
    screenfull.toggle()
    console.log(this.props)
  }

  //处理天气请求回来的数据
  weather = async()=>{
    let result = await weatherReq()
    let weather = result.calendar['1001012']['007']
    let minTemp = result.history['101010100']['1001010']['002']
    let maxTemp = result.history['101010100']['1001010']['001']
    this.setState({
      weatherInfo:{weather,minTemp,maxTemp}
    })
  }

  componentDidMount (){
    //全屏改变时改变状态从而改变icon
    screenfull.on('change', () => {
      let isFull = !this.state.isFull
      this.setState({isFull})
    });
    //动态展示时间
    this.timer = setInterval(() => {
      this.setState({ date:dayjs().format('YYYY年 MM月DD日 HH:mm:ss')})
    }, 1000);
    //发送请求获取天气信息
     this.weather();
     //调用获取title的方法
     let title = this.getTitle();
     this.setState({title})
  }

   //根据this.props.location.pathname获取到key,根据key取menu-config中查找到相应的title
   getTitle = ()=>{
    let {pathname} = this.props.location
    let pathKey = pathname.indexOf('product') !==-1 ? 'product' : pathname.split('/').reverse()[0];
    let title
    menuList.forEach((item)=>{
      if(!item.children){
        if(item.key === pathKey) title = item.title;
      }else{
        item.children.forEach((itemChild)=>{
          if(itemChild.key === pathKey) title = itemChild.title
        })
      }
    })
    return title
  }

  componentWillUnmount(){
    //卸载组件时清除定时器
    clearInterval(this.timer)
  }

   //退出登录
  lgout = ()=>{
    confirm({
      title: '您确定退出登录吗?',
      content: '若退出需要重新登录',
      cancelText:'取消',
      okText:'确定',
      onOk:()=> {
        this.props.deleteUserInfo()
      }
    });
  }

  render(){
    let {isFull,date,weatherInfo} = this.state
    //从store中取出username
    let {username} = this.props.userInfo.user
    return (
      <header className="header">
        <div className="header-top">
          <Button size="small" className="btn-screen" onClick={this.screenfull}>
            <Icon type={isFull?"fullscreen-exit":"fullscreen"} />
          </Button>
          <span>欢迎,{username}</span>
          <Button type="link" size="small" className="btn-lgout" onClick={this.lgout}>
            退出登录
          </Button>
        </div>
        <div className="header-bottom">
           <span className="title">{ this.props.title || this.state.title }</span>
           <div className="data-info">
             <span className="data">{date}</span>
              <span className="weather">{weatherInfo.weather}</span>
              <span className="temp">
                温度:
                <span>{weatherInfo.minTemp}</span>
                ~
                <span>{weatherInfo.maxTemp}</span>
                </span>
           </div>
        </div>
      </header>
    )
  }
}
export default Header;
