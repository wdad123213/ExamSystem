import {Navigate} from "react-router-dom"
import Home from "../pages/home/Home.tsx"
import {lazy} from "react"
import Auth from "../auth/Auth.tsx"

import StudentList from "../pages/conponents/studentList/StudentList.tsx"
import ClassList from "../pages/conponents/classList/ClassList.tsx"
import Index from "../layout/Index.tsx"
import ExamList from "../pages/exam/examList/ExamList.tsx"


const Login = lazy(() => import('../pages/login/Login.tsx'))
const Mine = lazy(() => import('../pages/mine/Mine.tsx'))
const Question = lazy(() =>import('../pages/question/Question.tsx'))
const AddQuestions = lazy(() => import('../pages/addQuestions/AddQuestions.tsx'))

const routes = [
    {
        path:'/',
        element:<Navigate to='/home' />
    },
    {
        path:'/home',
        element: (
            <Auth>
                <Home />
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
            <Index>
                <Auth>
                    <ClassList />
                </Auth>
            </Index>
            
        )
    },
    {
        path:'/studentList',
        element: (
            <Index>
                <Auth>
                    <StudentList />
                </Auth>
            </Index>
        )
    },
    {
        path:'/examList',
        element: (
            <Index>
                <Auth>
                    <ExamList />
                </Auth>
            </Index>
        )
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
        path: '/question',
        element: (
            <Index>
                <Auth>
                    <Question />
                </Auth>
            </Index>
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