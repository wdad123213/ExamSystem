import request from './request.tsx'
import {
  BaseResponse,
  LoginResponse,
  LoginParams,
  classParams,
  studentParams,
  UserParams,
  UserResponse,
  userStateParams
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
export const removeExamListApi = ()=>{
  return request.get('/examination/remove')
}

export const classListApi = (params: classParams) => {
  return request.get('/studentGroup/list',{...params})
}

export const classDelApi = (id: any) => {
  return request.post(`/studentGroup/remove`,{id})
}

export const classSaveApi = (id: any,it: any) => {
  return request.post('/studentGroup/update',{id,...it})
}

export const studentListApi = (params: studentParams) => {
  return request.get('/student/list',{...params})
}

export const studentDelApi = (id: any) => {
  return request.post(`/student/remove`,{id})
}

export const studentSaveApi = (id: any,it: any) => {
  return request.post('/student/update',{id,...it})
}

// 用户信息
export const userInfoApi = () => {
  return request.get('/user/info')
}

// 用户列表
export const userListApi = (params:UserParams) => {
  return request.get<UserResponse>('/user/list', {
    params
  })
}

// 用户更新状态
export const userStateApi = (params:userStateParams) => {
  return request.post<BaseResponse>('/user/update', params)
}

// 用户添加
export const userCreateApi = (params:userStateParams) => {
  return request.post<BaseResponse>('/user/create',params)
}

// 用户删除
export const userDelApi = (id:string) => {
  return request.post<BaseResponse>('/user/remove',{id})
}

