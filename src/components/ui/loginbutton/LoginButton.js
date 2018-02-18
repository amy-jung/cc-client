import React from 'react'

const LoginButton = ({ onLoginUserClick }) => {
  return(
    <li className="login-btn">
        <a href="#" className="pure-menu-link" onClick={(event) => onLoginUserClick(event)}>Log In</a>
    </li>
  )
}

export default LoginButton
