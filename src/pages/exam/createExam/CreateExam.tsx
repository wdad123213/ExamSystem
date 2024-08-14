import React, { useEffect, useState } from 'react'
import ExamList from '../comment/examList/ExamList'
import ExamExcel from '../comment/examExcel/examExcel'
import {examDetailApi} from '../../../server/index'

const CreateExam:React.FC = () => {
  const [changePage,setChangePage] = useState(true)

  const examDetail = async (id) => {
    const res = await examDetailApi(id)
    console.log(res)
    // const newArr = [res.data.data.list]
    // setExamList(res.data.data.list)
  }


  const changePageExam=(id)=>{
    console.log(id)
    setChangePage(!changePage)
    examDetail(id)

  }
  useEffect(()=>{

  },[])
  return (
    <div>
      {changePage?
      <ExamList changePageExam={changePageExam}/>
      :
      <ExamExcel changePageExam={changePageExam}/>
    }
      
      
    </div>
  )
}

export default CreateExam
