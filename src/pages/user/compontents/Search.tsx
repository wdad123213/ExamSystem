import React from 'react'
import {Button, Form, Input, Select, Space} from 'antd'
import {UserParams} from "../../../types/api"

const { Option } = Select
type PropsType = {
  onSearch: (value: UserParams)=>void
}

const Search:React.FC<PropsType> = (props) => {
  
  const formItemLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
  }
  
  const onFinish = (values: UserParams) => {
    props.onSearch(values)
  }
  
  const onReset = () => {
    props.onSearch({})
  }
  
  return (
      <div>
        <Form
            {...formItemLayout}
            onFinish={onFinish}
        >
          <Space style={{width:1500,justifyContent:"space-between"}}>
            <Space>
              <Form.Item name="status" label="启用状态">
                <Select placeholder='请选择' style={{width:150}}>
                  <Option value={1}>启用</Option>
                  <Option value={0}>禁用</Option>
                </Select>
              </Form.Item>
              <Form.Item name="username" label="用户名">
                <Input type="text" style={{width:150}}/>
              </Form.Item>
            </Space>
            <Form.Item>
              <Space>
                <Button htmlType="reset" onClick={onReset}>重置</Button>
                <Button type="primary" htmlType="submit">查询</Button>
              </Space>
            </Form.Item>
          </Space>
        </Form>
      </div>
  )
}


export default Search