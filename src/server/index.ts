import request from './request.tsx'
import {
  BaseResponse,
  LoginResponse,
  LoginParams,
  RemoveParams,
  classParams,
  UserParams,
  UserResponse,
  UpdateParams,
  CreateQuestionParams,
  RoleResponse,
  UserUpdataParams,
  userStateParams,
  createTestType,
  RoleCreateParams,
  roleUpdataParams,
  permissionUpdateType,
  permissionCreateType,
  PermissionResponse
} from "../types/api"

export const loginApi = (params: LoginParams) => {
  return request.post<LoginResponse>('/login', params)
}

export const captchaApi = () => {
  return request.get('/login/captcha')
}

export const questionList = (type: string = '', subjectType: string = '', keyword: string = '') => {
  let query = '';
  if (type) query += `type=${type}&`;
  if (subjectType) query += `classify=${subjectType}&`;
  if (keyword) query += `question=${keyword}`;
  if (query.endsWith('&')) {
    query = query.slice(0, -1);
  }
  const url = query ? `/question/list?${query}` : `/question/list`;
  return request.get(url);
}

export const searchList = (type: string = '') => {
  return request.get(`/question/type/list?type=${type}`)
}

export const removeApi = (params: RemoveParams) => {
  return request.post(`/question/remove`, params)
}

export const createQuestion = (params: CreateQuestionParams,id:number) => {
  return request.post(`/question/create?${id}`, params)
}
export const updateApi = (params: UpdateParams) => {
  return request.post(`/question/update`,params)
}
//考试列表
export const examListApi = () => {
  return request.get('/examination/list?creator=root')
}

// 删除考试
export const removeExamListApi = (id:number)=>{
  return request.get(`/examination/remove?${id}`)
}
// 班级管理接口
// 班级列表数据
export const classListApi = (params?: classParams) => {
  return request.get('/studentGroup/list', { params })
}
// 删除班级数据
export const classDelApi = (id: any) => {
  return request.post(`/studentGroup/remove`, { id })
}
// 保存班级数据
export const classSaveApi = (id: any, it: any) => {
  return request.post('/studentGroup/update', { id, ...it })
}
// 创建班级数据
export const classCreateApi = ( time: number , params?: classParams) => {
  return request.post(`/studentGroup/create?${time}`, params)
}

// 学生管理接口
// 学生列表数据
export const studentListApi = (params?: classParams) => {
  return request.get(`/student/list`, { params })
}
// 删除学生数据
export const studentDelApi = (id: any) => {
  return request.post(`/student/remove`, { id })
}
// 保存学生数据
export const studentSaveApi = (id: any, it: any) => {
  return request.post('/student/update', { id, ...it })
}
// 创建学生数据
export const studentCreateApi = (time: number, params?: classParams) => {
  return request.post(`/student/create?${time}`, params)
}

// 用户信息
export const userInfoApi = () => {
  return request.get('/user/info')
}

// 用户列表
export const userListApi = (params?: UserParams) => {
  return request.get<UserResponse>('/user/list', {
    params
  })
}

// 用户更新状态
export const userStateApi = (params: userStateParams) => {
  return request.post<BaseResponse>('/user/update', params)
}

// 用户添加
export const userCreateApi = (params: userStateParams) => {
  return request.post<BaseResponse>('/user/create', params)
}

// 用户删除
export const userDelApi = (id: string) => {
  return request.post<BaseResponse>('/user/remove', { id })
}

// 角色列表
export const userRoleList = () => {
  return request.get<RoleResponse>('/role/list')
}

// 角色创建
export const roleCreateApi = (params:RoleCreateParams) => {
  return request.post<BaseResponse>('/role/create',params)
}

// 角色删除
export const roleDelApi = (id:string) => {
  return request.post<BaseResponse>('/role/remove',{ id })
}

// 角色更新
export const roleUpdataApi = (params: roleUpdataParams) => {
  return request.post<BaseResponse>('/role/update',params)
}

// 上传头像
export const userAvatarApi = (avatar: string | File | Blob) => {
  const formData = new FormData()
  formData.append('avatar', avatar)
  return request.post('/profile', formData)
}

// 修改个人信息
export const userUpdateInfoApi = (params:UserUpdataParams) => {
  return request.post<BaseResponse>('/user/update/info',params)
}
// 查询试卷详情id
export const examDetailApi = (id:number) => {
  return request.get(`/exam/detail?id=${id}`)
}
// 搜索试卷
export const examinationlApi = (v:any) => {
  return request.get(`examination/list?${v}`)
}
// 创建考试试卷 https://zyxcl.xyz/exam_api/examination/create?1723711365616
export const createTestApi = (time:number, createDate:createTestType) => {
  return request.post(`/examination/create?${time}`, createDate)
}

// 权限管理
export const permissionListApi = () => {
  return request.get<PermissionResponse>(`/permission/list`)
}

// 权限保存
export const permissionUpdateApi = (id: number, it: permissionUpdateType) => {
  return request.post(`/permission/update`,{id , ...it})
}

// 权限删除
export const permissionRemoveApi = (id: number) => {
  return request.post(`/permission/remove`,{ id })
}

// 权限新增
export const permissionCreate = (params: permissionCreateType) => {
  return request.post(`/permission/create`, params)
}
