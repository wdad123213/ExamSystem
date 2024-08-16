import React, { useEffect, useState } from 'react'
import { Steps, } from 'antd';
import style from './CreateExam.module.scss'
import { examinationlApi,createTestApi } from '../../server';
// import { createExam } from '../../types/api'
import CreateFrom from './component/createFrom/createFrom';
import ConfigureExam from './component/ConfigureExam/ConfigureExam';
import ConfigureMation from './component/configureMation/configureMation';
import { createTestType, examcheng } from '../../types/api';


const CreateExam: React.FC= () => {
  const [currentNum, setCurrentNum] = useState(0)
  // 考试列表
  const [conExamList, setconExamList] = useState<examcheng[]>([])
  //考试试卷信息
  const [selectedRows,setSelectedRows] = useState<examcheng[]>([])
  // 考试配置信息
  const [creFrom, setCreFrom] = useState<any[]>([])
  // 
  // const [examChang, setexamChang] = useState<createTestType[]>([])
  const conExam = async (a:string)=>{
    const res = await examinationlApi(a)
    setconExamList(res.data.data.list.map((item: { _id: any; }) =>{
      return {
          ...item,
          key:item._id
      }
    }))
  }
  // type createTestType = {
  //   name: creFrom.name,
  //   classify:creFrom.classify,
  //   examiner:creFrom.examiner,
  //   group:creFrom.group,
  //   examId:selectedRows.key,
  //   startTime:  Date.parse(creFrom.time[0]),
  //   endTime:  Date.parse(creFrom.time[1]),
  // }
  // 考试试卷信息
  console.log(selectedRows,creFrom)
// 创建完成，传后端
  const completeexam = ()=>{
    
    const arr:createTestType = {
      name: creFrom.name ,
      classify:creFrom.classify[0],
      examiner:creFrom.examiner[0],
      group:creFrom.group[0],
      examId:selectedRows.key,
      startTime:  Date.parse(creFrom.time[0]),
      endTime:  Date.parse(creFrom.time[1]),
    }
    const newtime =  Date.now()
    createTest(newtime,arr)

  }

   const createTest =(a: number,b: createTestType)=>{
      createTestApi(a,b)
    }
 
  
  // setexamChang()
 
  

  const changecurrentNum =()=>{

    if(currentNum===0){
      return <CreateFrom  
                nextPage={nextPage}
                getexamPage={getexamPage}
                setCreFrom={setCreFrom}
              />
    }else if(currentNum===1){
      return <ConfigureExam 
                nextPage = {nextPage} 
                upPage = {upPage} 
                conExamList={conExamList}
                setconExamList={setconExamList}
                setSelectedRows={setSelectedRows}

              />
    }else if(currentNum===2){
      return <ConfigureMation 
                upPage = {upPage} 
                createTest={createTest}
                creFrom={creFrom}
                selectedRows={selectedRows}
                completeexam={completeexam}
              />
    }
  }
  const nextPage =()=>{
    setCurrentNum(currentNum+1)
  }
  const upPage =()=>{
    setCurrentNum(currentNum-1)
  }
  const getexamPage = (e:any)=>{
    console.log(e.classify)
    setCreFrom(e)

    conExam('classify'+'='+e.classify)

  }

  
 
  useEffect(()=>{

  },[])


  return (
    
    <div className={style.createExam}>
      
      <div className={style.steps}>
        
        <Steps
          current={currentNum}
          initial={0}
          items={[
            {
              title: '考试基本信息',
            },
            {
              title: '配置试卷',
            },
            {
              title: '发布考试',
            },
          ]}
        />
      </div>
      <div className={style.change}>
        {changecurrentNum()}
      </div>
    </div>
  )
}

export default CreateExam
