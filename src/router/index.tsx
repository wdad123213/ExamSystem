import {Navigate} from "react-router-dom"
import UserList from "../pages/userList/UserList.tsx"
import {lazy} from "react"
import Auth from "../auth/Auth.tsx"
import Index from "../layout"

const Login = lazy(() => import('../pages/login/Login.tsx'))
const Mine = lazy(() => import('../pages/mine/Mine.tsx'))

const routes = [
    {
        path:'/',
        element:<Navigate to='/userList' />
    },
    {
        path:'/userList',
        element: (
            <Auth>
                <Index>
                    <UserList />
                </Index>
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
                <Index>
                    <Mine />
                </Index>
            </Auth>)
    }
]

export default routes