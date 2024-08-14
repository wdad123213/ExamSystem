import React from 'react'
import { Steps , DatePicker, Space,Input, AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
   TimePicker,
  
  InputNumber,
  Row,
  Select,} from 'antd';
import {createExam} from '../../types/api'
import type { CascaderProps } from 'antd';
const { RangePicker } = DatePicker;

interface DataNodeType {
  value: string;
  label: string;
}

const { Option } = Select;
const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  const residences: CascaderProps<DataNodeType>['options'] = [
    {
      value: '数学',
      label: '数学',
      
    },
    {
      value: '英语',
      label: '英语',
     
    },
    {
      value: '地理',
      label: '地理',
     
    },
  ];
  const examiner:CascaderProps<DataNodeType>['options'] = [
    {
      value: '吴江',
      label: '吴江',
      
    },
    {
      value: '叶一耶',
      label: '叶一耶',
     
    },
    {
      value: 'root',
      label: 'root',
     
    },

  ]
  const group:CascaderProps<DataNodeType>['options'] = [
    {
      value: 'rooter',
      label: 'rooter',
      
    },
    {
      value: '一班',
      label: '一班',
     
    },
    {
      value: '六班',
      label: '六班',
     
    },

  ]

  const rangeConfig = {
    rules: [{ type: 'array' as const, required: true, message: 'Please select time!' }],
  };
// const { RangePicker } = DatePicker;
// const description = 'This is a description.';
const CreateExam:React.FC = () => {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  
  return (
    <div>
      <Steps
        current={0}
        initial={0}
        items={[
          {
            title: '考试基本信息',
      
          },
          {
            title: '配置试卷',
            
          },
          {
            title: '发布考试',
          
          },
        ]}
      />
      <div>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        // initialValues={{ residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: '86' }}
        style={{ maxWidth: 600 }}
        scrollToFirstError
      >
      <Form.Item
          name="name"
          label="考试名称"
          rules={[

            {
              required: true,
              message: '此项为必填项!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item 
          name="range-time-picker" 
          label="考试时间" 
          rules={[{ type: 'array' as const, required: true, message: '此项为必填项!' }]}
        >
          <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>
        <Form.Item
          name="classify"
          label="考试科目"
          rules={[
            { 
              // type: 'array', 
              required: true, 
              message: '此项为必填项!' },
          ]}
        >
          <Cascader options={residences} />
        </Form.Item>
        <Form.Item
          name="examiner"
          label="监考人"
          rules={[
            { 
              // type: 'array', 
              required: true, 
              message: '此项为必填项!' },
          ]}
        >
          <Cascader options={examiner} />
        </Form.Item>
        <Form.Item
          name="group"
          label="考试班级"
          rules={[
            { 
              // type: 'array', 
              required: true, 
              message: '此项为必填项!' },
          ]}
        >
          <Cascader options={group} />
        </Form.Item>
      </Form>
        

      </div>
      
    </div>
  )
}

export default CreateExam
