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

export const classListApi = () => {
  return request.get('/studentGroup/list')
}

export const studentListApi = () => {
  return request.get('/student/list')
}

export const userInfoApi = () => {
  return request.get('/user/info')
}

