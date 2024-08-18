import React, {  useState } from 'react'
import style from './login.module.scss'
import { Button,  Flex, } from 'antd';
import LoginSudent from './comment/LoginSudent';
import LoginTeach from './comment/LoginTeach';


const Login:React.FC = () => {

  const [isteach, setisteach] = useState<boolean>(true)

  return (
    <div className={style.login}>
      <div className={style.Select}>
        <Flex gap="middle" wrap
        >
          <Button 
          type="primary"
          autoInsertSpace={false} 
          style={{ backgroundColor: isteach ? 'skyblue' : 'red' }}
          // defaultActiveBorderColor = #aaa
          // defaultActiveBg:string= '#ffffff'
          onClick={()=>setisteach(false)}>
          我是学生
          </Button>
          <Button 
          type="primary" 
          style={{ backgroundColor: isteach ? 'red' : 'skyblue' }}
          autoInsertSpace onClick={()=>setisteach(true)}>
          我是老师
          </Button>
        </Flex>
      </div>
      <div className={style.from}>
        {!isteach?
        <LoginSudent />
        :
        <LoginTeach />

        }
      </div>
 
    </div>
  )
}

export default Login;