import React, {useEffect, useState} from "react"
import {Button, Form, message, Modal} from "antd"
import {ExclamationCircleFilled, PlusCircleOutlined} from "@ant-design/icons"
import style from './user.module.scss'
import Search from './compontents/Search.tsx'
import {OptionItem, RoleItemType, UserListType, UserParams, userStateParams} from "../../types/api"
import {userCreateApi, userDelApi, userListApi, userRoleList, userStateApi} from "../../server"
import FormEject from "./compontents/FormEject.tsx"
import UserList from "./compontents/UserList.tsx"
import RoleEject from "./compontents/RoleEject.tsx";

const User:React.FC = () => {
  const [data,setData] = useState<UserListType[]>([])
  const [total,setTotal] = useState(0)
  const [params,setParams] = useState({page: 1, pagesize: 10})
  const [open, setOpen] = useState(false)
  const [form] = Form.useForm<userStateParams>()
  const [updateId, setUpdateId] = useState<string | null>(null)
  const [searchForm, setSearchForm] = useState<UserParams>({})
  const [visibility, setVisibility] = useState(false)
  const [roleForm] = Form.useForm<string>()
  const [roleList,setRoleList] = useState<OptionItem[]>([])
  // 获取数据
  const getUserList = async () => {
    const res = await userListApi({...params, ...searchForm})
    setData(res.data.data.list)
    setTotal(res.data.data.total)
  }
  useEffect(() => {
    getUserList()
  }, [params, searchForm])
  
  // 获取角色选项
  const getOptions = async () => {
    const res = await userRoleList()
    const option:OptionItem[] = []
    res.data.data.list.forEach((v:RoleItemType,i:number) => {
      option[i] = { value:v.name, label:v.name}
    })
    setRoleList(option)
  }
  useEffect(() => {
    getOptions()
  }, []);
  
  // 展示弹窗
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
  const onDelUser = async (item:UserListType) => {
    Modal.confirm({
      title: '警告！',
      icon: <ExclamationCircleFilled />,
      content: <div>确定要删除 <b>{item.username}</b> 吗？</div>,
      cancelText: '取消',
      okText: '删除',
      okButtonProps: {
        danger: true
      },
      async onOk() {
        try {
          const res = await userDelApi(item._id)
          if (res.data.code === 200) {
            message.success('删除成功!')
            if (data.length === 1 && params.page === Math.ceil(total / params.pagesize)) {
              setParams({
                ...params,
                page: params.page - 1
              })
            } else {
              getUserList()
            }
          } else {
            message.error(res.data.msg)
          }
        } catch(e) {
          console.log(e)
        }
      }
    })
  }
  
  // 搜索
  const onSearch = (value:UserParams) => {
    console.log('要搜索的内容', value)
    setSearchForm(value)
  }
  
  // 分配确认
  const roleOk = async () => {
    const value = await roleForm.validateFields()
    console.log(value)
    setVisibility(false)
  }
  
  // 分配取消
  const roleCancel = () => {
    console.log('cancel')
    setVisibility(false)
  }
  
  // 清空分配表单
  useEffect(() => {
    if (!visibility) {
      roleForm.resetFields()
    }
  }, [visibility])
  
  return (
      <div className={style.user}>
        <Button type='primary' style={{marginBottom:20}} onClick={() => setOpen(true)}>
          <PlusCircleOutlined />添加用户
        </Button>
        <Search onSearch={onSearch}/>
        <UserList
          getUserList={getUserList}
          setVisibility={setVisibility}
          onEditUser={onEditUser}
          onDelUser={onDelUser}
          data={data}
          params={params}
          setParams={setParams}
          total={total}
        />
        <Modal open={open} title={updateId ? '编辑' : '新增'} onOk={handleOk} onCancel={handleCancel} okText="确认" cancelText="取消">
          <FormEject form={form}/>
        </Modal>
        <Modal open={visibility} title={'分配角色'} onOk={roleOk} onCancel={roleCancel} okText="确认" cancelText="取消">
          <RoleEject form={roleForm} visibility={visibility} option={roleList} />
        </Modal>
      </div>
  )
}

export default User