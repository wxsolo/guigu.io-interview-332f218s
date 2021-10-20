import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import './SearchBox.css'
import { updateSearchText, doSearch } from './SearchSlice'
import { clearPhotoList } from '../Photo/PhotoSlice'
import { resetPage } from '../Pagination/PaginationSlice'


const SearchBox = () => {
  const dispatch = useDispatch()
  const { text } = useSelector((state) => state.search)
  const [searchText, setSearchText] = useState(text)

  // todo debounce
  const handleSearchTextChange = (e) => {
    const searchText = e.target.value.trim()
    setSearchText(searchText)
  }

  const handleSearch = () => {
    if (searchText === '') return

    console.log('---handleSearch searchText is---', searchText)
    // update searchText to text
    dispatch(updateSearchText({text: searchText}))
    // reset to page = 1
    dispatch(resetPage())
    // clear list
    dispatch(clearPhotoList())
    // trigger search
    dispatch(doSearch())
  }

  return (
      <div className="search-box">
        <div className="search-input">
          <input defaultValue={searchText} onChange={handleSearchTextChange} />
        </div>
        <div className="search-btn">
          <button  onClick={handleSearch}>search</button>
        </div>
      </div>
  )
}

export default SearchBox