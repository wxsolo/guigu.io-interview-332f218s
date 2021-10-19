import React from 'react'
import './LoadMore.css'

const LoadMore = ({ onLoadMore }) => {
    return (
        <div className="pagination">
          <button className="pagination__load-more" onClick={onLoadMore}>load more</button>
        </div>
    )
}

export default LoadMore