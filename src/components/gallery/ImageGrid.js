import React from 'react'
import Image from './Image'

export default ({ images }) => {
  const imageGrid = images.map((image, i) => (
    <div key={i}><Image imageSRC={image} /></div>
  ))
  return (
    <div>
      <div className='image-grid'>{ imageGrid }</div>
    </div>
  )
}
