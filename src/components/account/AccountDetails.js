import React, { Component } from 'react';
import { binder } from '../../utils/'

class AccountDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      bio: ''
    }
    binder(this, ['handleInput', 'handleSubmit'])
  }

  handleInput (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit (e) {
    e.preventDefault()
    // do a thing with this.state
  }

  render() {
    return (
      <div>
        <input name='name' placeholder='name' />
        <input name='bio' placeholder='bio' />
        <div class='submit-btn'></div>
      </div>
    );
  }
}
export default AccountDetails;