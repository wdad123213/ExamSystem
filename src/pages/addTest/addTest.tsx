import React, {useState} from 'react'
import Manual from "./components/Manual.tsx"
import Batch from "./components/Batch.tsx"
import style from "./addTest.module.scss"

const AddTest:React.FC = () => {
  const [curInfo,setCurInfo] = useState(0)
  const addType = ():JSX.Element => {
    return curInfo? <Batch/> : <Manual />
  }
  return (
    <div>
      <nav className={style.nav}>
        <span
          className={curInfo ? '' : style.active}
          onClick={() => setCurInfo(0)}
        >手动添加</span>
        <span
          className={curInfo ? style.active : ''}
          onClick={() => setCurInfo(1)}
        >批量导入</span>
      </nav>
      <div>
        {addType()}
      </div>
    </div>
  )
}

export default AddTest