import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateUser } from '../../utils/actions'
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
    this.props.onUpdateUser(this.state)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input name='name' placeholder='name' />
          <input name='bio' placeholder='bio' />
          <button type='submit' class='submit-btn'>Submit</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    onUpdateUser: userData => dispatch(updateUser(userData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountDetails)