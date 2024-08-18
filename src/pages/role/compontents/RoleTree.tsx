import React from 'react'
import { Tree } from 'antd'
import type { TreeDataNode, TreeProps } from 'antd'

interface PropsType {

}

const treeData: TreeDataNode[] = [
  {
    title:'试题管理',
    key:'questionManagement',
    children: [
      {
        title:'试题库',
        key:'/question',
      },
      {
        title: '添加试题',
        key:'/addQuestions',
      }
    ]
  },
  {
    title:'考试管理',
    key:'examManagement',
    children: [
      {
        title:'考试记录',
        key:'/examRecords',
      },
      {
        title: '创建考试',
        key:'/createExam',
      }
    ]
  },
  {
    title:'班级管理',
    key:'classManagement',
    children: [
      {
        title:'班级列表',
        key:'/classList',
      },
      {
        title: '学生列表',
        key:'/studentList',
      }
    ]
  },
  {
    title:'试卷管理',
    key:'paperManagement',
    children: [
      {
        title:'试卷库',
        key:'/test',
      },
      {
        title: '创建试卷',
        key:'/addTest',
      }
    ]
  },
  {
    title:'系统管理',
    key:'systemManagement',
    children: [
      {
        title:'用户管理',
        key:'/user',
      },
      {
        title: '角色管理',
        key:'/role',
      },
      {
        title: '权限管理',
        key:'/permissions',
      },
      {
        title: '个人信息',
        key:'/mine'
      }
    ]
  }
]

const RoleTree:React.FC<PropsType> = () => {
  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  }
  
  const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  }
  
  return (
      <Tree
          checkable
          defaultExpandAll
          defaultCheckedKeys={[]}
          onSelect={onSelect}
          onCheck={onCheck}
          treeData={treeData}
      />
  )
}

export default RoleTree