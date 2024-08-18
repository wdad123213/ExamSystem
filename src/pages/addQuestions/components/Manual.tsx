import React from 'react'
import {
  Button,
  Form,
  Radio,
  Select,
  Space,
  Input,
  Checkbox,
  message
} from 'antd'
import { useEffect, useState } from 'react';
import { searchList, questionList } from '../../../server';
import { createQuestion } from '../../../server/index'/**  */
const { Option } = Select
interface TypeItem {
  name?: string,
  value?: string,
  _id?: string,
  label?: string
}

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

const Manual: React.FC = () => {
  const [form]=Form.useForm()
  const [subjectList, setSubjectList] = useState<{ value: number, label: string }[]>([])
  const [type, setType] = useState<string>('')
  const [typeList, setTypeList] = useState<TypeItem[]>()
  const [newClassify1, setNewClassify1] = useState<string[]>([])
  const getType = async () => {
    const res = await searchList()
    const typeListData = res.data.data.list;
    const li = typeListData?.map((v: { value: any; name: any; }) => ({
      value: v.value,
      label: v.name
    }));
    setTypeList(li)
  }
  const getSubject = () => {
    if (newClassify1) {
      const subject: { value: number, label: string }[] = newClassify1.map((v, index: number) => ({
        value: index + 1,
        label: v
      }));
      setSubjectList(subject)
    }
  }
  const getList = async (value: string = '') => {
    try {
      const res = await questionList(value);
      // console.log(res.data.data.list);
      const list = res.data.data.list;
      const classify: string[] = list.map((v: { classify: string; }) => {
        return v.classify
      })
      setNewClassify1([...new Set(classify)])
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  }
  useEffect(() => {
    getList()
    getType()
    console.log(subjectList)
  }, [])
  useEffect(() => {
    if (newClassify1) {
      getSubject();
    }
  }, [newClassify1])
  const onFinish = async (values: any) => {
    let res
    // 根据type的值来处理数据
    if (type === '1') {
      // 假设options数组需要包含每个选项的值和文本
      const options = [
        values.optionA,
        values.optionB,
        values.optionC,
        values.optionD
      ];
      const obj = {
        question: values.question,
        decs: values.decs,
        answer: values.options,
        classify: values.classify,
        type: values.type,
        options: options
      };
      res = await createQuestion(obj, Date.now())
    }
    if (type === '2') {
      const options = [
        values.optionA,
        values.optionB,
        values.optionC,
        values.optionD
      ];
      const obj = {
        question: values.question,
        decs: values.decs,
        answer: values.options.sort().join(','),
        classify: values.classify,
        type: values.type,
        options: options
      };

      res = await createQuestion(obj, Date.now())

    }
    if (type === '3') {
      const options = [
        '对',
        '错'];
      const obj = {
        question: values.question,
        decs: values.decs,
        answer: values.options,
        classify: values.classify,
        type: values.type,
        options: options
      };
      res = await createQuestion(obj, Date.now())

    }
    if (type === '4') {
      const obj = {
        question: values.question,
        decs: values.decs,
        answer: values.answer,
        classify: values.classify,
        type: values.type,
        options: values.option
      };
      res = await createQuestion(obj, Date.now())
    }
    if (res?.data.code === 200) {
      message.success('创建成功')
      form.resetFields();
    }

  }
  const typeSelect = (value: string, option: { value: any; }) => {
    console.log(value, option.value)
    setType(String(value))
  }
  const renderQuestionType = () => {
    switch (type) {
      case '1':
        return (
          <React.Fragment>
            <Radio.Group>
              <Space>
                <Radio value="A" >A</Radio>
                <Form.Item name="optionA" rules={[{ required: true, message: '选项A不能为空' }]}>
                  <Input />
                </Form.Item>
              </Space>
              <Space>
                <Radio value="B" >B</Radio>
                <Form.Item name="optionB" rules={[{ required: true, message: '选项B不能为空' }]}>
                  <Input />
                </Form.Item>
              </Space>
              <Space>
                <Radio value="C" >C</Radio>
                <Form.Item name="optionC" rules={[{ required: true, message: '选项C不能为空' }]}>
                  <Input />
                </Form.Item>
              </Space>
              <Space>
                <Radio value="D" >D</Radio>
                <Form.Item name="optionD" rules={[{ required: true, message: '选项D不能为空' }]}>
                  <Input />
                </Form.Item>
              </Space>
            </Radio.Group>
          </React.Fragment>
        );
        break
      case '2':
        return (
          <React.Fragment>
            <Checkbox.Group>
              <Space>
                <Checkbox value="A" >A</Checkbox>
                <Form.Item name="optionA" rules={[{ required: true, message: '选项A不能为空' }]}>
                  <Input />
                </Form.Item>
              </Space>
              <Space>
                <Checkbox value="B" >B</Checkbox>
                <Form.Item name="optionB" rules={[{ required: true, message: '选项B不能为空' }]}>
                  <Input />
                </Form.Item>
              </Space>
              <Space>
                <Checkbox value="C" >C</Checkbox>
                <Form.Item name="optionC" rules={[{ required: true, message: '选项C不能为空' }]}>
                  <Input />
                </Form.Item>
              </Space>
              <Space>
                <Checkbox value="D" >D</Checkbox>
                <Form.Item name="optionD" rules={[{ required: true, message: '选项D不能为空' }]}>
                  <Input />
                </Form.Item>
              </Space>
            </Checkbox.Group>
          </React.Fragment>
        )
        break
      case '3':
        return (
          <React.Fragment>
            <Radio.Group>
              <Space>
                <Radio value="对" >对</Radio>
              </Space>
              <Space>
                <Radio value="错" >错</Radio>
              </Space>
            </Radio.Group>
          </React.Fragment>
        )
        break
      case '4':
        return (
          <React.Fragment>
            <Radio.Group>
              <Space>
                <Form.Item name="answer" rules={[{ required: true, message: '回答不能为空' }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="option" rules={[{ required: true, message: '答案不能为空' }]}>
                  <Input addonBefore='答案' />
                </Form.Item>
              </Space>
            </Radio.Group>
          </React.Fragment>
        )
      default:
        return null;
    }
  };

  return (
    <Form
      {...formItemLayout}
      onFinish={onFinish}
      form={form}
      style={{ maxWidth: 600 }}

    >
      <Form.Item
        name="type"
        label="题型"
        hasFeedback
        rules={[{ required: true, message: '请输入题型' }]}
      >
        <Select
          onSelect={typeSelect}
          placeholder="选择题型">
          {
            typeList?.map((v, index) => {
              return <Option key={index + 1} value={v.value}>{v.label}</Option>
            })
          }
        </Select>
      </Form.Item>
      <Form.Item
        name="classify"
        label="分类"
        hasFeedback
        rules={[{ required: true, message: '请输入分类' }]}
      >
        <Select placeholder="选择科目">
          {
            newClassify1.map((v, index) => {
              return <Option key={index} value={v}>{v}</Option>
            })
          }

        </Select>
      </Form.Item>

      <Form.Item
        name="question"
        label="题目"
        rules={[{ required: true, message: '题目不能为空' }]}
      >
        <Input.TextArea showCount maxLength={100} placeholder='请输入题目' />
      </Form.Item>

      <Form.Item label="选项" name="options">
        {renderQuestionType()}
      </Form.Item>

      <Form.Item
        name="decs"
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