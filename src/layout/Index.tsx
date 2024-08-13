import React, {useState, useEffect, useMemo} from 'react'
import {
  ToolOutlined,
  ProfileOutlined,
  HighlightOutlined,
  UsergroupAddOutlined,
  ContainerOutlined
} from '@ant-design/icons'
import { Breadcrumb, Layout, Menu, theme } from 'antd'
import Top from '../components/header/Top.tsx'
import {useLocation, useNavigate} from "react-router-dom";

type Props = {
  children:JSX.Element
}
type ValBase = Record<'label'|'key',string>
interface ValItem extends ValBase {
  children:ValBase[]
  icon:React.ReactElement
}

const { Header, Content, Footer, Sider } = Layout

const items: ValItem[] = [
  {
    label:'试题管理',
    key:'questionManagement',
    icon:<ProfileOutlined />,
    children: [
      {
        label:'试题库',
        key:'/question',
      },
      {
        label: '添加试题',
        key:'/addQuestions',
      }
    ]
  },
  {
    label:'考试管理',
    key:'examManagement',
    icon:<HighlightOutlined />,
    children: [
      {
        label:'考试记录',
        key:'/examRecords',
      },
      {
        label: '创建考试',
        key:'/createExam',
      }
    ]
  },
  {
    label:'班级管理',
    key:'classManagement',
    icon:<UsergroupAddOutlined />,
    children: [
      {
        label:'班级列表',
        key:'/classList',
      },
      {
        label: '学生列表',
        key:'/studentList',
      }
    ]
  },
  {
    label:'试卷管理',
    key:'paperManagement',
    icon:<ContainerOutlined />,
    children: [
      {
        label:'试卷库',
        key:'/test',
      },
      {
        label: '创建试卷',
        key:'/addTest',
      }
    ]
  },
  {
    label:'系统管理',
    key:'systemManagement',
    icon:<ToolOutlined />,
    children: [
      {
        label:'用户管理',
        key:'/user',
      },
      {
        label: '角色管理',
        key:'/role',
      },
      {
        label: '权限管理',
        key:'/permissions',
      },
      {
        label: '个人信息',
        key:'/mine'
      }
    ]
  }
]

const Index: React.FC<Props> = (prop) => {
  const [collapsed, setCollapsed] = useState(false)
  const {token: { colorBgContainer, borderRadiusLG }} = theme.useToken()
  const location = useLocation()
  const navigate = useNavigate()
  const [curPage, setCurPage] = useState(location.pathname)
  const curLabel = useMemo(() => {
    const keys: string[] = []
    items.forEach((val:ValItem) => {
      val.children.forEach((v: ValBase) => {
        if (v.key === curPage) {
          keys.push(val.key)
        }
      })
    })
    return keys
  }, [curPage])
  
  const curManage = useMemo(() => {
    const curOpen = items.find((v) => v?.key as string === curLabel[0])
    return curOpen?.label
  },[curLabel])
  
  const curContent = useMemo(() => {
    const curOpen = items.find((v) => v?.key as string === curLabel[0])
    const curString = curOpen?.children.find((v) => v.key as string === curPage)
    return curString?.label
  },[curLabel])
  
  useEffect(()=>{
    navigate(curPage)
  },[curPage])
  const changeItem = (item:{ key:string }) => {
    setCurPage(item.key)
  }
  const changeOpen = (openKeys:string[]) => {
    if(openKeys.length > 1) openKeys.shift()
  }
  return (
    <div>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider theme="light" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="light"
            defaultSelectedKeys={[curPage]}
            // defaultOpenKeys={curLabel}
            selectedKeys={[curPage]}
            mode="vertical"
            items={items}
            onClick={changeItem}
            onOpenChange={changeOpen}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }} >
            <Top setCurpage={() => {
              setCurPage('/mine')
              // 'systemManagement'
            }} />
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>{curManage}</Breadcrumb.Item>
              <Breadcrumb.Item>{curContent}</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{
                  padding: 24,
                  minHeight: 360,
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
                }}>
              {prop.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </div>
  )
}

export default Index