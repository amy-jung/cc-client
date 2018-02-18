import React, { Component } from 'react'
import 'normalize.css'
// import 'material-design-icons'
import './styles/main.css'
import Header from './components/layout/Header'
import SideNav from './components/layout/SideNav'

class App extends Component {
  render() {
    const showSideNav = this.props.location.pathname !== '/' && this.props.location.pathname !== '/login'
    return (
      <div className="App">
        <Header />
        {/* { showSideNav && <SideNav /> } */}
        <div className='side-nav-wrapper'>
          <SideNav />
        </div>
        <div className='main-wrapper'>{ this.props.children }</div>
      </div>
    );
  }
}

export default App
