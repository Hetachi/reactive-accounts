import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import socket from '../../utils/config/socket';
import userLogin from '../../utils/userLogin';
import './styles.scss';

interface LoginPageProps {
    setLoginError: React.Dispatch<React.SetStateAction<string>>
}

const LoginPage = (props: LoginPageProps) => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
        userLogin({
          email: values.email,
          password: values.password,
        }, props.setLoginError)
      };
    
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };
    
      socket.on('incorrectLoginData', ()=>{ 
        console.log('incorrectLoginData')
        props.setLoginError('Information you provided is incorrect please re-check your email and password and try again!')
      })


    return (
  <div className="login-wrapper">
    <Form
      name="normal_login"
      className="login-form"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onValuesChange={() => props.setLoginError('')}
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
    )
}

export default LoginPage;