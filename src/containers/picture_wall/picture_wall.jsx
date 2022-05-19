import React, { Component } from 'react'
import { Upload, Icon, Modal, message } from 'antd';
import {BASE_URL} from '../../config/config'
import {detelePicReq} from '../../api'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends Component {
  state = {
    previewVisible: false, //是否展示预览窗
    previewImage: '',  //要展示图片的URL地址或者base64编码
    fileList: [],
  };

  //关闭预览窗
  handleCancel = () => this.setState({ previewVisible: false });

  //展示预览窗
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  //当前图片状态发生改变的回调
  handleChange = async({file,fileList }) => {
    //更改图片的名字和URL为服务器返回的
    if(file.status === 'done'){
      fileList[fileList.length-1].url = file.response.data.url
      fileList[fileList.length-1].name = file.response.data.name
    }
    //在服务器中删除图片
    if(file.status ==='removed'){
      let result = await detelePicReq(file.name)
      if(result.status === 0) message.success('删除图片成功')
      else message('删除图片失败')
    }
    this.setState({ fileList });
  }

  //获取所有上传成功图片的图片名
  getImgArr = ()=>{
    let imgs = []
    let {fileList} = this.state
    fileList.forEach((item)=>{
      imgs.push(item.name)
    })
    return imgs
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action={`${BASE_URL}/manage/img/upload`} //接收图片的服务器地址
          method='POST'  //发送请求的方式
          name='image' //发给服务器携带参数key的名字
          listType="picture-card" //照片墙的展示方式
          fileList={fileList}     //图片列表
          onPreview={this.handlePreview} //点击预览按钮的回调
          onChange={this.handleChange}  //图片状态改变的回调(图片上传中,被删除,成功上传)
        >
          {fileList.length >= 4 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
