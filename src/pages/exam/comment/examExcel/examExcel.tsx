import React from 'react'

const examExcel:React.FC<any> = (props) => {
  return (
    <div>
        <div>
            <span onClick={props.changePageExam}>返回上一页</span>
            <button>成绩分析</button>
            <button>试题分析</button>
        </div>

      
    </div>
  )
}

export default examExcel
