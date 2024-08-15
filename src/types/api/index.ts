export interface BaseResponse {
  code: number;
  msg: string;
}

export interface BaseValuse<T> {
  code: number;
  msg: string;
  data: T
}


type Token = {
  token: string
}

// 登录
export type LoginParams = Record<'username' | 'password'|'code', string>
export type LoginResponse = BaseValuse<Token>


export interface DataType {
  key?: string;
  classify?: string
  createTime?: string
  creator?: string
  endTime?: string
  examId?: string
  examiner?: string[]
  group?: string[]
  name?: string
  questionsList?: string[]
  startTime?:  String
  _id?: string
  status?: number
}

// 用户返回值
type User ={
  list:UserListType[]
  total:number
  totalPage:number
}

export interface UserListType {
  creator: string
  lastOnlineTime: number
  password: string
  role: string[]
  status: number
  username: string
  __v: number
  _id: string
  rowKey?:string
  avator?:string
}

export type UserParams = {
  page?:number
  pagesize?: number
  status?:number
  username?:string
}
export type UserResponse = BaseValuse<User>


// 用户信息
export type userInfo = {
  _id: string,
  username: string,
  password: string,
  status: number
  __v: number
  avator?: string
}

// 用户更新
export type userStateParams = {
  id?: string
  status: number
  password?: string
  username?: string
  confirm?:string
}