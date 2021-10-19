import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './PhotoSearch.css'
import SearchBox from '../Search/SearchBox'
import Loading from '../Loading/Loading'
import PhotoList from '../Photo/PhotoList'
import LoadMore from '../Pagination/LoadMore'

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

const PhotoSearch = () => {
  const [searchText, setSearchText]  = useState('kittens')
  const [search, setSearch] = useState(Symbol())
  const [loading, setLoading] = useState(true)
  const [picList, setPicList]  = useState([])
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)

  const fetchData = async ()=> {
    const params = { 
        ...requestParams,
        text: searchText,
        page,
      }

      try {
        setLoading(true)
        const res = await axios.get(requestUrl, { params })

        console.log('---fetchData response---', res)

        const { data } = res
            
        if(data.stat === 'ok') {
          const { photos: { photo, pages } } = data
          setPicList(picList.concat(photo))
          setTotalPage(pages)
        }
        setLoading(false)
      } catch (e) {
        console.log('---fetchData error---', e)
      } finally {
        setLoading(false)
      }
      
  }
  
  useEffect(() => {
    fetchData()
  }, [search, page])

  const handleSearchTextChange = (e) => {
    const searchText = e.target.value.trim()

    console.log('---handleSearchTextChange---', searchText)

    setSearchText(searchText)
  }

  const handleSearch = () => {
    if (searchText === '') return

    console.log('---handleSearch searchText is---', searchText)
    // clear list
    setPicList([])
    // reset to page = 1
    setPage(1)
    // trigger search
    setSearch(Symbol())
  }

  const handleLoadMore = () => {
    const nextPage = page + 1
    // todo 0 < page <= totalPage
    // todo apped data

    console.log('---handleLoadMore page is---', nextPage)

    setPage(nextPage)
  }

  return (
     <div className="container">
      <main className="main">
        <SearchBox 
          value={searchText} 
          onSearchTextChange={handleSearchTextChange}
          onSearch={handleSearch}
        />
        { loading ? <Loading /> : null }
        <PhotoList listData={picList} />
        { page < totalPage ? <LoadMore onLoadMore={handleLoadMore} /> : null}
        
      </main>
    </div>
  )
}

export default PhotoSearch