import { configureStore, createSlice } from '@reduxjs/toolkit'

let tab = createSlice({
  name : 'tab',
  initialState : '기존',
  reducers : {
    editorial(state){
      state = '';
      return 'editorial'
    },
    commercial(state){
      state = '';
      return 'commercial'
    },
    portrait(state){
      state = '';
      return 'portrait'
    }
  }
})



export default configureStore({
  reducer: {
    tab : tab.reducer
  }
}) 

export let { editorial, commercial, portrait } = tab.actions