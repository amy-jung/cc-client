import React from 'react'
import { Link } from 'react-router'
import MaterialIcon from 'material-icons-react'

export default ({ isLoggedIn, handleUploadClick }) => {
  return (
    <div className='upload-btn'>
      { isLoggedIn
        ? <div onClick={handleUploadClick}><button >Upload <MaterialIcon icon='add' size={15} /></button></div>
        : <Link to='/login'><button >Upload <MaterialIcon icon='add' size={15}  /></button></Link>
      }
    </div>
  )
}
