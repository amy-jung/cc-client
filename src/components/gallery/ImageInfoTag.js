import React from 'react'

export default ({ imageData = { hash: 'hashhashhashhashhashhashhash', status: 'public' } }) => {
  return (
    <div className='img-info-tag'>
      <span className='hash' >{ imageData.hash }</span>
      <span className='status'>{ imageData.status }</span>
    </div>
  )
}
