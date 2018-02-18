import React from 'react'
import { Link } from 'react-router'
import { HiddenOnlyAuth, VisibleOnlyAuth } from '../wrappers.js'
import LoginButtonContainer from '../ui/loginbutton/LoginButtonContainer'
import LogoutButtonContainer from '../ui/logoutbutton/LogoutButtonContainer'
import ImageSearchBar from './ImageSearchBar'
import MaterialIcon from 'material-icons-react'
// const Logo = require('./CC_Logo.png')

export default ({ isLoggedIn }) => {
  const OnlyAuthLinks = VisibleOnlyAuth(() =>
    <span>
      <li className="pure-menu-item">
        <Link to="/profile" className="pure-menu-link">Profile</Link>
      </li>
      <LogoutButtonContainer />
    </span>
  )
  const OnlyGuestLinks = HiddenOnlyAuth(() =>
    <span>
      {/* <li className="pure-menu-item">
        <Link to="/login" className="pure-menu-link">Sign Up</Link>
      </li> */}
      <LoginButtonContainer />
    </span>
    )
    console.log(isLoggedIn);
  return (
    <div className='header'>
      <div className='logo'><Link to="/"><img alt='logo' src='/CC_Logo.png'/></Link></div>
      <ImageSearchBar />
      <nav className="navbar">
        { isLoggedIn
          ? <Link to="/profile" ><MaterialIcon icon='account_circle' /></Link>
          : <ul className="menu">
            <OnlyGuestLinks />
            <OnlyAuthLinks />
          </ul>
        }
          
        </nav>
    </div>
  )
}
