import React from 'react'
import {Form, FormInstance, Input, Select} from "antd"
import {UserUpdataParams} from "../../../types/api"

interface PropsType {
  form: FormInstance<UserUpdataParams>
}

const UserForm:React.FC<PropsType> = (props) => {
  return (
    <Form form={props.form}>
      <Form.Item name="username" label="用户名" rules={[{ required: true, message: '请输入用户名!' }]}>
        <Input type="text" style={{width:200}} />
      </Form.Item>
      <Form.Item name="sex" label="性别" rules={[{ required: true, message: '请选择性别!' }]}>
        <Select
            placeholder="性别"
            allowClear
            style={{width:200}}
            options={[
              {
                value: '男',
                label: '男'
              },
              {
                value: '女',
                label: '女'
              }
            ]}
        />
      </Form.Item>
      <Form.Item name="age" label="年龄" dependencies={['password']} rules={[{ required: true, message: '请输入年龄!' }]}>
        <Input type="number" style={{width:200}} />
      </Form.Item>
      <Form.Item name="email" label="邮箱" rules={[{ required: true, message: '请输入邮箱!' }]}>
        <Input style={{width:200}} />
      </Form.Item>
    </Form>
  )
}

export default UserForm