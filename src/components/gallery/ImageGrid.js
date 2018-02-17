import React from 'react'
import Image from './Image'

export default ({ images, openImageModal }) => {
  const imageGrid = images.map((image, i) => (
    <div key={i}><div onClick={() => openImageModal(image)}><Image imageSRC={image} /></div></div>
  ))
  return (
    <div>
      <div className='image-grid'>{ imageGrid }</div>
    </div>
  )
}
