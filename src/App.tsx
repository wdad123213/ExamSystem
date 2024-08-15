import routerConfig from './router/index.tsx'
import {useRoutes} from 'react-router-dom'
import { Watermark } from 'antd'
import {useAppSelector} from "./hooks/store.ts"

function App() {
  const userInfo = useAppSelector(state => state.user.userInfo)
  return (
      <Watermark content={userInfo.username}>
        <div >
          {useRoutes(routerConfig)}
        </div>
      </Watermark>
      
  )
}

export default App
