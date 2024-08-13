import React,{useEffect, useState}from 'react'
import { UserOutlined,EyeInvisibleOutlined, EyeTwoTone ,LockOutlined} from '@ant-design/icons';
import { Button,  Form, Input,Space,message} from 'antd';
import {useNavigate,Navigate} from 'react-router-dom'
import {LoginParams} from '../../../types/api'
import {captchaApi,loginApi} from '../../../server/index'
const LoginSudent:React.FC = () => {
    const navigate = useNavigate()
    const [img,setImg] = useState('')

    const onFinish =  async (values: LoginParams) => {
        
        console.log( values)
        try{
          const res = await loginApi(values)
          let redirectUrl = localStorage.getItem('redirectUrl')
    
          console.log(res.data)
          if(res.data.code===200){
            console.log(res)
            localStorage.setItem('token',res.data.data.token)
            // navigate('/')
            if (redirectUrl) {
              redirectUrl = redirectUrl || '/';
              // localStorage.removeItem('redirectUrl');
              return <Navigate to={redirectUrl} />
            }
          }
          if(res.data.code===1005){
            message.error(res.data.msg)
            getCode()
          }
          if(res.data.code===1002){
            message.error(res.data.msg)
            getCode()
          }
        }catch(e){
          console.log(e)
          // message.error('错误')
        } 
    };
    const getCode = async()=>{
        const res = await captchaApi() 
        console.log(res)
        setImg(res.data.data.code)
    }
    useEffect(()=>{
        getCode()
    },[])

     
  return (
    <div >
    <Form
    name="login"
    initialValues={{ remember: true }}
    style={{ maxWidth: 360 }}
    onFinish={onFinish}
    // className={style.from}
    > 
    
    <Form.Item
        name="username"
        rules={[{ required: true, message: '请输入你的名字' }]}
    >
        <Input prefix={<UserOutlined />} placeholder="用户名" />
    </Form.Item>
    <Form.Item
        name="password"
        rules={[{ required: true, message: '请输入密码!' }]}
        // autocomplete="username"
    >
        <Input.Password
        placeholder="密码"
        // current-password='123'
        
        
        prefix={<LockOutlined /> }
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />

    </Form.Item>
    <Form.Item
        name="code"
        rules={[{ required: true, message: '请输入验证码!' }]}
    >
    
        
        <Form.Item>
            <Space>
            <Input
                placeholder="验证码"
            />
            <div>
                <img src={img} alt="" 
                onClick={getCode}/>
            </div>
            </Space>
        </Form.Item>
    
        
    </Form.Item>
    <Form.Item>
        <Button block type="primary" htmlType="submit">
        登录
        </Button>
    
    </Form.Item>
 </Form>
  
</div>
  )
}

export default LoginSudent
