import React, { useEffect} from 'react'

type propstype ={
  examQuest: any


}


const examDrawer:React.FC<propstype>= (props) => {
  interface IQuestion {
    _id: string;
    question: string;
    type: string;
    classify: string;
    answer: string;
    options:string[]
  }
  interface IQuestionListProps {
    [x: string]: any
    questions: IQuestion[];
  }

    const prevExam = ()=>{
      const arr: { type: string; title: string; question: IQuestionListProps[]}[] = []
      props.examQuest.forEach((v:any)=>{
      
        if(v.type==='1'){
          const font = arr.find(i=>i.type==='1') 
          if(!font){
            arr.push({type:'1',title:'单选题',question:[v]})
          }else{
            font.question.push(v)
          }
        }else if(v.type==='2'){
          const font = arr.find(i=>i.type==='2') 
          if(!font){
            arr.push({type:'2',title:'多选题',question:[v]})
          }else{
            font.question.push(v)
          }
        }else if(v.type==='3'){
          const font = arr.find(i=>i.type==='3') 
          if(!font){
            arr.push({type:'3',title:'判断题',question:[v]})
          }else{
            font.question.push(v)
          }
        }else if(v.type==='4'){
          const font = arr.find(i=>i.type==='4') 
          if(!font){
            arr.push({type:'4',title:'填空题',question:[v]})
          }else{
            font.question.push(v)
          }
        }
        
      })
      return arr
    }    
      
    useEffect(()=>{
      prevExam()
    },[])
   
  return (
    <div>
        <h2 style={{}}>科目{props.examQuest[0].classify}</h2>
        <div>
          {prevExam().map((item,index)=>{
           return  (
              <div key={index}>
                <div>
                {item.title}

                </div>
                <div>
                {item.question.map((it,i)=>{
                  return (
                    <div key={i}>
                      {i+1} 、 {it.question}
                      <div>
                      {it.options.map((its: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined,is: React.Key | null | undefined)=>{
                        return (
                          
                          <div key={is}>
                            {(is === 0)?'A':(is === 1)?'B':(is === 3)?'C':'D'}、
                            {its}
                          </div>
                        )
                        
                      }  )}
                      </div>
                    </div>
                  )
                })}
                  
                </div>
                
              </div>
           )
         })}
        </div>
       
      
    </div>
  )
}

export default examDrawer
