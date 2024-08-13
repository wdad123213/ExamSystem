import React, { useEffect, useState } from 'react'
import { Space, Table, Tag, Input, Typography,Button, Drawer , Divider, Flex, Radio  } from 'antd';
import type { TableProps } from 'antd';
import {UpOutlined ,DownOutlined } from '@ant-design/icons'
import style from './ExamLisr.module.scss'
import type { ConfigProviderProps } from 'antd';
import { examListApi } from '../../../server/index'
import { DataType} from '../../../types/api'
import ExamDrawer from '../comment/examDrawer';
import userStore from '../../../store/models/userStore';
type SizeType = ConfigProviderProps['componentSize'];
// const { Search } = Input;
export type FormVal = Partial<DataType>
const ExamList: React.FC = () => {
  const [open, setOpen] = useState(false);

  const [size, setSize] = useState<SizeType>('large'); // default is 'middle'
  const [isShow, setIsShow] = useState(false)
  const [examList, setExamList] = useState([])
  const [stateTime, getStateTime] = useState('')
  const [examQuest,setExamQuest] = useState([])
  examList.forEach((item:any)  => {
    item.key=item._id
    item.startTime = new Date(item.startTime).toLocaleString() || ''
    item.createTime = new Date(item.createTime).toLocaleString() || ''
    item. endTime = new Date(item. endTime).toLocaleString() || ''
  })

  const showDrawer = (e) => {
    console.log(e)
    setExamQuest(e)
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };


  const awlist = async () => {
    const res = await examListApi()
    console.log(res.data.data.list)
    // const newArr = [res.data.data.list]
    setExamList(res.data.data.list)
  }

  const soshow =()=>{
    setIsShow(!isShow)
   
  }
 const [resList,setResList]= useState(
   { 
    name: '',
    classify: '',
    creator: '',
    createTime: '',
    status:'',
    examiner:'',
    group:'',
    startTime:  '',
    endTime: '',
    
  }
  
)

  const handleClickGetContent = () => {
    console.log('输入的内容:', resList);
    // 这里可以执行其他逻辑，如发送数据到服务器等
  };
  const reset = ()=>{
    setResList('')
    //onSearch({})

  }


  useEffect(() => {
    awlist()

  }, [])
  

  const columns: TableProps<DataType>['columns'] = [

    {
      title: '考试名称',
      dataIndex: 'name',
      // ellipsis: true,
    },
    {

      title: '科目分类',
      dataIndex: 'classify',

      // ellipsis: true,  //省略

    },
    {
      // disable: true,
      title: '创建者',
      dataIndex: 'creator',
      // ellipsis: true,

    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      // ellipsis: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      // ellipsis: true,
    },
    {
      title: '监考人',
      dataIndex: 'examiner',
      // ellipsis: true,
    },
    {
      title: '考试班级',
      dataIndex: 'group',
      // ellipsis: true,
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      // ellipsis: true,
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      // ellipsis: true,
    },

    {
      title: '设置',
      dataIndex: 'tags',
      key: 'option',
      render: (_, action) => [
        <Button
          key="questionsList"
          type="primary"
          onClick={()=>showDrawer(action.questionsList)}
        >
          预览试卷
        </Button>,
        <Button rel="noopener noreferrer" key="view">
          删除
        </Button>,

      ],
    },
    {
      title: '操作',
      // dataIndex: 'tags',
      render: () =>
        <button>
          成绩分析
        </button>

    }
  ];





  return (
    <div>
      <div className={style.from}>
        
        <div>
          <div className={style.inputFirst} style={{display:'flex'}}>
            <div style={{marginLeft:'50px'}}>
              <Typography.Title level={5} >考试名称</Typography.Title>
              <Input placeholder="请选择" value={resList.name} onChange={(e)=>setResList({...resList,name:e.target.value})}/>
            </div>

            <div style={{marginLeft:'50px'}}>
              <Typography.Title level={5} >科目分类</Typography.Title>
              <Input placeholder="请选择" value={resList.classify}   onChange={(e)=>setResList({...resList,classify:e.target.value})}/>
            </div>
            <div style={{marginLeft:'50px'}}>
              <Typography.Title level={5} >创建者</Typography.Title>
              <Input placeholder="请选择" value={resList.creator} onChange={(e)=>setResList({...resList,creator:e.target.value})}/>
            </div>
            {!isShow&&
            <div style={{marginLeft:'50px'}}>
            <Typography.Title level={5} >创建时间</Typography.Title>
            <Input placeholder="请选择" value={resList.createTime} onChange={(e)=>setResList({...resList,createTime:e.target.value})}/>
            </div>}

          </div>
          
          {
            !isShow && 
            <div style={{display:'flex',flexWrap:'wrap',minWidth:''}}>
              {isShow&&
              <div style={{marginLeft:'50px'}}>
                <Typography.Title level={5} >创建时间</Typography.Title>
                <Input placeholder="请选择" value={resList.createTime} onChange={(e)=>setResList({...resList,createTime:e.target.value})}/>
              </div>
              }
              
              <div style={{marginLeft:'50px'}}>
                <Typography.Title level={5} >状态</Typography.Title>
                <Input placeholder="请选择"value={resList.status} onChange={(e)=>setResList({...resList,status:e.target.value})} />
              </div>
              <div style={{marginLeft:'50px'}}>
                <Typography.Title level={5} >监考人</Typography.Title>
                <Input placeholder="请选择" value={resList.examiner} onChange={(e)=>setResList({...resList,examiner:e.target.value})}/>
              </div>
              <div style={{marginLeft:'50px'}}>
                <Typography.Title level={5} >考试班级</Typography.Title>
                <Input placeholder="请选择" value={resList.group} onChange={(e)=>setResList({...resList,group:e.target.value})}/>
              </div>
              <div style={{marginLeft:'50px'}}>
                <Typography.Title level={5} >考试时间</Typography.Title>
                <Input placeholder="请选择" value={resList.startTime} onChange={(e)=>setResList({...resList,startTime:e.target.value})}/>
              </div>
            </div>
          }

        </div>


        <div className={style.flex}>
          <Flex gap="small" wrap>
            <Button type="primary" size={size} onClick={handleClickGetContent}>
              搜索
            </Button>
            <Button size={size} onClick={reset}>清空</Button>
          </Flex>
          {isShow?
          <div onClick={soshow}>
            <DownOutlined />展开
          </div>
          
          :
          <div onClick={soshow}>
            <UpOutlined />收起
          </div>
          }
        </div>
      </div>
      <div>
        <Table columns={columns} dataSource={examList} />
      </div>
      <Drawer title="试卷预览" onClose={onClose} open={open}>
        <ExamDrawer examQuest={examQuest}/>
      </Drawer>
    </div>
  )
}

export default ExamList
