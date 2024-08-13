import {Navigate} from "react-router-dom"
import {lazy} from "react"
import Auth from "../auth/Auth.tsx"

import Home from "../pages/home/Home.tsx"
import Index from "../layout/Index.tsx"

const Login = lazy(() => import('../pages/login/Login.tsx'))
const Mine = lazy(() => import('../pages/mine/Mine.tsx'))
const Question = lazy(() =>import('../pages/question/Question.tsx'))
const AddQuestions = lazy(() => import('../pages/addQuestions/AddQuestions.tsx'))
const ExamList = lazy( () => import('../pages/examList/ExamList.tsx'))
const CreateExam = lazy( () => import('../pages/createExam/CreateExam.tsx'))
const Test = lazy(() =>import('../pages/test/Test.tsx'))
const AddTest = lazy(() => import('../pages/addTest/addTest.tsx'))
const ClassList = lazy(() => import('../pages/conponents/classList/ClassList.tsx'))
const StudentList = lazy(() => import('../pages/conponents/studentList/StudentList.tsx'))
const User = lazy(() =>import('../pages/user/User.tsx'))
const Role = lazy(() =>import('../pages/role/Role.tsx'))
const Permissions = lazy(() =>import('../pages/permissions/Permissions.tsx'))

const routes = [
    {
        path:'/',
        element:<Navigate to='/home' />
    },
    {
        path:'/home',
        element: (
          <Index>
            <Auth>
              <Home />
            </Auth>
          </Index>
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
        path:'/mine',
        element: (
            <Index>
                <Auth>
                    <Mine />
                </Auth>
            </Index>
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
    },
    {
        path:'/examRecords',
        element: (
            <Index>
                <Auth>
                    <ExamList />
                </Auth>
            </Index>
        )
    },
    {
        path:'/createExam',
        element: (
            <Index>
                <Auth>
                    <CreateExam />
                </Auth>
            </Index>
        )
    },
    {
        path:'/addTest',
        element: (
            <Index>
                <Auth>
                    <AddTest />
                </Auth>
            </Index>
        )
    },
    {
        path: '/test',
        element: (
            <Index>
                <Auth>
                    <Test />
                </Auth>
            </Index>
        )
    },
  {
    path: '/user',
    element: (
        <Index>
          <Auth>
            <User />
          </Auth>
        </Index>
    )
  },
  {
    path: '/role',
    element: (
        <Index>
          <Auth>
            <Role />
          </Auth>
        </Index>
    )
  },
  {
    path: '/permissions',
    element: (
        <Index>
          <Auth>
            <Permissions />
          </Auth>
        </Index>
    )
  },
  {
    path:'*',
    element: (
        <Index>
            <div>
                404
            </div>
        </Index>
    )
  }
]

export default routes