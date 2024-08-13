import React from 'react'
import {
  Button,
  Form,
  Radio,
  Select,
  Space,
  Input
} from 'antd'

const { Option } = Select

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

const onFinish = (values: any) => {
  console.log('Received values of form: ', values);
}

const Manual:React.FC = () => {
  return (
      <Form
          {...formItemLayout}
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
      >
        <Form.Item
            name="questions"
            label="题型"
            hasFeedback
            rules={[{ required: true, message: '请输入题型' }]}
        >
          <Select placeholder="选择题型">
            <Option value="china">China</Option>
            <Option value="usa">U.S.A</Option>
          </Select>
        </Form.Item>
        
        <Form.Item
            name="classify"
            label="分类"
            hasFeedback
            rules={[{ required: true, message: '请输入分类' }]}
        >
          <Select placeholder="选择科目">
            <Option value="china">China</Option>
            <Option value="usa">U.S.A</Option>
          </Select>
        </Form.Item>
        
        <Form.Item
            name="topic"
            label="题目"
            rules={[{ required: true, message: '题目不能为空' }]}
        >
          <Input.TextArea showCount maxLength={100} placeholder='请输入题目' />
        </Form.Item>
        
        <Form.Item name="answer" label="选项" rules={[{ required: true, message: '答案不能为空' }]}>
          <Radio.Group>
            <Space>
              <Radio value="a">A</Radio>
              <Form.Item name="optainA" rules={[{ required: true, message: '选项不能为空' }]}>
                <Input />
              </Form.Item>
            </Space>
            <Space>
              <Radio value="b">B</Radio>
              <Form.Item name="optainB" rules={[{ required: true, message: '选项不能为空' }]}>
                <Input />
              </Form.Item>
            </Space>
            <Space>
              <Radio value="c">C</Radio>
              <Form.Item name="optainC" rules={[{ required: true, message: '选项不能为空' }]}>
                <Input />
              </Form.Item>
            </Space>
            <Space>
              <Radio value="d">D</Radio>
              <Form.Item name="optainD" rules={[{ required: true, message: '选项不能为空' }]}>
                <Input />
              </Form.Item>
            </Space>
          </Radio.Group>
        </Form.Item>
        
        <Form.Item
            name="parse"
            label="解析"
        >
          <Input.TextArea showCount maxLength={100} placeholder='请输入' />
        </Form.Item>
        
        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Space>
            <Button htmlType="reset">重置</Button>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Button>返回</Button>
          </Space>
        </Form.Item>
      </Form>
  )
}

export default Manual