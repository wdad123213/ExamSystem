export interface BaseResponse {
  code: number;
  msg: string;
}

export interface BaseValuse<T> {
  code: number;
  msg: string;
  values: T
}


type Token = {
  token: string
}

// 登录
export type LoginParams = Record<'username' | 'password'|'code', string>
export type LoginResponse = BaseResponse & {
  data: Token
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
  startTime?:  String
  _id?: string
  status?: number
}
// 用户信息
export type userInfo = {
  _id: string,
  username: string,
  password: string,
  status: number
  __v: number
  avator?: string
}
// 创建考试
export type createExam={
  name:string,
  classify: string,
  examId: string,
  group:string,
  examiner:string,
  startTime: number,
  endTime:number
}