import React, { useEffect, useState } from 'react'

const examDrawer:React.FC = (pages) => {
  const [examQuestList,getExamQuestList] = useState('')
    // console.log(pages.examQuest)
    // getExamQuestList(pages.examQuest)
    const questType = useState('')
    useEffect(()=>{

    },[])
  return (
    <div>
        <p>你好</p>
        {/* <p>科目{pages.examQuest[0].classify}</p> */}
        {/* {examQuestList} */}
      
    </div>
  )
}

export default examDrawer
