import React from 'react'
import {Form, FormInstance, Input} from "antd"
import {RoleCreateParams} from "../../../types/api";

type PropsType = {
  form: FormInstance<RoleCreateParams>
}

const RoleAddForm:React.FC<PropsType> = (props) => {
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
  }
  return (
      <div>
        <Form {...formItemLayout} form={props.form}>
          <Form.Item name='name' label='角色名称' rules={[{ required: true, message: '请输入角色名称!' }]}>
            <Input type='text' />
          </Form.Item>
          <Form.Item name='value' label='角色关键字' rules={[{ required: true, message: '请输入角色关键字!' }]}>
            <Input type='text' />
          </Form.Item>
        </Form>
      </div>
  )
}

export default RoleAddForm