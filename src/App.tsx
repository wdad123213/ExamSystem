import routerConfig from './router/index.tsx'
import {useRoutes} from 'react-router-dom'

function App() {
  return useRoutes(routerConfig)
}

export default App
