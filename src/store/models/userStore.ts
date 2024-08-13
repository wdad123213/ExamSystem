import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {userInfoApi} from "../../server"
import {userInfo} from "../../types/api"

interface userState {
  userInfo: userInfo
}

export const getUserInfo = createAsyncThunk('getUserInfo', async () => {
  const res = await userInfoApi()
  return res.data
})


// 初始值
const initialState: userState = {
  userInfo: {} as userInfo
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers:builder =>  {
    builder
      .addCase(getUserInfo.fulfilled, (state,action) => {
        state.userInfo = action.payload.data
        console.log('获取信息成功')
      })
  }
})


export default userSlice.reducer
