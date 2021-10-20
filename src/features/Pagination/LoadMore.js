import React, { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './LoadMore.css'
import { incrementPage } from './PaginationSlice' 

const LoadMore = () => {
  const dispatch = useDispatch()
  const { page, pages } = useSelector((state) => state.pagination)
  const showLoadMore = page < pages

  const handleLoadMore = () => dispatch(incrementPage({ step: 1 }))

  return (
    <Fragment>
      {
        showLoadMore ? (<div className="pagination">
          <button className="pagination__load-more" onClick={handleLoadMore}>load more</button>
        </div>) : null
      }
    </Fragment>
  )
}

export default LoadMore