import React, { Component } from 'react';
import MaterialIcon from 'material-icons-react'

class SideNav extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="side-nav">
        <div className="side-nav-items">
          <ul>
          
            <li className='top-lvl inbox'><span><MaterialIcon icon='message'/>Inbox <span className='unread'>&nbsp;(5 unread)</span></span></li>
            <li className='top-lvl has-children'>
              <span><MaterialIcon icon='photo_library'/>MyImages</span>
              <ul>
                <li className='sub-lvl active'>Uploads</li>
                <li className='sub-lvl'>Downloads</li>
              </ul>
            </li>
            <li className='top-lvl'><span><MaterialIcon icon='settings'/>Account</span></li>
          </ul>
        </div>
      </div>
    )
  }
}

export default SideNav;
