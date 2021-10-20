import { createSlice } from '@reduxjs/toolkit'

const PaginationSlice = createSlice({
  name: 'pagination',
  initialState: {
    page: 1,
    pages: 1,
  },
  reducers: {
    resetPage(state) {
      state.page = 1
    },
    incrementPage(state, { payload }) {
      const { step = 1 } = payload
      const newPage = state.page + step

      if(newPage <= state.pages) {
        state.page = newPage
      }
    },
    updatePages(state, { payload }) {
      state.pages = payload.pages
    },
  }
})

// 提取 action creators 对象和 reducer
const { actions, reducer } = PaginationSlice
// 按照 name 提取和导出每个 action creator
export const { resetPage, incrementPage, updatePages } = actions
// 以 default 或具名 export 导出 reducer
export default reducer