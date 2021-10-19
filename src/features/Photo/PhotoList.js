import React from 'react'
import './PhotoList.css'

const PhotoList = ({ listData }) => {
  return (
    <div className="grid">
      {listData.map((pic) => {
        const src = `http://farm${pic.farm}.static.flickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`
        return (
          <img className="card" key={pic.id} src={src} alt={pic.title}/>
        );
      })}
    </div>
  )
}

export default PhotoList