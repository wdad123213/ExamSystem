import React from 'react'
import { examcheng } from '../../../../types/api'
import { NavLink } from 'react-router-dom'
import { Button, Flex } from 'antd';
import style from './configureMation.module.scss'

type propstype ={
  upPage:()=>void
  createTest:(a: any, b: any) => void
  creFrom:any
  selectedRows: examcheng[]
  completeexam:()=>void

}
const configureMation:React.FC<propstype>= (props) => {

  return (
    <div className={style.conMan}>
      <div className={style.details}>
        <h3>配置信息</h3>
        <p>考试名称  :  {props.creFrom.name}</p>
        <p>科目分类  :  {props.creFrom.classify}</p>
        <p>监考人员  :  {props.creFrom.examiner}</p>
        <p>班级  :  {props.creFrom.group}</p>
        <p>考试开始时间 : {JSON.stringify(props.creFrom.time[0])}</p>
        <p>考试结束时间 : {JSON.stringify(props.creFrom.time[1])}</p>
      </div>

      <div>
      <Flex gap="middle" wrap>
        <Button type="primary" autoInsertSpace={false} onClick={()=>props.upPage()}>
          上一页
        </Button>
        <NavLink to={'/examRecords'}>
          <Button type="default" autoInsertSpace onClick={()=>props.completeexam()}>
            提交
          </Button> 
        </NavLink>
      </Flex>
      </div>
    </div>
  )
}

export default configureMation
