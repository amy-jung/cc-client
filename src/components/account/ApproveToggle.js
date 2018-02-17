import React from 'react'

export default ({ methods: { accept, decline } }) => {
  return (
    <div>
      <span onClick={accept}>ACCEPT</span>
      <span onClick={decline}>DECLINE</span>
    </div>
  )
}
