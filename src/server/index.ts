import request from './request.tsx'
import {
  LoginResponse,
  LoginParams,
  RemoveParams,
  UpdateParams
} from "../types/api"

export const loginApi = (params: LoginParams) => {
  return request.post<LoginResponse>('/login', params)
}

export const captchaApi = () => {
  return request.get('/login/captcha')
}

export const questionList = (type: string = '', subjectType: string = '',keyword:string='') => {
  // if (type === '' && subjectType === '' && keyword==='') return request.get(`/question/list`)
  // if (type !== '' && subjectType === '') return request.get(`/question/list?type=${type}`)
  // if (type === '' && subjectType !== '') return request.get(`/question/list?classify=${subjectType}`)
  // return request.get(`/question/list?question=${keyword}`)
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




export const searchList = (type:string='') => {
  return request.get(`/question/type/list?type=${type}`)
}

export const removeApi = (params:RemoveParams) => {
  return request.post(`/question/remove`, params)
}
export const updateApi = (params: UpdateParams) => {
  return request.post(`/question/update`,params)
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

