import {Navigate} from "react-router-dom"
import UserList from "../pages/userList/UserList.tsx"
import {lazy} from "react"
import Auth from "../auth/Auth.tsx"
import StudentList from "../pages/conponents/studentList/StudentList.tsx"
import ClassList from "../pages/conponents/classList/ClassList.tsx"

const Login = lazy(() => import('../pages/login/Login.tsx'))
const Mine = lazy(() => import('../pages/mine/Mine.tsx'))
const Question = lazy(() =>import('../pages/question/Question.tsx'))
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
        path:'/classList',
        element: (
            <Auth>
                <ClassList />
            </Auth>
        )
    },
    {
        path:'/studentList',
        element: (
            <Auth>
                <StudentList />
            </Auth>
        )
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
    },
    {
        path:'/addQuestions',
        element: (
            <Auth>
                <AddQuestions />
            </Auth>)
    }
]

export default routes