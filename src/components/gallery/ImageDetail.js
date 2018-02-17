import React, { Component } from 'react';
import { connect } from 'react-redux'
import Image from './Image'
import ImageIsPublicToggle from './ImageIsPublicToggle'
import ImageTransactionHistory from './ImageTransactionHistory'
import { imagePublicStatus } from '../../utils/redux/actions'
import { binder } from '../../utils/'

class ImageDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    }
    binder(this, ['handleToggle'])
  }

  componentDidMount () {
    this.props.onImagePublicStatus()
  }

  handleToggle (val) {
    // e.preventDefault()
    this.props.onImagePublicStatus(val)
  }

  render() {
    const { filter, imageIsPublic } = this.props
    const createdByMe = filter === 'creator'
    return (
      <div>
        <Image />
        <div className='image-details'>Image details</div>
        { createdByMe && <ImageIsPublicToggle isPublic={imageIsPublic} toggle={this.handleToggle} /> }
        { createdByMe ? <ImageTransactionHistory /> : <div>how many times img used</div> }     
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    imageIsPublic: state.gallery.activeImageIsPublic,
    filter: state.gallery.filter
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onImagePublicStatus: status => dispatch(imagePublicStatus(status))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageDetail)