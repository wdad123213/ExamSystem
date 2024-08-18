import React, {useState} from 'react'
import {Button, message, Tree} from 'antd'
import type { TreeDataNode, TreeProps } from 'antd'
import { roleUpdataApi} from "../../../server"

interface PropsType {
  permission:string[]
  id:string
  getRoleList:() => Promise<void>
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>
}

const treeData: TreeDataNode[] = [
  {
    title:'试题管理',
    key:'66bd9d3be7831b77818e372f',
    children: [
      {
        title:'试题库',
        key:'66bda20ce7831b77818f0a01',
      },
      {
        title: '添加试题',
        key:'66bda234e7831b77818f0ab2',
      }
    ]
  },
  {
    title:'考试管理',
    key:'64e6ca039d9626c840ced45b',
    children: [
      {
        title:'考试记录',
        key:'64e6ca2b9d9626c840ced4d0',
      },
      {
        title: '创建考试',
        key:'64e6ca439d9626c840ced556',
      }
    ]
  },
  {
    title:'班级管理',
    key:'644880f46bbabb156a09f553',
    children: [
      {
        title:'班级列表',
        key:'644881116bbabb156a09f58b',
      },
      {
        title: '学生列表',
        key:'6448814ac3bc32716d4587ed',
      }
    ]
  },
  {
    title:'试卷管理',
    key:'6640a9de12a810029231ac94',
    children: [
      {
        title:'试卷库',
        key:'6640aab712a810029231c6e9',
      },
      {
        title: '创建试卷',
        key:'6640ac1f12a810029231e0fb',
      }
    ]
  },
  {
    title:'系统管理',
    key:'6447ab7a54f16ac43f7ffbc1',
    children: [
      {
        title:'用户管理',
        key:'644b1a35971095d6b7c9da50',
      },
      {
        title: '角色管理',
        key:'6447abbe54f16ac43f7ffc95',
      },
      {
        title: '权限管理',
        key:'64488058fc6aa3c75d878f93',
      },
      {
        title: '个人信息',
        key:'644880cf6bbabb156a09f51f'
      }
    ]
  },
  {
    title:'删除班级按钮',
    key:'64e803c09d9626c840d0873d'
  }
]

const RoleTree:React.FC<PropsType> = (props) => {
  const [curPermission, setCurPermission] = useState<string[]>([])
  const onCheck: TreeProps['onCheck'] = (checkedKeys) => {
    setCurPermission(checkedKeys as string[])
  }
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
