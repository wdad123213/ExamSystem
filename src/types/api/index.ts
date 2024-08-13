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
