import React from 'react'
import {Button, Form, Space, Upload} from "antd";
import {InboxOutlined} from "@ant-design/icons"


const Batch:React.FC = () => {
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  }
  
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  }
  
  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  }
  return (
      <div>
        <Form
            {...formItemLayout}
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
        >
          <Form.Item label="Dragger">
            <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
              <Upload.Dragger name="files" action="/upload.do">
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">Support for a single or bulk upload.</p>
              </Upload.Dragger>
            </Form.Item>
          </Form.Item>
          
          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Space>
              <Button htmlType="reset">重置</Button>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
  )
}

export default Batch