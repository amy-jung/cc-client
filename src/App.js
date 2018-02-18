import React, { Component } from 'react'
import { connect } from 'react-redux'
import 'normalize.css'
// import 'material-design-icons'
import './styles/main.css'
import Header from './components/layout/Header'
import SideNav from './components/layout/SideNav'

class App extends Component {
  
  render() {
    const isLoggedIn = this.props.userStatus !== null
    const showSideNav = this.props.location.pathname !== '/' && this.props.location.pathname !== '/login'
    return (
      <div className="App" style={{display: showSideNav ? 'grid' : 'block'}}>
        <Header isLoggedIn={isLoggedIn} />
        { showSideNav && 
          <div className='side-nav-wrapper'>
            <SideNav />
          </div>
        }
        <div className='main-wrapper' >{ this.props.children }</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userStatus: state.user.data
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
