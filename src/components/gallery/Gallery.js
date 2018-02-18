import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setGalleryFilter, setActiveImage, getWeb3Instance, getImageContract, uploadImage } from '../../utils/redux/actions/'
import getWeb3 from '../../utils/web3/getWeb3'
import ImageGrid from './ImageGrid'
// import ImageFilters from './ImageFilters'
// import ImageSearchBar from './ImageSearchBar'
import ImageDetail from './ImageDetail'
import Modal from '../layout/Modal'
import UploadBtn from './UploadBtn'
import { binder } from '../../utils/'

class Gallery extends Component {
  constructor (props) {
    super(props)
    this.state = {
      imageDetailOpen: false,
      uploadModalOpen: true,
      ipfsURL: ''
    }
    binder(this, ['generateStockImgArray', 'openImageModal', 'closeImageModal', 'callImageContract', 'handleUploadSubmit'])
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.ipfsURL !== this.state.ipfsURL) {
      this.setState({
        ipfsURL: nextProps.ipfsURL
      })
    }
  }

  componentDidMount () {
    if ( this.props.web3 ) {
      this.props.onGetImageContract() 
    } else {
      getWeb3.then(res => {
        console.log(res.payload.web3Instance);
        this.props.onGetWeb3Instance(res.payload.web3Instance)        
        this.props.onGetImageContract()
      })
    }
  }

  callImageContract () {
    this.props.imageContract.allImages.call((err, res) => { 
      console.log(res) 
      res.forEach(hex => {
        const asciiHex = this.props.web3.toAscii(hex)
        console.log(asciiHex);
      })
    })
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
    // const imgSrcArray = ['https://drive.google.com/file/d/1JSPguvYVzzQXF_ZgTnoT_CwqqE2MDxav/view?usp=sharing', 'https://drive.google.com/file/d/1JSPguvYVzzQXF_ZgTnoT_CwqqE2MDxav/view?usp=sharing', 'https://drive.google.com/file/d/1iKa5OUQZzwDFSnD9KZuz6IWIVQqC4z4b/view?usp=sharing', 'https://drive.google.com/file/d/1Ho2IEVkJjntMdthYKrgktuXij6qqR9wo/view?usp=sharing', 'https://drive.google.com/file/d/12lqc15HVWnDVzta8pwBp-wo-RzTNDl-w/view?usp=sharing', 'https://drive.google.com/file/d/1cfyxBg8ZX5y1fE6yBcbgZNNW2yM-tkhd/view?usp=sharing', 'https://drive.google.com/file/d/1DLT6JVf2HGrRbB6IAYn9zjmN388rHsBo/view?usp=sharing']
    // const randEx = Math.floor(Math.random(imgSrcArray.length))    
    const imgObjArray = dum.map((o, i) => {
      return {
        srcHash: SRC,
        // srcHash: imgSrcArray[randEx],
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
    this.callImageContract()
    this.setState({ imageDetailOpen: true })
    this.props.onSetActiveImage(img)
  }

  closeImageModal () {
    this.setState({ imageDetailOpen: false })
  }

  handleUploadSubmit (e, ref) {
    e.preventDefault()
    const { files } = ref
    if (files.length > 0) {
      console.log(files);
      this.props.onUploadImage(files[0])
    }
  }


  render () {
    // this.callImageContract()
    const methods = {
      upload: this.handleUploadSubmit
    }
    
    // console.log(this.props.web3);
    return <div className='gallery' style={{ overflow: this.state.imageDetailOpen ? 'hidden' : 'scroll' }}>
        {/* <ImageFilters /> */}
        {/* <ImageSearchBar /> */}
        <div className="top-wrapper">
          <div className='copy'>Creative Credit is embedded into each image via the blockchain. No code required. Just download and share!</div>
          <UploadBtn handleUploadClick={this.handleUploadClick} isLoggedIn={this.props.isLoggedIn}/>
        </div>
        <ImageGrid openImageModal={this.openImageModal} searchFilter={this.props.searchFilter} images={this.generateStockImgArray()} />
        { this.state.imageDetailOpen && <ImageDetail activeImage={this.props.activeImage} close={this.closeImageModal} /> }
        { this.state.uploadModalOpen && <Modal type='upload' methods={methods} /> }
      </div>
  }
}

function mapStateToProps (state) {
  return {
    filter: state.gallery.filter,
    searchFilter: state.gallery.fuzzySearch,
    activeImage: state.gallery.activeImage,
    web3: state.web3.web3Instance,
    imageContract: state.solidity.imageContract,
    isLoggedIn: state.user.data !== null,
    ipfsURL: state.ipfs.ipfsURL,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onSetGalleryFilter: filter => dispatch(setGalleryFilter(filter)),
    onSetActiveImage: image => dispatch(setActiveImage(image)),
    onGetWeb3Instance: instance => dispatch(getWeb3Instance(instance)),
    onGetImageContract: () => dispatch(getImageContract()),
    onUploadImage: imageFile => dispatch(uploadImage(imageFile))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery)
