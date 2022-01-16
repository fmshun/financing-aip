import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox,Modal} from 'antd';
import avatarbanner from '../../assets/image/banner.jpg';
import qq from '../../assets/image/QQfill.png';
import nextIcon from '../../assets/image/next.png';
import weixin from '../../assets/image/weixin.png';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { login } from '../../components/nav/server';
import '../../assets/css/login.css';

var sectionStyle = {
  width: "900px",
  height: "475px",
  // makesure here is String确保这里是一个字符串，以下是es6写法
  backgroundImage: `url(${avatarbanner})`,
  backgroundSize: "cover"
};
var flexLine ={
  display:"flex"
}


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true,
      // display: 'block',
      accountdisplay:'block',
      // setcolor: '#E4393c',
      accountcolor:'#E4393c',
      username: '', //用户名
      password: '' //密码
    };
    //手动绑定
    this.handleClick = this.handleClick.bind(this);
    this.accountClick = this.accountClick.bind(this);
    this.onFinish = this.onFinish.bind(this);
    this.onFinishFailed = this.onFinishFailed.bind(this);
  }


  // 这个绑定是必要的，使`this`在回调中起作用
  handleClick(){
    // console.log("触发事件")
    this.setState(prevState => ({
      isToggleOn: false,
      display: 'block',
      accountdisplay:'none',
      setcolor:'#E4393c',
      accountcolor:'#666'
    }));
  }
  //表单校验成功
  onFinish(forms){
     //登录请求
      var param={
        user_name:forms.username,
        password:forms.password
      }
      //登录调接口
      const fetchData = async () => {
        // debugger
        const r = await login(param);
        if (r.code === 0) {
            //成功
            Modal.success({
              title: "登录成功!",
            });
            //成功之后跳转首页
            this.props.history.push('/');
        } else {
            Modal.error({
                title: r.msg,
            });
        }
    };
    fetchData(); 
  }
 

  //表单校验未通过
  onFinishFailed(){

  }

  //账户切换
  accountClick(){
    this.setState(prevState => ({
      isToggleOn: true,
      display: 'none',
      accountdisplay: 'block',
      setcolor: '#666',
      accountcolor:'#E4393c'
    }));
  }

  render() {
    return (
      <div id="login">
        <div className='header'>
          <div className="middle_text"><h2>欢迎登录</h2></div>
        </div>
        <div className='container'>
          <div className="tips-wrapper">
            <ExclamationCircleOutlined style={{ color: '#bdbdbd' }} />
            <p>依据《网络安全法》，为保障您的账户安全和正常使用，请尽快完成手机号验证！</p>
          </div>
        </div>
        <div className='login-banner'>
          <div className="login_form" style={sectionStyle}>
            <div className='rightform'>
              <div className='tips-wrapper'> <i><ExclamationCircleOutlined style={{ color: '#bdbdbd' }} /></i><p>XX不会以任何理由要求您转账汇款，谨防诈骗。</p></div>
              <div className='wrapper-title'>
                {/* <div className='w_text' style={{color: this.state.setcolor}} onClick={this.handleClick}>扫码登录</div> */}
                <div className='w_text' style={{color: this.state.accountcolor}} onClick={this.accountClick}>账户登录</div>
              </div>
              <div style={{display: this.state.display}} className='descode'>
                 {/* 扫码部分暂无 */} 
              </div>
              <div style={{display: this.state.accountdisplay}}>
                  <Form
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 17 }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                  >
                    <Form.Item
                      label="用户名"
                      // value={this.state.username}
                      name="username"
                      rules={[{ required: true, message: '用户名不能为空!' }]}
                    >
                      <Input />
                    </Form.Item>
    
                    <Form.Item
                      label="密码"
                      name="password"
                      // value={this.state.password}
                      rules={[{ required: true, message: '密码不能为空!' }]}
                    >
                      <Input.Password />
                    </Form.Item>
    
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        登录
                      </Button>
                    </Form.Item>
                  </Form>
              </div>
              <div className='bottomsection'>
                <div className='center_text'>
                  <div style={flexLine} className='labeltext'>
                      <div><img src={qq} alt="" className='qqstyle'/></div>
                      <div className='label'>QQ</div>
                      <div className='lines'></div>
                      <div><img src={weixin} alt="" className='qqstyle'/></div>
                      <div className='label'>微信</div>
                  </div>
                  <div style={flexLine}>
                     <div><img src={nextIcon} alt="" className='nextstyle'/></div>
                     <div className='logintext'>立即注册</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='footer'>
          <ul>
           <li>关于我们</li>
           <li>联系我们</li>
           <li>人才招聘</li>
           <li>商家入驻</li>
           <li>广告服务</li>
           <li>销售联盟</li>
           <li>English Site</li>
          </ul>
        </div>
        <div className='copytext'>Copyright © 2004-2021  xxx.com 版权所有</div>
      </div>
    )
  }
}



export default Login;
