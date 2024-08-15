import React, { useEffect, useState }  from 'react'
import { Steps, DatePicker, Input, Button, Cascader, Form, } from 'antd';
import { Value } from 'sass';
import type { CascaderProps } from 'antd';
import {examListApi } from '../../../../server';


type propstype ={
    nextPage:()=>void
    getexamPage:(e: any) => void
    setCreFrom:(e: any)=>void
  
}

const { RangePicker } = DatePicker;


const createFrom:React.FC<propstype> = ( props) => {
    const [allClassify,setAllClassify] = useState('')
    const awlist = async () => {
        const res = await examListApi()
        setAllClassify([...new Set((res.data.data.list).map((item: { classify:string; })=>item.classify))])
        // console.log([new Set((res.data.data.list).map((item: { classify: string; })=>item.classify))])
        // const newArr = [res.data.data.list]
        
    }
  interface DataNodeType {
    value: string;
    label: string;
    }

    const tailFormItemLayout = {
    wrapperCol: {
        xs: {
        span: 20,
        offset: 0,
        },
        sm: {
        span: 16,
        offset: 8,
        },
    },
    };

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
    // const initvalve =[
    //    { 
    //     value: '',
    //     label: '',
    //     }

    // ]

    // const arr =()=>{
    //     allClassify.map(item=>{
    //         initvalve.value:item
    //         initvalve[label]:item
    //         })

    // }

    const residences: CascaderProps<DataNodeType>['options'] = [
    // allClassify.map(item=>{
        
    //     // value: item,
    //     // label: item,

    // })
    {
        value: '英语',
        label: '英语',

    },
    
    
    ];
    const examiner: CascaderProps<DataNodeType>['options'] = [
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
    const group: CascaderProps<DataNodeType>['options'] = [
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

  useEffect(()=>{
    awlist()
  },[])



    
  const [form] = Form.useForm();
 


  // 点击下一页
  const onFinish = (values: any) => {
    console.log('输入内容 ', values);
    props.setCreFrom(values)
    props.getexamPage(values)
    console.log(Object.values(values)[2])
    console.log(Object.keys(values)[2])
    console.log(Object.entries(values))
    // console.log(Object.values(classify))
    if (values) {
        props.nextPage()
    }
  };
  return (
    <div>
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
            name="time"
            label="考试时间"
            rules={[{ type: 'array' as const, required: true, message: '此项为必填项!' }]}
          >
            <RangePicker showTime />
          </Form.Item>
          <Form.Item
            name="classify"
            label="考试科目"
            rules={[
              {
                // type: 'array', 
                required: true,
                message: '此项为必填项!'
              },
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
                message: '此项为必填项!'
              },
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
                message: '此项为必填项!'
              },
            ]}
          >
            <Cascader options={group} />
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button
              type="primary"
              htmlType="submit"
              // onClick={()=>{
              //   props.setCreFrom(Value)
              //   console.log(Value)
              // }
              // }
            >
              下一页
            </Button>
          </Form.Item>
        </Form>


      </div>
    </div>
  )
}

export default createFrom
