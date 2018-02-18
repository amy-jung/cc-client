import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setGalleryFilter, setActiveImage, getWeb3Instance, getImageContract } from '../../utils/redux/actions/'
import getWeb3 from '../../utils/web3/getWeb3'
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
    binder(this, ['generateStockImgArray', 'openImageModal', 'closeImageModal', 'callImageContract'])
  }

  componentDidMount () {
      // 
    // this.props.onGetWeb3Instance(this.props.web3)    
    // this.props.getImageContract()
    if ( this.props.web3 ) {
      
      this.props.onGetImageContract() 
      // console.log(this.props.imageContract)
      console.log(this.props.web3);                 
    } else {
      // this.props.onGetWeb3Instance(this.props.web3)    
      // this.props.onGetImageContract()   
    //   console.log('getting web3 now');
      getWeb3.then(res => {
        console.log(res.payload.web3Instance);
        this.props.onGetWeb3Instance(res.payload.web3Instance)        
        this.props.onGetImageContract()
      })
    }
  }

  callImageContract () {
    // console.log(this.props.imageContract.allImages);
    // if (this.props.imageContract.allImages) {
    // const asyncGetEm = async () => {
    //   const allImages = await this.props.imageContract.allImages.call()
    //   console.log(allImages);
    // }
    // asyncGetEm()
      // console.log(this.props.imageContract.allImages.call((err,res)=>{ res }));



      this.props.imageContract.allImages.call((err, res) => {
        console.log(err)        
        console.log(res) 
        // return res
        // res.forEach(hex => {
        //   const asciiHex = this.props.web3.toAscii(hex)
        //   console.log(asciiHex);
        // })
      })




    // }
    //  else {
    //   console.log('else');
    //   this.props.onGetImageContract(this.props.web3)      
    // }

    // this.props.imageContract.hello.call((err, res) => console.log(err, res))
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
    this.callImageContract()
    this.setState({ imageDetailOpen: true })
    this.props.onSetActiveImage(img)
  }

  closeImageModal () {
    this.setState({ imageDetailOpen: false })
  }

  render () {
    // this.callImageContract()
    
    // console.log(this.props.web3);
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
    web3: state.web3.web3Instance,
    imageContract: state.solidity.imageContract
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onSetGalleryFilter: filter => dispatch(setGalleryFilter(filter)),
    onSetActiveImage: image => dispatch(setActiveImage(image)),
    onGetWeb3Instance: instance => dispatch(getWeb3Instance(instance)),
    onGetImageContract: () => dispatch(getImageContract())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery)
