import React, {useEffect, useState} from 'react';
import { Descriptions } from 'antd'
import {UserUpdataParams} from "../../types/api"
import {useAppDispatch, useAppSelector} from "../../hooks/store.ts"
import {getUserInfo} from "../../store/models/userStore.ts"

// 格式化用户信息
const formatUserList = (obj:UserUpdataParams) => {
  const arr = [['用户名称','username'],['性别','sex'],['年龄','age'],['邮箱地址','email']]
  const res:Record<'key' | 'label'| 'children', string>[] = []
  arr.forEach((v, i) => {
    res[i] = {
      children: obj[v[1]] + '',
      key: i + '',
      label: v[0]
    }
  })
  return res
}

const UserInfo:React.FC = () => {
  const userInfo = useAppSelector(state => state.user.userInfo)
  console.log(userInfo)
  const dispatch = useAppDispatch()
  const [userList,setUserList] = useState<Record<'key' | 'label'| 'children', string>[]>([])
  
  useEffect(() => {
    dispatch(getUserInfo())
  }, [])
  
  useEffect(() => {
    setUserList(formatUserList(userInfo))
  },[userInfo])
  
  return <Descriptions items={userList} />
}


export default UserInfo