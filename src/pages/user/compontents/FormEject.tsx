import React from 'react'
import {Form, FormInstance, Input, Select} from "antd"
import {userStateParams} from "../../../types/api"

interface FieldType {
  username: string
  password: string
  confirm: string
  status: 0 | 1
}
interface PropsType {
  form: FormInstance<userStateParams>
}

const FormEject:React.FC<PropsType> = props => {
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
  }
  
  return (
      <div>
        <Form
            {...formItemLayout}
            form={props.form}
        >
          <Form.Item<FieldType> name="username" label="用户名" rules={[{ required: true, message: '请输入用户名!' }]}>
            <Input type="text" style={{width:200}} />
          </Form.Item>
          <Form.Item<FieldType> name="password" label="密码" rules={[{ required: true, message: '请输入密码!' }]}>
            <Input.Password  style={{width:200}} />
          </Form.Item>
          <Form.Item<FieldType> name="confirm" label="确认密码" dependencies={['password']}
                                rules={
                                  [
                                    { required: true, message: '请再次输入密码!' },
                                    ({ getFieldValue }) => ({
                                      validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                          return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('两次密码不一致!'));
                                      },
                                    })
                                  ]
                                }>
            <Input.Password  style={{width:200}} />
          </Form.Item>
          <Form.Item<FieldType>
              label="是否启用"
              name="status"
              rules={[{ required: true, message: '请选择是否启用!' }]}
          >
            <Select
                placeholder="是否启用"
                allowClear
                style={{width:200}}
                options={[
                  {
                    value: 1,
                    label: '启用'
                  },
                  {
                    value: 0,
                    label: '禁用'
                  }
                ]}
            ></Select>
          </Form.Item>
        </Form>
      </div>
  )
}

export default FormEject;