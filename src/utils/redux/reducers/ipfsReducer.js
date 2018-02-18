import buffer from 'buffer'
import ipfsAPI from 'ipfs-api'
import { UPLOAD_IMAGE } from '../actions/types'

const initialState = {
  imageURL: '',
  initialHash: ''
}

export default function ipfsReducer(state = initialState, action) {
  switch (action.type) {
    case UPLOAD_IMAGE : {
      console.log('upload img');
      const newState = { ...state }
      const currentURL = { ...state.imageURL }
      let newURL = ''
      const reader = new FileReader();
      reader.onloadend = function() {
        const ipfs = ipfsAPI('ipfs.infura.io', 5001, { protocol: 'https' })
        // const ipfs = ipfsAPI('localhost', 5001)
        const buf = buffer.Buffer(reader.result)
        // console.log(ipfs);
        ipfs.files.add(buf, (err, result) => {
          if(err) {
            console.error(err)
            return
          }
          let url = `https://ipfs.io/ipfs/${result[0].hash}`
          // console.log(`Url --> ${url}`)
          newState.imageURL = url
          newState.initialHash = result[0].hash
          action.payload.callback(newState.imageURL)
          return newState
        })
        // if (newState.imageURL === '') {
          reader.readAsArrayBuffer(action.payload.file)

          
          if (newState.imageURL !== newURL) {
            console.log(`Url --> ${newState.imageURL}`)
            newURL = newState.imageURL
                     
            return newState
          }
        // } else {
        //   return newState          
        // }
      }
      const photo = document.getElementById("photo");
      reader.readAsArrayBuffer(action.payload.file)
      
      return newState
    }
    default : 
      return initialState
  }
}
