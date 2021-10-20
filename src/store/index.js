import { configureStore } from '@reduxjs/toolkit'
import PaginationSlice from '../features/Pagination/PaginationSlice'
import PhotoSlice from '../features/Photo/PhotoSlice'
import SearchSlice from '../features/Search/SearchSlice'
// configureStore创建一个redux数据
export default configureStore({
 reducer: {
    pagination: PaginationSlice,
    photo: PhotoSlice,
    search: SearchSlice,
  },
})