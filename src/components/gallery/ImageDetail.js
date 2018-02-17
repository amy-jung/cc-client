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
    const { filter, imageIsPublic, activeImage, close } = this.props
    // const createdByMe = filter === 'creator'
    const createdByMe = true
    const transactionList = [
      '0x0f8dc8593764f57768f0fb70cf7ca85b4f3bd7431a22721f25ecc697383904e7',
      '0x2c2b9c9a4a25e24b174f26114e8926a9f2128fe4',
      '0x9b51540f5a7d75a8fc920e3e5e4ec66792ba31fd006bd176901f0e6347af2dba',
      '0x3a7d4fdca7338707f9abc43c5e502dec78962778c5cab2e79049a1d5f3e55d17',
      '0xfb88de099e13c3ed21f80a7a1e49f8caecf10df6',
      '0xb6c8bfcb8b87093ae1e576c102817a83dd6cecc62d26006b7eca39679f64d936'
    ]
    return (
      <div className='image-detail-modal'>
        <div className='wrapper'>
          <span className='close-x' onClick={close}>x</span>
          <div className='image-detail-img'>
            <Image imageSRC={activeImage} />
          </div>
          <div className='image-details'>Image details</div>
          { createdByMe && <ImageIsPublicToggle isPublic={imageIsPublic} toggle={this.handleToggle} /> }
          { createdByMe ? <ImageTransactionHistory transactions={transactionList} /> : <div>how many times img used</div> }
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    imageIsPublic: state.gallery.activeImageIsPublic,
    filter: state.gallery.filter,
    activeImage: state.gallery.activeImage
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onImagePublicStatus: status => dispatch(imagePublicStatus(status))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageDetail)