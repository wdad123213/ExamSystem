import { createSlice } from '@reduxjs/toolkit'



interface userState {
  userName:string
}

// 初始值
const initialState: userState = {
  userName: '小明'
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  
  }
})


export default userSlice.reducer
