import React from 'react'
import {Avatar, Button, message, Space, Switch, Table, TableProps} from "antd"
import {UserListType} from "../../../types/api"
import {userStateApi} from "../../../server"

interface PropsType {
  getUserList:() => Promise<void>
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>
  onEditUser: (item: UserListType) => void
  onDelUser: (item: UserListType) => Promise<void>
  data: UserListType[]
  params: Record<'page' | 'pagesize', number>
  setParams: React.Dispatch<React.SetStateAction<Record<'page' | 'pagesize', number>>>
  total: number
}

const UserList:React.FC<PropsType> = (props) => {
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
              props.getUserList()
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
                  <Button type='primary' onClick={() => props.setVisibility(true)}>分配角色</Button>
                  <Button
                      type='primary'
                      onClick={() => props.onEditUser(rowKey)}
                  >编辑</Button>
                  <Button type='primary' danger onClick={() => props.onDelUser(rowKey)}>删除</Button>
                </Space>
          }
        </>
      },
    }
  ]
  return (
      <>
        <Table columns={columns} dataSource={props.data} rowKey="_id" scroll={{x:1500}} pagination={{
          current: props.params.page,
          pageSize: props.params.pagesize,
          showQuickJumper: true,
          total:props.total,
          showTotal: (total, range) => {
            return (
                <Space>
                  <span>共 {total} 条</span>
                  <span>{range[0]} - {range[1]}</span>
                </Space>
            )
          },
          onChange: (page, pagesize) => {
            props.setParams({
              page,
              pagesize
            })
          }
        }}/>
      </>
  )
}

export default UserList