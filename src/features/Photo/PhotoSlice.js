import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { updatePages } from '../Pagination/PaginationSlice'

const requestUrl = `https://api.flickr.com/services/rest/`
const requestParams = {
  text: '',
  page: 1,
  per_page: 20,
  method: 'flickr.photos.search',
  api_key: '3e7cc266ae2b0e0d78e279ce8e361736',
  format: 'json',
  nojsoncallback: 1,
  safe_search: 1,
}

// 首先，创建 thunk
const searchFlickrPhotos = createAsyncThunk(
  'photo/searchFlickrPhotos',
  async (addParams, { dispatch }) => {
    const params = { 
      ...requestParams,
      ...addParams,  // { text, page, }
    } 
    console.log('---fetchData request parms---', params)
    const res = await axios.get(requestUrl, { params })
    console.log('---fetchData response---', res)

    const { stat, photos: { photo, pages } } = res.data

    // update pages
    dispatch(updatePages({ pages }))

    return { 
      stat,
      photo
    }
  }
)

const PhotoSlice = createSlice({
  name: 'photo',
  initialState: {
    loading: true,
    photoList: [],
  },
  reducers: {
    clearPhotoList(state, { payload }) {
      state.photoList = []
    },
  },
  extraReducers: {
    [searchFlickrPhotos.pending](state) {
      state.loading = true
    },
    // 在此处为其他 action type 添加 reducers，并根据需要处理加载状态
    [searchFlickrPhotos.fulfilled]: (state, { payload }) => {
      const { stat, photo } = payload
      if(stat === 'ok') {
        state.photoList = state.photoList.concat(photo)
      }
      state.loading = false
    },
    [searchFlickrPhotos.rejected](state, err) {
      state.loading = false
      console.log('---fetchData error---', err)
    },
  },
})



// 提取 action creators 对象和 reducer
const { actions, reducer } = PhotoSlice
// 按照 name 提取和导出每个 action creator
export const { clearPhotoList } = actions
export { searchFlickrPhotos }
// 以 default 或具名 export 导出 reducer
export default reducer