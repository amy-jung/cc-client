import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setGalleryFilter } from '../../utils/redux/actions/'
import ImageGrid from './ImageGrid'
import { binder } from '../../utils/'

// all logic for filtering etc in this component

class Gallery extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    binder(this, ['generateStockImgArray'])
  }
  generateStockImgArray () {
    const SRC = 'http://via.placeholder.com/400x400'
    const dum = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    const srcArray = dum.map(o => SRC)
    return srcArray
  }

  render () {
    return (
      <div>
        <ImageGrid images={this.generateStockImgArray()} />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    filter: state.gallery.filter
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onSetGalleryFilter: filter => dispatch(setGalleryFilter(filter))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery)
