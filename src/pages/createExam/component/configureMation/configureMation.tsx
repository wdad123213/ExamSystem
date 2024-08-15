import React from 'react'
import { examcheng } from '../../../../types/api'

type propstype ={
  // nextPage:()=>void
  upPage:()=>void
  createTest:(a: any, b: any) => void
  creFrom:any
  selectedRows: examcheng[]
  completeexam:()=>void

}
const configureMation:React.FC<propstype>= (props) => {

  return (
    <div>
      <div>
        <h3>配置信息</h3>
        <p>考试名称{props.creFrom.name}</p>
        <p>科目分类{props.creFrom.classify}</p>
        <p>监考人员{props.creFrom.examiner}</p>
        <p>班级{props.creFrom.group}</p>
        <p>考试开始时间{JSON.stringify(props.creFrom.time[0])}</p>
        <p>考试结束时间{JSON.stringify(props.creFrom.time[1])}</p>
        {/* <div>考试时间
          <span>{props.creFrom.time[0].$d}</span>
          <span>{props.creFrom.time[1].$d}</span> 
        </div> */}
      </div>

      <div>
        <button onClick={()=>props.upPage()}>上一页</button>
        <button onClick={()=>props.completeexam()}>完成</button>
      </div>
      


    </div>
  )
}

export default configureMation
