import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import authorizedAxiosInstance from 'utilities/customAxios'
import {API_ROOT} from 'utilities/constants'
import { mapOrder } from 'utilities/sorts'

const initialState = {
    currentFullBoard : null
}

// gọi api  
export const fetchFullBoardDetailsAPI = createAsyncThunk('activeBoard/fetchFullBoardDetailsAPI', async (boardId)=>{
    const request = await authorizedAxiosInstance.get(`${API_ROOT}/v1/boards/${boardId}`)
    return request.data
})


export const activeBoardSlice = createSlice({
  name: 'activeBoard',
  initialState,
  reducers: {
    //đồng bộ trong ram
    updateCurrentFullBoard : (state , action)=>{
        state.currentFullBoard = action.payload 
    }
  },
  //đi voi những hành động thuộc dữ liệu bất đồng bộ gọi api 
  extraReducers : (builder)=>{
    //trường hợp fullfiled có data rồi
    builder.addCase( fetchFullBoardDetailsAPI.fulfilled , (state, action) => {
        console.log('fetch xong')
        let fullBoard = action.payload 
        //logic xủ lý ở đây, sắp xếp
        fullBoard.columns = mapOrder(fullBoard.columns, fullBoard.columnOrder, '_id')
        fullBoard.columns.forEach( c=>{
            c.cards =  mapOrder(c.cards, c.cardOrder, '_id')
        })

        state.currentFullBoard = fullBoard
    })
  }
})

// Action creators are generated for each case reducer function
export const { updateCurrentFullBoard } = activeBoardSlice.actions

//Selector
export const selectCurrentFullBoard = (state)=>{
    return state.activeBoard.currentFullBoard
}

export default activeBoardSlice.reducer