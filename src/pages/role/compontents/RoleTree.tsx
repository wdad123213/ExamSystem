import React, {useState} from 'react'
import {Button, message, Tree} from 'antd'
import type { TreeDataNode, TreeProps } from 'antd'
import {roleUpdataApi} from "../../../server"

interface PropsType {
  permission:string[]
  id:string
  getRoleList:() => Promise<void>
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>
  treeData: TreeDataNode[]
}

const RoleTree:React.FC<PropsType> = (props) => {
  const [curPermission, setCurPermission] = useState<string[]>([])
  const onCheck: TreeProps['onCheck'] = (checkedKeys) => {
    setCurPermission(checkedKeys as string[])
  }
  const treeData = props.treeData
  const onUpdata = async (permission:string[]) => {
    try {
      const res = await roleUpdataApi({permission,id:props.id})
      if (res.data.code === 200) {
        message.success('分配角色成功!')
        props.getRoleList()
        props.setVisibility(false)
      } else {
        message.error(res.data.msg)
      }
    } catch(e) {
      console.log(e)
    }
  }
  return (
    <>
      <Tree
          checkable
          defaultExpandAll
          defaultCheckedKeys={props.permission}
          onCheck={onCheck}
          treeData={treeData}
      />
      <Button type='primary' onClick={() => onUpdata(curPermission)}>确定</Button>
    </>
  )
  
}
export default RoleTree
