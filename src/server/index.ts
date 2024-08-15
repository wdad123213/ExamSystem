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
// 班级管理接口
// 班级列表数据
export const classListApi = (params?: classParams) => {
  return request.get('/studentGroup/list',{params})
}
// 删除班级数据
export const classDelApi = (id: any) => {
  return request.post(`/studentGroup/remove`,{id})
}
// 保存班级数据
export const classSaveApi = (id: any,it: any) => {
  return request.post('/studentGroup/update',{id,...it})
}
// 创建班级数据
export const classCreateApi = (params?: classParams) => {
  return request.get(`/studentGroup/create`,{params})
}

// 学生管理接口
// 学生列表数据
export const studentListApi = (params?: classParams) => {
  return request.get(`/student/list`,{params})
}
// 删除学生数据
export const studentDelApi = (id: any) => {
  return request.post(`/student/remove`,{id})
}
// 保存学生数据
export const studentSaveApi = (id: any,it: any) => {
  return request.post('/student/update',{id,...it})
}
// 创建学生数据
export const studentCreateApi = (time:number , params?: classParams ) => {
  return request.post(`/student/create?${time}`,params)
}


// 用户信息
export const userInfoApi = () => {
  return request.get('/user/info')
}

// 用户列表
export const userListApi = (params?:UserParams) => {
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

