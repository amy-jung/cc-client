import React, { Component } from 'react';

import Gallery from '../../components/gallery/Gallery'

class Home extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <Gallery userStatus={'unauth'} />
      </div>
    );
  }
}

export default Home;
