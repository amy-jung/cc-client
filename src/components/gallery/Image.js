import React from 'react'
import ImageInfoTag from './ImageInfoTag'

// imageObj : { srcHash = '', userHash, transactions, isPublic }

export default ({ imageObj = {}, gallery }) => {
  // const fullURL = 'localhost:whatever' + imgHash
  // console.log(srcHash);
  const { srcHash, userHash, transactions, isPublic } = imageObj
  return (
    <div className='image'>
      <img src={srcHash} />
      <div className='info-tag-wrapper'>
        { gallery && <ImageInfoTag hash={userHash} status={isPublic}/> }
      </div>
    </div>
  )
}
