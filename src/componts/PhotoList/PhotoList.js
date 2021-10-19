import React, { useState, useEffect } from 'react';
import './PhotoList.css';

const List = () => {
  const [picList, setPicList]  = useState([])
  const [page, setPage] = useState(1)
  const [searchText, setSearchText]  = useState('kittens')
  
  useEffect(async () => {

    const res = await fetch(
        `https://api.flickr.com/services/rest/?text=${searchText}&page=${page}&method=flickr.photos.search&api_key=3e7cc266ae2b0e0d78e279ce8e361736&format=json&nojsoncallback=1&safe_search=1`
    );

    const data = await res.json();
    
    if(data.stat === 'ok') {
      setPicList(data.photos.photo)
    } else {
      setPicList([])
    }
    
  }, [page])

  function doSearch() {
    if (searchText === '') return

    console.log('doSearch searchText is', searchText)

    setPage(1)
  }

  function loadMore () {
    // todo 0 < page <= totalPage
    // todo apped data
    setPage(page + 1)
  }

  return (
     <div className="container">
      <main className="main">
        <div className="search-box">
          <div className="search-input">
            <input defaultValue={searchText} onChange={(e)=> setSearchText(e.target.value) } />
          </div>
          <div className="search-btn">
            <button  onClick={() => doSearch() }>search</button>
          </div>
        </div>
        <div className="grid">
          {picList.map((pic) => {
            const src = `http://farm${pic.farm}.static.flickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`
            return (
              <img className="card" key={pic.id} src={src} />
            );
          })}
        </div>
        <div className="pages">
          <button className="page-load-more" onClick={() => { loadMore() } }>load more</button>
        </div>
      </main>
    </div>
  )
}

export default List