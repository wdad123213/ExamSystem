import {Navigate} from "react-router-dom"
import UserList from "../pages/userList/UserList.tsx"
import {lazy} from "react"
import Auth from "../auth/Auth.tsx"
import Index from "../layout/Index.tsx"

const Login = lazy(() => import('../pages/login/Login.tsx'))
const Mine = lazy(() => import('../pages/mine/Mine.tsx'))
const AddQuestions = lazy(() => import('../pages/addQuestions/AddQuestions.tsx'))

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
            </Auth>
        )
    },
    {
        path:'/addQuestions',
        element: (
            <Index>
                <Auth>
                    <AddQuestions />
                </Auth>
            </Index>
        )
    }
]

export default routes