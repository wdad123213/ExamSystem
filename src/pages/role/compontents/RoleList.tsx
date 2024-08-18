import React from 'react'
import {Button, Space, Table, TableProps} from "antd"
import {RoleItemType} from "../../../types/api"

interface PropsType {
  data: RoleItemType[]
  handleDel: (item: RoleItemType) => Promise<void>
  showLoading: (item: RoleItemType) => void
}

const RoleList:React.FC<PropsType> = (props) => {
  // 表格渲染
  const columns: TableProps<RoleItemType>['columns'] = [
    {
      title: '角色',
      dataIndex: 'name',
      key: '1',
      width: 50,
      align: 'center'
    },
    {
      title: '角色关键词',
      dataIndex: 'value',
      key: '2',
      width: 50,
      align: 'center'
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: '3',
      width: 50,
      align: 'center'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: '4',
      width: 100,
      align: 'center',
      render:(_) => {
        return <div>{_? new Date(_).toLocaleString() : '-'}</div>
      }
    },
    {
      title: '操作',
      key: 'operation',
      fixed: 'right',
      width: 60,
      align: 'center',
      render: (_, row) => {
        return(
            <Space>
              <Button type='primary' onClick={() => props.showLoading(row)}>分配角色</Button>
              <Button type='primary' danger onClick={() => props.handleDel(row)}>删除</Button>
            </Space>
        )
      },
    }
  ]
  return <Table columns={columns} dataSource={props.data} rowKey="_id" scroll={{x:1500}} pagination={false} />
}

export default RoleList