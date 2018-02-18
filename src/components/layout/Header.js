import React from 'react'
import { Link } from 'react-router'
import { HiddenOnlyAuth, VisibleOnlyAuth } from '../wrappers.js'
import LoginButtonContainer from '../ui/loginbutton/LoginButtonContainer'
import LogoutButtonContainer from '../ui/logoutbutton/LogoutButtonContainer'
import ImageSearchBar from './ImageSearchBar'

export default () => {
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
  return (
    <div className='header'>
      <div className='logo'><h1><Link to="/"></Link></h1></div>
      <ImageSearchBar />
      <nav className="navbar">
          <ul className="menu">
            <OnlyGuestLinks />
            <OnlyAuthLinks />
          </ul>
        </nav>
    </div>
  )
}
