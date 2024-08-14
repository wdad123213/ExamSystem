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
//考试列表
export const examListApi = ()=>{
  return request.get('/examination/list?creator=root')
}
// 删除考试 
// export const removeExamListApi = (id:string)=>{
//   return request.get('/examination/remove',{
//     id
//   })
// }

export const classListApi = () => {
  return request.get('/studentGroup/list')
}

export const studentListApi = (resList:string) => {
  return request.get('/student/list',{resList})
}

export const userInfoApi = () => {
  return request.get('/user/info')
}

// 查询试卷详情id
export const examDetailApi = (id:number) => {
  return request.get(`/exam/detail?id=${id}`)
}
// /examination/list?name=123
export const examinationlApi = (v) => {
  return request.get(`examination/list?${v}`)
}

