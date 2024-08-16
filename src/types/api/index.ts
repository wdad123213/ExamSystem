export interface BaseResponse {
  code: number;
  msg: string;
}

export interface BaseValuse<T> {
  code: number;
  msg: string;
  data: T
}

export interface BaseReturn<T> {
  list:T
  total:number
  totalPage:number
}

type Token = {
  token: string
}

// 登录
export type LoginParams = Record<'username' | 'password'|'code', string>
export type LoginResponse = BaseResponse & {
  data: Token
}


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

export type classParams = {
  page: string | number,
  pagesize: string | number,
  name?: String,
  teacher?: String,
  classify?: String,
  
}
export type studentParams = {
  [x: string]: string | number,
  page: string | number;
  pagesize: string | number;
  className: string;
  age: string | number;
  sex: string;
  username: string;
  name: string;
  teacher: string;
  classify: string;
}

export type studentObj = {
  page: string | number,
  pagesize: string | number,
  className: string,
  age: string | number,
  sex: string,
  username: string,
  name?: string;
  teacher?: string;
  classify?: string;
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

// 用户信息
export type userInfo = {
  _id: string,
  username: string,
  password: string,
  status: number
  __v: number
  avator?: string
  age?: number
  email?: string
  sex?: '男' | '女'
}

// 用户更新
export type userStateParams = {
  id?: string
  status: number
  password?: string
  username?: string
  confirm?:string
}

// 用户返回值
type User = BaseReturn<UserListType[]>

export type UserParams = {
  page?:number
  pagesize?: number
  status?:number
  username?:string
}
export type UserResponse = BaseValuse<User>

// 角色列表
export type RoleItemType = {
  createTime: number
  creator: string
  disabled: boolean
  name: string
  permission: string[]
  value : string
  __v: number
  _id: string
}

// 角色返回值
export type RoleReturn = BaseReturn<RoleItemType[]>

// 角色接口返回值
export type RoleResponse = BaseValuse<RoleReturn>

// 基础下拉框
export type OptionItem = {
  value: string,
  label: string
}

// 用户更新
export type UserUpdataParams = {
  [x: string]: string | number | undefined
  age?: number
  email?: string
  sex?: string
  username?: string
  avator?: string
}
