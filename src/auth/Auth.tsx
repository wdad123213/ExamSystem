import {Navigate,useLocation} from "react-router-dom"

type Props = {
  children: JSX.Element
}
const Auth:React.FC<Props> = (props) => {
  const token = localStorage.getItem('token')
<<<<<<< HEAD
  console.log(window.location.pathname)
  const location = useLocation()
=======
  const redirectUrl = window.location.pathname;
  window.localStorage.setItem('redirectUrl', redirectUrl)
>>>>>>> 088b2143cd72951032fcf4f11f5986e1f6c74c53
  if(!token){
    return <Navigate to={`/login?redirectUrl=${encodeURIComponent(location.pathname)}`} />
  }
  return props.children
}

export default Auth