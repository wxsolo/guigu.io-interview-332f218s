import React, { useState } from 'react'
import './SearchBox.css'

const SearchBox = ({ value, onSearchTextChange, onSearch }) => {
    return (
        <div className="search-box">
          <div className="search-input">
            <input defaultValue={value} onChange={onSearchTextChange} />
          </div>
          <div className="search-btn">
            <button  onClick={onSearch}>search</button>
          </div>
        </div>
    )
}

export default SearchBox