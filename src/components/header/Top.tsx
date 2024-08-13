import React,{useEffect} from 'react'
import { useAppSelector,useAppDispatch } from '../../hooks/store'
import style from './top.module.scss'
import { Space, Avatar, Dropdown } from "antd"
import type { MenuProps } from 'antd'
import { DownOutlined, SettingOutlined, PoweroffOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import {getUserInfo} from "../../store/models/userStore.ts"

const Top:React.FC<{setCurpage:() => void}> = (props) => {
  const userInfo = useAppSelector(state => state.user.userInfo)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }
  useEffect(() => {
    dispatch(getUserInfo())
  },[])
  const items: MenuProps['items'] = [
    {
      key: '3',
      label: <span onClick={props.setCurpage}>用户设置</span>,
      icon: <SettingOutlined />,
    },
    {
      key: '4',
      danger: true,
      icon: <PoweroffOutlined />,
      label: <span onClick={logout}>退出登录</span>,
    }
  ]
  
  return (
      <div className={style.header}>
        <div className={style.logo}>
          <img height={40} src="../../../public/examSystem.png" alt="" />
        </div>
        <Space>
          <Avatar
            size={40}
            style={{ backgroundColor: userInfo.avator ? '#FFFFFF' : '#168AFB' }}
            src={userInfo.avator}
          >{userInfo.username && userInfo.username[0]}</Avatar>
          
          <div style={{marginTop:"10px"}}>
            <Dropdown menu={{ items }} autoAdjustOverflow={true}>
              <div style={{marginBottom:"10px"}}>
                <span style={{fontSize: 14}}>
                  <Space>
                    {userInfo.username}
                    <DownOutlined/>
                  </Space>
                </span>
              </div>
            </Dropdown>
          </div>
        </Space>
      </div>
  )
}

export default Top