import React from 'react'

export default ({ hash = 'hashhashhashhashhashhashhash', status = 'public' }) => {
  return (
    <div className='img-info-tag'>
      <span className='hash' >{ hash }</span>
      <span className='status'>{ status }</span>
    </div>
  )
}
