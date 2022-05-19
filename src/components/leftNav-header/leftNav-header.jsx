import React, { Component } from 'react'
import logo from '../../staic/imgs/logo.png'
import './css/leftNav-header.css'

export default class LeftNavHeader extends Component {
  render() {
    return (
      <div className='leftnav-header'>
        <img src={logo} alt="logo" />
        <h1>商品管理系统</h1>
      </div>
    )
  }
}
