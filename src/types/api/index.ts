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
export type LoginParams = Record<'username' | 'password' | 'code', string>
export type LoginResponse = BaseResponse & {
  data: Token
}

//试题库
export type SearchParams = Record<'page' | 'pageSize' | 'keyWord' | 'type' | 'name', string>
export type RemoveParams = {
  id: string
}
export type UpdateParams = {
  id: string,
  question: string
}


export type CreateQuestionParams = {
  question: string,
  decs: string,
  answer: string | string[],
  classify: string,
  options: string[],
  type: string
}
export interface ExamListDataType {
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
  startTime?: String
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

export type classCreat = {
  classify: string;
  name: string
  students: string[]
  teacher: string
  page: string | number
  pagesize: string | number
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

export type studentCreat = {
  page: string;
  pagesize: string;
  age: number | string;
  avator: string;
  className: string;
  email: string;
  idCard: string;
  password: number | string;
  sex: string;
  status: number;
  username: string;
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
  rowKey?: string
  avator?: string
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
  confirm?: string
}

// 用户返回值
type User ={
  list:UserListType[]
  total:number
  totalPage:number
}

export type UserParams = {
  page?: number
  pagesize?: number
  status?: number
  username?: string
}
export type UserResponse = BaseValuse<User>
// 创建考试
export type createExam={
  name?:string,
  classify?: string,
  examId?: string,
  creator?: string,
  group?:string,
  examiner?:string,
  startTime?: number|string,
  endTime?:number|string,
  createTime?:string|number,
  status?:string
}
export type examcheng ={
  classify?: string
  createTime?: number
  creator?: string
  endTime?: number
  examId?: string
  examiner?: string[]
  group?: null[]
  name?: string
  questionsList?:{
          answer:  string
          classify: string
          options:  string[]
          question:  string
          type:  string
          __v: number
          _id:  string}[],
  startTime?: number
  status?: number
  __v?: number
  _id?: string
  key?:string
}
// 创建考试
export interface createTestType {
  classify:string;
  endTime:string|number;
  examId:string;
  examiner:string;
  group:string;
  name:string;
  startTime:string|number;
}


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

// 创建角色
export type RoleCreateParams = Record<'name' | 'value', string>

export type roleUpdataParams = {
  id: string
  permission: string[]
}