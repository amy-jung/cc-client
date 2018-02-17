import React, { Component } from 'react'

import 'normalize.css'
import './styles/main.css'
import Header from './components/layout/Header'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        { this.props.children }
      </div>
    );
  }
}

export default App
