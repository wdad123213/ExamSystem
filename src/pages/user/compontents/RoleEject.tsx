import React from 'react'
import {Form, FormInstance, Select} from "antd"
import {OptionItem} from "../../../types/api"

interface PropsType{
  form: FormInstance<string>
  visibility: boolean
  option:OptionItem[]
}

const RoleEject:React.FC<PropsType> = (props) => {
  return (
      <Form form={props.form}>
        <Form.Item
            label="分配角色"
            name="status"
            rules={[{ required: true, message: '请选择用户角色!' }]}
        >
          <Select
              placeholder="请选择用户角色"
              allowClear
              style={{width:200}}
              options={props.option}
              mode="tags"
          />
        </Form.Item>
      </Form>
  )
}

export default RoleEject