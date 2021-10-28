import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './FlickrPhotosSearch.css'
import SearchBox from '../features/Search/SearchBox'
import Loading from '../features/Loading/Loading'
import PhotoList from '../features/Photo/PhotoList'
import { searchFlickrPhotos } from '../features/Photo/PhotoSlice'
import LoadMore from '../features/Pagination/LoadMore'

const FlickrPhotosSearch = () => {
  const dispatch = useDispatch()
  const { text, doSearchFlag } = useSelector((state) => state.search)
  const { loading } = useSelector((state) => state.photo)
  const { page } = useSelector((state) => state.pagination)
  
  useEffect(() => {
    dispatch(searchFlickrPhotos({ text, page }))
  }, [doSearchFlag, page])

  return (
     <div className="container">
      <main className="main">
        <SearchBox />
        { loading ? <Loading /> : null }
        <PhotoList />
        <LoadMore />
      </main>
    </div>
  )
}

export default FlickrPhotosSearch