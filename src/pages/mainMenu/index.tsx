import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Alert } from 'antd';
import socket from '../../utils/config/socket';
import userLogin from '../../utils/userLogin';
import './styles.scss';
import 'antd/dist/antd.css';


const MainMenu = () => {

  const [ loginError, setLoginError ] = useState('')

  const onFinish = (values: any) => {
    console.log('Success:', values);
    userLogin({
      email: values.email,
      password: values.password,
    }, setLoginError)
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  socket.on('incorrectLoginData', ()=>{ 
    console.log('incorrectLoginData')
    setLoginError('Information you provided is incorrect please re-check your email and password and try again!')
  })

  return (
    <div>
      <div>
        {loginError ? 
          <Alert 
            message={loginError} 
            type="error" 
            showIcon 
            closable
          /> 
        : '' }
      </div>
      <div className="login-wrapper">
        <Form
          name="normal_login"
          className="login-form"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onValuesChange={() => setLoginError('')}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default MainMenu;
