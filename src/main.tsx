import {Suspense} from "react"
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import style from './common.moduel.scss'
import {BrowserRouter as Router} from "react-router-dom"
import store from "./store"
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <Suspense fallback={<div>loading...</div>}>
      <Router>
        <App></App>
      </Router>
    </Suspense>
  </Provider>
)
