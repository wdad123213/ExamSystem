import React, { useEffect, useState }  from 'react'
import { DatePicker, Input, Button,  Form, Select} from 'antd';
import type { CascaderProps } from 'antd';
import {examListApi } from '../../../../server';


type propstype ={
    nextPage:()=>void
    getexamPage:(e: any) => void
    setCreFrom:(e: any)=>void
  
}

const { RangePicker } = DatePicker;


const createFrom:React.FC<propstype> = ( props) => {
  const [allClassify,setAllClassify]= useState<DataNodeType[]> ([])
  const [allExaminer,setAllExaminer] = useState<DataNodeType[]> ([])
  const [allGroup,setAllGroup] = useState<DataNodeType[]> ([])
  const awlist = async () => {
      const res = await examListApi()
      let list = res.data.data.list
      console.log(list)
      let map:any = {}
      let next:any = {}
      let group:any ={}
      list.forEach((v: {
        [x: string]: string; classify: string; }) =>{
        map[v.classify] = {
          lable : v.classify,
          value : v.classify,
          // isLeaf: false,
        }
        next[v.examiner] = {
          lable : v.examiner[0],
          value : v.examiner[0],
        }
        group[v.group] = {
          lable : v.group[0],
          value : v.group[0],
        }
      })
      setAllClassify(Object.values(map))
      setAllExaminer(Object.values(next))
      setAllGroup(Object.values(group))
  }
 console .log(allClassify,allGroup)

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

  const residences: CascaderProps<DataNodeType>['options'] = allClassify;
  const examiner: CascaderProps<DataNodeType>['options'] = allExaminer
  const group: CascaderProps<DataNodeType>['options'] = allGroup


  useEffect(()=>{
    awlist()
  },[])



    
  const [form] = Form.useForm();
 


  // 点击下一页
  const onFinish = (values: any) => {
    console.log('输入内容 ', values);
    props.setCreFrom(values)
    props.getexamPage(values)
    if (values) {
        props.nextPage()
    }
  };
  useEffect(()=>{

  },[])

  return (
    <div>
      <div>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
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
                // filterOption :false
                // type: 'array', 
                required: true,
                message: '此项为必填项!'
              },
            ]}
          >
            <Select
               showSearch
                options={residences}
            />
          </Form.Item>
          <Form.Item
            name="examiner"
            label="监考人"
            rules={[
              {
                required: true,
                message: '此项为必填项!'
              },
            ]}
          >
            <Select options={examiner} />
          </Form.Item>
          <Form.Item
            name="group"
            label="考试班级"
            rules={[
              {
                required: true,
                message: '此项为必填项!'
              },
            ]}
          >
            <Select options={group} />
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button
              type="primary"
              htmlType="submit"
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
