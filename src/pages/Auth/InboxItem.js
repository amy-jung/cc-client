import React from 'react'
import ApproveToggle from './ApproveToggle'

export default ({ item }) => {
  return (
    <div class='inbox-item'>
      { item.pending && <ApproveToggle /> }
    </div>
  )
}
