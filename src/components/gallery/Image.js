import React from 'react'
import ImageInfoTag from './ImageInfoTag'

export default ({ imageObj : { srcHash, userHash, transactions, isPublic }, gallery }) => {
  // const fullURL = 'localhost:whatever' + imgHash
  return (
    <div className='image'>
      <img src={srcHash} />
      <div className='info-tag-wrapper'>
        { gallery && <ImageInfoTag hash={userHash} status={isPublic}/> }
      </div>
    </div>
  )
}
