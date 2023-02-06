import React from 'react'
import { Button, Checkbox, Form, Input } from 'antd';
import './Login.css'

function Login(props) {
  console.log(props);

  const onFinish = (values) => {
    console.log('Success登录成功:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed登录失败:', errorInfo);
  };

  return (
    <div style={{ background: 'rgb(35, 39, 65)', height: '100%' }}>
      <div className='login-container'>
        <div className='login-title'>全球博客发布管理系统</div>
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="账号"
            name="username"
            className='login-fromItem'
            rules={[
              {
                required: true,
                message: '请输入你的用户名!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            className='login-fromItem'
            rules={[
              {
                required: true,
                message: '请输入你的密码!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
          /* wrapperCol={{
            offset: 3,
          }} */
          >
            <Checkbox style={{ color: '#fff' }}>记住密码</Checkbox>
          </Form.Item>

          <Form.Item
          >
            <Button className='login-button' type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login