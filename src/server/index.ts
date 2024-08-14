import request from './request.tsx'
import {
  LoginResponse,
  LoginParams,
  classParams,
  studentParams
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

export const userInfoApi = () => {
  return request.get('/user/info')
}

