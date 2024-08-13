import request from './request.tsx'
import {
  LoginResponse,
  LoginParams
} from "../types/api"

export const loginApi = (params: LoginParams) => {
  return request.post<LoginResponse>('/login', params)
}

export const captchaApi = () => {
  return request.get('/login/captcha')
}

export const questionList = () => {
  return request.get('/question/list')
}
<<<<<<< HEAD
//考试列表
export const examListApi = ()=>{
  return request.get('/examination/list?creator=root')
}
// 删除考试 http://192.168.28.11:3001/examination/remove
export const removeExamListApi = ()=>{
  return request.get('/examination/remove')
}
=======

export const classListApi = () => {
  return request.get('/studentGroup/list')
}

export const studentListApi = () => {
  return request.get('/student/list')
}

export const userInfoApi = () => {
  return request.get('/user/info')
}

>>>>>>> 088b2143cd72951032fcf4f11f5986e1f6c74c53
