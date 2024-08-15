import React, { useEffect, useState } from 'react'
import { Table,  Input, Typography,Button, Drawer , Flex} from 'antd';
import type { TableProps } from 'antd';
import {UpOutlined ,DownOutlined } from '@ant-design/icons'
import style from './ExamLisr.module.scss'
import type { ConfigProviderProps } from 'antd';
import { examListApi ,removeExamListApi,examinationlApi} from '../../../../server/index'
import { ExamListDataType} from '../../../../types/api'
import ExamDrawer from '../examDrawer/examDrawer';
type SizeType = ConfigProviderProps['componentSize'];
export type FormVal = Partial<ExamListDataType>



const ExamList: React.FC<any> = (props) => {
  const [obj1,setobj1] = useState('')
  const [obj2,setobj2] = useState('')
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState<SizeType>('large'); // default is 'middle'
  const [isShow, setIsShow] = useState(false)
  const [examList, setExamList] = useState([])
  const [examQuest,setExamQuest] = useState([])


 const [resList,setResList]= useState<any>(
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


  examList.forEach((item:any)  => {
    item.key=item._id
    item.startTime = new Date(item.startTime).toLocaleString() || ''
    item.createTime = new Date(item.createTime).toLocaleString() || ''
    item. endTime = new Date(item. endTime).toLocaleString() || ''
  })

  const showDrawer = (e:any) => {
    console.log(e)
    setExamQuest(e)
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const awlist = async () => {
    const res = await examListApi()
    setExamList(res.data.data.list)
  }

  const soshow =()=>{
    setIsShow(!isShow)
   
  }
  // 搜索内容
  const examination = async (v:any)=>{
    const res = await examinationlApi(v)
    setExamList(res.data.data.list)
  }

//  搜索
  const handleClickGetContent = () => {
    const arr = Object.keys(resList)
    const res:any = {}
    arr.forEach((v:any) => {
      if(resList[v]) {
        res[v] = resList[v]
      }
    })
    if(Object.keys(res)){
      if(Object.keys(res).length>1){
        // let obj = {}
        Object.keys(res).map((item,i)=>{
          if(i< Object.keys(res).length-1){
            setobj1( item+'='+Object.values(res)[i]+'&')
            console.log(obj1)
          }else{
            setobj2( item+'='+Object.values(res)[i])
            console.log(obj2)
          }
          const count =`${ obj1}${obj2}`
          console.log(count)
          examination(count)
          // console.log(obj1+obj2)
        }) 
      }else{
        const obj=(Object.keys(res)+'='+Object.values(res))
        examination(obj)
      }
    }else{
      const obj = {
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
      setResList(obj)
    }
  };

  const reset = ()=>{
    const obj = {
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
    setResList(obj)
    
  

  }
 
  // 删除
  const detal = (e:any)=>{
    console.log(e)
    removeExamListApi(e)

  }

  useEffect(() => {
    awlist()

  }, [])
  

  const columns: TableProps<ExamListDataType>['columns'] = [

    {
      title: '考试名称',
      dataIndex: 'name',
    },
    {

      title: '科目分类',
      dataIndex: 'classify',
    },
    {
      title: '创建者',
      dataIndex: 'creator',

    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '状态',
      dataIndex: 'status',
    },
    {
      title: '监考人',
      dataIndex: 'examiner',
    },
    {
      title: '考试班级',
      dataIndex: 'group',
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',

    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
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
        <Button 
          rel="noopener noreferrer" 
          key="view"
          onClick={()=>detal(action._id)}
        >
          删除
        </Button>,

      ],
    },
    {
      title: '操作',
      render: (_, action) =>
        <button onClick={()=>props.changePageExam(action._id)}>
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
