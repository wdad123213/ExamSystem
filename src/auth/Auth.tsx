import {Navigate,useLocation} from "react-router-dom"

type Props = {
  children: JSX.Element
}
const Auth:React.FC<Props> = (props) => {
  const token = localStorage.getItem('token')
  console.log(window.location.pathname)
  const location = useLocation()
  if(!token){
    return <Navigate to={`/login?redirectUrl=${encodeURIComponent(location.pathname)}`} />
  }
  return props.children
}

export default Auth