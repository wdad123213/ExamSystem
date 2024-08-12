import {Navigate} from "react-router-dom"
import UserList from "../pages/userList/UserList.tsx"
import {lazy} from "react"
import Auth from "../auth/Auth.tsx"

const Login = lazy(() => import('../pages/login/Login.tsx'))
const Mine = lazy(() => import('../pages/mine/Mine.tsx'))
const Question = lazy(() =>import('../pages/question/Question.tsx'))
const routes = [
    {
        path:'/',
        element:<Navigate to='/userList' />
    },
    {
        path:'/userList',
        element: (
            <Auth>
                <UserList />
            </Auth>
        )
    },
    {
        path:'/login',
        element: <Login />
    },
    {
        path:'/mine',
        element: (
            <Auth>
                <Mine />
            </Auth>)
    },
    {
        path: '/question',
        element: (
            <Auth>
                <Question />
            </Auth>)
    }
]

export default routes