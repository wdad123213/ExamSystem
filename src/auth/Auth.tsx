import {Navigate} from "react-router-dom"

type Props = {
  children: JSX.Element
}
const Auth:React.FC<Props> = (props) => {
  const token = localStorage.getItem('token')
  const redirectUrl = window.location.pathname;
  window.localStorage.setItem('redirectUrl', redirectUrl)
  if(!token){
    return <Navigate to="/login" />
  }
  return props.children
}

export default Auth