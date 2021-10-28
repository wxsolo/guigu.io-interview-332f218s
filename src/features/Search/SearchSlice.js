import { createSlice } from '@reduxjs/toolkit'

const SearchSlice = createSlice({
  name: 'search',
  initialState: {
    text: 'kittens',
    doSearchFlag: 0,
  },
  reducers: {
    updateSearchText(state, { payload }) {
      const { text } = payload
      state.text = text.trim()
    },
    doSearch(state) {
      state.doSearchFlag += 1
    }
  }
})

// 提取 action creators 对象和 reducer
const { actions, reducer } = SearchSlice
// 按照 name 提取和导出每个 action creator
export const { updateSearchText, doSearch } = actions
// 以 default 或具名 export 导出 reducer
export default reducer