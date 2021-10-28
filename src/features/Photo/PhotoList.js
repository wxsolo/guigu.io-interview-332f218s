import React from 'react'
import './PhotoList.css'
import { useSelector } from 'react-redux'

const PhotoList = ({ listData }) => {
  const { photoList } = useSelector((state) => state.photo)
  return (
    <div className="grid">
      {photoList.map((pic) => {
        const src = `http://farm${pic.farm}.static.flickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`
        return (
          <img className="card" key={pic.id} src={src} alt={pic.title}/>
        );
      })}
    </div>
  )
}

export default PhotoList