import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setGalleryFilter, setActiveImage, getWeb3Instance } from '../../utils/redux/actions/'
import ImageGrid from './ImageGrid'
// import ImageFilters from './ImageFilters'
// import ImageSearchBar from './ImageSearchBar'
import ImageDetail from './ImageDetail'
import UploadBtn from './UploadBtn'
import { binder } from '../../utils/'

// all logic for filtering etc in this component

class Gallery extends Component {
  constructor (props) {
    super(props)
    this.state = {
      imageDetailOpen: false
    }
    binder(this, ['generateStockImgArray', 'openImageModal', 'closeImageModal'])
  }

  componentDidMount () {
    if( this.props.web3 ){
      console.log(this.props.web3.eth.accounts[0])
      this.props.onGetWeb3Instance(this.props.web3)
    }
  }

  generateStockImgArray () {
    const sampleObject = {
      srcHash: '',
      isPublic: false,
      userHash: '',
      transactions: []
    }
    const SRC = 'http://via.placeholder.com/400x400'
    const dum = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    const imgObjArray = dum.map((o, i) => {
      return {
        srcHash: SRC,
        isPublic: i%2,
        userHash: '0x094u509345039485',
        transactions: [
          '1',
          '2'
        ]
      }
    }).slice(0, 12)
    return imgObjArray
  }

  openImageModal (img) {
    this.setState({ imageDetailOpen: true })
    this.props.onSetActiveImage(img)
  }

  closeImageModal () {
    this.setState({ imageDetailOpen: false })
  }

  render () {
    return <div className='gallery' style={{ overflow: this.state.imageDetailOpen ? 'hidden' : 'scroll' }}>
        {/* <ImageFilters /> */}
        {/* <ImageSearchBar /> */}
        <div className="top-wrapper">
          <div className='copy'>Creative Credit is embedded into each image via the blockchain. No code required. Just download and share!</div>
          <UploadBtn />
        </div>
        <ImageGrid openImageModal={this.openImageModal} searchFilter={this.props.searchFilter} images={this.generateStockImgArray()} />
        {this.state.imageDetailOpen && <ImageDetail activeImage={this.props.activeImage} close={this.closeImageModal} />}
      </div>
  }
}

function mapStateToProps (state) {
  return {
    filter: state.gallery.filter,
    searchFilter: state.gallery.fuzzySearch,
    activeImage: state.gallery.activeImage,
    web3: state.web3.web3Instance
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onSetGalleryFilter: filter => dispatch(setGalleryFilter(filter)),
    onSetActiveImage: image => dispatch(setActiveImage(image)),
    onGetWeb3Instance: instance => dispatch(getWeb3Instance(instance))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery)
