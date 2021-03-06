import React from 'react';
import { Form, Input, Button } from 'antd';
import socket from '../../utils/config/socket';
import userRegister from '../../utils/userRegister';
import './styles.scss';

interface LoginPageProps {
  setRegisterError: React.Dispatch<React.SetStateAction<string>>
}

const LoginPage = (props: LoginPageProps) => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
        userRegister({
          email: values.email,
          password: values.password,
          password2: values.password2,
          username: values.username
        })
      };
    
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };
    
      socket.on('accountExistsAlready', ()=>{ 
        console.log('accountExistsAlready')
        props.setRegisterError('Sorry the Username or Email is already in use!')
      })


    return (
  <div className="register-wrapper">
    <Form
      name="normal_login"
      className="login-form"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onValuesChange={() => props.setRegisterError('')}
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
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
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

      
      <Form.Item
        label="Repeat password"
        name="password2"
        rules={[{ required: true, message: 'Please repeat your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  </div>
    )
}

export default LoginPage;