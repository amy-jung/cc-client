import React from 'react'
import { Link } from 'react-router'
import MaterialIcon from 'material-icons-react'

export default ({ isLoggedIn = true }) => {
  return (
    <div className='upload-btn'>
      { isLoggedIn
        ? <Link to='/upload'><button >Upload <MaterialIcon icon='add' size={15} /></button></Link>
        : <Link to='/login'><button >Upload <MaterialIcon icon='add' size={15}  /></button></Link>
      }
    </div>
  )
}
