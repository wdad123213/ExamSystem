import React, {useEffect, useState} from "react"
import {Avatar, Button, Form, Input, message, Modal, Space, Switch, Table, Select, TableProps} from "antd"
import {PlusCircleOutlined} from "@ant-design/icons"
import style from './user.module.scss'
import Search from './compontents/Search.tsx'
import {UserListType, UserParams, userStateParams} from "../../types/api"
import {userCreateApi, userDelApi, userListApi, userStateApi} from "../../server"

interface FieldType {
  username: string
  password: string
  confirm: string
  status: 0 | 1
}

const User:React.FC = () => {
  const [data,setData] = useState<UserListType[]>([])
  const [total,setTotal] = useState(0)
  const [params,setParams] = useState({page: 1, pagesize: 10})
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm<userStateParams>()
  const [updateId, setUpdateId] = useState<string | null>(null)
  const [searchForm, setSearchForm] = useState<UserParams>({})
  // 获取数据
  const getUserList = async () => {
    const res = await userListApi({...params, ...searchForm})
    setData(res.data.data.list)
    setTotal(res.data.data.total)
  }
  useEffect(() => {
    getUserList()
  }, [params, searchForm])
  
  // 表格渲染
  const columns: TableProps<UserListType>['columns'] = [
    {
      title: '头像',
      width: 40,
      dataIndex: 'avator',
      key: 'avator',
      fixed: 'left',
      render: (_,rowKey) => {
        return (
            <Avatar
                size={40}
                style={{ backgroundColor: _ ? '#FFFFFF' : '#168AFB' }}
                src={_}
            >{rowKey.username && rowKey.username[0]}
            </Avatar>
        )
      }
    },
    {
      title: '启用状态',
      width: 50,
      dataIndex: 'status',
      key: 'status',
      fixed:'left',
      render:(_,rowKey) => {
        const onChange = async (checked: boolean) => {
          try {
            const res = await userStateApi({status:Number(checked),id:rowKey._id})
            if(res.data.code === 200){
              message.success('修改成功')
              getUserList()
            } else {
              message.error(res.data.msg)
            }
          }catch (e){
            console.log(e)
          }
        }
        return (
            <>
              {rowKey.username==='root'? <Switch checked={_} disabled onChange={onChange} /> : <Switch checked={_} onChange={onChange} />}
            </>
        )
      }
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: '1',
      width: 150,
    },
    {
      title: '密码',
      dataIndex: 'password',
      key: '2',
      width: 150,
    },
    {
      title: '最近登录',
      dataIndex: 'lastOnlineTime',
      key: '3',
      width: 150,
      render:(_) => {
        return <div>{_ ? new Date(_).toLocaleString() : '-'}</div>
      }
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: '4',
      width: 150,
    },
    {
      title: '操作',
      key: 'operation',
      fixed: 'right',
      width: 145,
      render: (_,rowKey) => {
        return <>
          {
            rowKey.username==='root' ?
                <Space>
                  <Button disabled type='primary'>分配角色</Button>
                  <Button disabled type='primary'>编辑</Button>
                  <Button disabled type='primary' danger>删除</Button>
                </Space> :
                <Space>
                  <Button type='primary'>分配角色</Button>
                  <Button
                      type='primary'
                      onClick={() => onEditUser(rowKey)}
                  >编辑</Button>
                  <Button type='primary' danger onClick={() => onDelUser(rowKey._id)}>删除</Button>
                </Space>
          }
        </>
      },
    }
  ]
  const showModal = () => {
    setOpen(true)
  }
  
  // 更新或新增框
  const handleOk = async () => {
    const value = await form.validateFields()
    if (updateId) {
      updateUser(value)
    } else {
      createUser(value)
    }
    setOpen(false)
  }
  
  // 新增
  const createUser = async (value: userStateParams) => {
    const res = await userCreateApi(value)
    if (res.data.code === 200) {
      message.success('创建成功！')
      setOpen(false)
      getUserList()
    } else {
      message.error(res.data.msg)
    }
  }
  
  // 更新
  const updateUser = async (value: userStateParams) => {
    const res = await userStateApi({
      ...value,
      id: updateId!,
    })
    if (res.data.code === 200) {
      message.success('更新成功！')
      setOpen(false)
      getUserList()
    } else {
      message.error(res.data.msg)
    }
  }
  
  // 小窗关闭执行
  const handleCancel = () => {
    setOpen(false)
  }
  
  // 点击编辑
  const onEditUser = (item:UserListType) => {
    setUpdateId(item._id)
    form.setFieldsValue({...item, confirm : item.password})
    showModal()
  }
  
  // 小窗关闭清空表单
  useEffect(() => {
    if (!open) {
      form.resetFields()
      setUpdateId(null)
    }
  }, [open])
  
  // 删除
  const onDelUser = async (id:string) => {
    try {
      const res = await userDelApi(id)
      if(res.data.code === 200){
        message.success('删除成功')
        getUserList()
      } else {
        message.error(res.data.msg)
      }
    }catch (e){
      console.log(e)
    }
  }
  
  // 搜索
  const onSearch = (value:UserParams) => {
    console.log('要搜索的内容', value)
    setSearchForm(value)
  }
  
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
  }
  return (
      <div className={style.user}>
          <Button type='primary' style={{marginBottom:20}} onClick={() => setOpen(true)}>
            <PlusCircleOutlined />添加用户
          </Button>
          <Search onSearch={onSearch}/>
          <Table
              columns={columns}
              dataSource={data}
              rowKey="_id"
              scroll={{x:1500}}
              pagination={{
                current: params.page,
                pageSize: params.pagesize,
                showQuickJumper: true,
                total,
                showTotal: (total, range) => {
                  return (
                      <Space>
                        <span>共 {total} 条</span>
                        <span>{range[0]} - {range[1]}</span>
                      </Space>
                  )
                },
                onChange: (page, pagesize) => {
                  setParams({
                    page,
                    pagesize
                  })
                }
              }}
          />
          <Modal open={open} title={updateId ? '编辑' : '新增'} onOk={handleOk} onCancel={handleCancel} okText="确认" cancelText="取消">
            <Form
                {...formItemLayout}
                form={form}
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
                  label="性别"
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
          </Modal>
      </div>
  )
}

export default User