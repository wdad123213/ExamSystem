import React, { useState } from 'react'

const examDrawer:React.FC = (pages) => {
    console.log(pages.examQuest)
    const questType = useState('')
  return (
    <div>
        <p>你好</p>
        <p>科目{pages.examQuest[0].classify}</p>
        {pages.examQuest.map( (item) =>
           { if(item.type===1){
                // <div>
                //     单选题
                // </div>
                // <div>
                //     {item.question}
                // </div>
            }
        }
        )}
      
    </div>
  )
}

export default examDrawer
