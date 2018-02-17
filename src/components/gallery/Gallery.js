import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setGalleryFilter, setActiveImage } from '../../utils/redux/actions/'
import ImageGrid from './ImageGrid'
import ImageFilters from './ImageFilters'
import ImageSearchBar from './ImageSearchBar'
import ImageDetail from './ImageDetail'
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

  generateStockImgArray () {
    const SRC = 'http://via.placeholder.com/400x400'
    const dum = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    const srcArray = dum.map(o => SRC)
    return srcArray
  }

  openImageModal (img) {
    this.setState({ imageDetailOpen: true })
    this.props.onSetActiveImage(img)
  }

  closeImageModal () {
    this.setState({ imageDetailOpen: false })
  }

  render () {
    return (
      <div style={{overflow: this.state.imageDetailOpen ? 'hidden' : 'scroll'}}>
        <ImageFilters />
        <ImageSearchBar />
        <ImageGrid openImageModal={this.openImageModal} searchFilter={this.props.searchFilter} images={this.generateStockImgArray()} />
        { this.state.imageDetailOpen && <ImageDetail activeImage={this.props.activeImage} close={this.closeImageModal} /> }
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    filter: state.gallery.filter,
    searchFilter: state.gallery.fuzzySearch,
    activeImage: state.gallery.activeImage
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onSetGalleryFilter: filter => dispatch(setGalleryFilter(filter)),
    onSetActiveImage: image => dispatch(setActiveImage(image))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery)
