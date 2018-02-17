import React from 'react'

export default ({ imageSRC }) => {
  // const fullURL = 'localhost:whatever' + imgHash
  return (
    <div className='image'>
      <img src={imageSRC} />
    </div>
  )
}
