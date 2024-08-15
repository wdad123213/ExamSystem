import {Navigate,useLocation} from "react-router-dom"
import React from "react"

type Props = {
  children: JSX.Element
}
const Auth:React.FC<Props> = (props) => {
  const token = localStorage.getItem('token')
  const location = useLocation()
  // console.log(location.pathname)
  if(!token){
    return <Navigate to={`/login?redirectUrl=${encodeURIComponent(location.pathname)}`} />
  }
  return props.children
}

export default Auth