import {ExclamationCircleFilled, PlusCircleOutlined} from "@ant-design/icons"
import {Button, Drawer, Form, message, Modal} from "antd"
import React, {useEffect, useState} from "react"
import RoleAddForm from "./compontents/RoleAddForm.tsx"
import RoleList from "./compontents/RoleList.tsx"
import RoleTree from "./compontents/RoleTree.tsx"
import {RoleCreateParams,RoleItemType} from "../../types/api"
import {roleCreateApi, userRoleList, roleDelApi} from "../../server"

const Role:React.FC = () => {
  const [open, setOpen] = useState(false)
  const [form] = Form.useForm<RoleCreateParams>()
  const [data,setData] = useState<RoleItemType[]>([])
  const [visibility, setVisibility] = React.useState<boolean>(false)
  // 获取角色列表
  const  getRoleList = async () => {
    const res = await userRoleList()
    setData(res.data.data.list)
  }
  useEffect(() => {
    getRoleList()
  }, []);
  
  // 新增
  const handleOk = async () => {
    try {
      const value = await form.validateFields()
      console.log(value)
      const res = await roleCreateApi(value)
      if(res.data.code===200){
        message.success('创建角色成功！')
        getRoleList()
      }else{
        message.error(res.data.msg)
      }
      setOpen(false)
    }catch (e){
      console.log(e)
    }
  }
  const handleCancel = () => {
    setOpen(false)
  }
  useEffect(() => {
    if(!open){
        form.resetFields()
    }
  }, [open])
  
  // 删除
  const handleDel = async (item:RoleItemType) => {
    Modal.confirm({
      title: '警告！',
      icon: <ExclamationCircleFilled />,
      content: <div>确定要删除 <b>{item.name}</b> 吗？</div>,
      cancelText: '取消',
      okText: '删除',
      okButtonProps: {
        danger: true
      },
      async onOk() {
        try {
          const res = await roleDelApi(item._id)
          if (res.data.code === 200) {
            message.success('删除成功!')
            getRoleList()
          } else {
            message.error(res.data.msg)
          }
        } catch(e) {
          console.log(e)
        }
      }
    })
  }
  
  // 打开抽屉
  const showLoading = () => {
    setVisibility(true)
  }
  
  return (
    <>
      <Button type='primary' style={{marginBottom:20}} onClick={() => setOpen(true)}>
          <PlusCircleOutlined />新增角色
      </Button>
      <RoleList data={data} handleDel={handleDel} showLoading={showLoading}/>
      <Drawer closable destroyOnClose title={<p>分配角色</p>} placement="right" open={visibility} onClose={() => setVisibility(false)}>
        <RoleTree />
      </Drawer>
      <Modal open={open} title='新增角色' onOk={handleOk} onCancel={handleCancel} okText="确认" cancelText="取消">
              <RoleAddForm form={form}/>
          </Modal>
    </>
  )
}

export default Role