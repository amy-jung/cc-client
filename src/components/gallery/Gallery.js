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
      ipfsURL: '',
      dummyArray: []
    }
    binder(this, ['generateStockImgArray', 'openImageModal', 'closeImageModal', 'callImageContract', 'handleUploadSubmit', 'addIPFSImage'])
  }

  addIPFSImage (directURL) {
      // console.log(nextProps)
    
    if (this.props.ipfsURL !== this.state.ipfsURL) {
    //   this.setState({
    //     ipfsURL: nextProps.ipfsURL
    //   })
      const newArray = [ ...this.state.dummyArray ].slice(0, this.state.dummyArray.length - 1)
      newArray.push({
        srcHash: directURL,
        // srcHash: this.props.ipfsURL,
        // srcHash: imgSrcArray[randEx],
        isPublic: 0,
        userHash: '0x094u509345039485',
        transactions: ['1', '2']
      })
      this.setState({
        dummyArray: newArray,
        uploadModalOpen: false,
        ipfsURL: this.props.ipfsURL
      })
      console.log(newArray)
      this.forceUpdate()
      return
    // } else {
    //   setTimeout(() => {this.addIPFSImage()}, 500)
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
    this.generateStockImgArray()
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
    const dum = ['http://images.all-free-download.com/images/graphiclarge/wild_flowers_wild_plants_nature_217563.jpg', 'http://images.all-free-download.com/images/graphiclarge/poppy_flower_nature_219157.jpg', 'http://images.all-free-download.com/images/graphiclarge/brandenburg_germany_nature_217279.jpg', 'http://images.all-free-download.com/images/graphiclarge/geranium_but_red_nature_217923.jpg', 'http://images.all-free-download.com/images/graphiclarge/leaf_natur_drop_216164.jpg', 'http://images.all-free-download.com/images/graphiclarge/beautiful_nature_landscape_05_hd_picture_166223.jpg', 'http://images.all-free-download.com/images/graphiclarge/beautiful_nature_landscape_01_hd_pictures_166207.jpg', 'http://images.all-free-download.com/images/graphiclarge/beautiful_nature_landscape_02_hd_picture_166206.jpg', 'http://images.all-free-download.com/images/graphiclarge/tulips_514482.jpg', 'http://images.all-free-download.com/images/graphiclarge/warm_as_yellow_514404.jpg', 'http://images.all-free-download.com/images/graphiclarge/pebbles_under_water_196465.jpg', 'http://images.all-free-download.com/images/graphiclarge/canoe_water_nature_221611.jpg', 'http://images.all-free-download.com/images/graphiclarge/nature_flower_sky_218344.jpg']

    // const imgSrcArray = ['https://drive.google.com/file/d/1JSPguvYVzzQXF_ZgTnoT_CwqqE2MDxav/view?usp=sharing', 'https://drive.google.com/file/d/1JSPguvYVzzQXF_ZgTnoT_CwqqE2MDxav/view?usp=sharing', 'https://drive.google.com/file/d/1iKa5OUQZzwDFSnD9KZuz6IWIVQqC4z4b/view?usp=sharing', 'https://drive.google.com/file/d/1Ho2IEVkJjntMdthYKrgktuXij6qqR9wo/view?usp=sharing', 'https://drive.google.com/file/d/12lqc15HVWnDVzta8pwBp-wo-RzTNDl-w/view?usp=sharing', 'https://drive.google.com/file/d/1cfyxBg8ZX5y1fE6yBcbgZNNW2yM-tkhd/view?usp=sharing', 'https://drive.google.com/file/d/1DLT6JVf2HGrRbB6IAYn9zjmN388rHsBo/view?usp=sharing']
    // const randEx = Math.floor(Math.random(imgSrcArray.length))    
    const imgObjArray = dum.map((o, i) => {
      return {
        srcHash: o,
        // srcHash: imgSrcArray[randEx],
        isPublic: i%2,
        userHash: '0x094u509345039485',
        transactions: [
          '1',
          '2'
        ]
      }
    }).slice(0, 12)
    this.setState({ dummyArray: imgObjArray }) 
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
      this.props.onUploadImage(files[0], this.addIPFSImage)
    }
      // this.addIPFSImage()
    
  }


  render () {
    if (this.state.ipfsURL !== this.props.ipfsURL && this.props.ipfsURL !== undefined) {
      console.log(true);
    }
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
        <ImageGrid openImageModal={this.openImageModal} searchFilter={this.props.searchFilter} images={this.state.dummyArray} />
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
    onUploadImage: (imageFile, callback) => dispatch(uploadImage(imageFile, callback))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery)
