import buffer from 'buffer'
import ipfsAPI from 'ipfs-api'
import { UPLOAD_IMAGE } from '../actions/types'

const initialState = {
  imageURL: ''
}

export default function ipfsReducer(state = initialState, action) {
  switch (action.type) {
    case UPLOAD_IMAGE : {
      console.log('upload img');
      const newState = { ...state }
      const reader = new FileReader();
      reader.onloadend = function() {
        const ipfs = ipfsAPI('localhost', 5001)
        const buf = buffer.Buffer(reader.result)
        console.log(ipfs);
        ipfs.files.add(buf, (err, result) => {
          if(err) {
            console.error(err)
            return
          }
          let url = `https://ipfs.io/ipfs/${result[0].hash}`
          console.log(`Url --> ${url}`)
          newState.imageURL = url
          return newState
        })
        reader.readAsArrayBuffer(action.payload)
      }
      const photo = document.getElementById("photo");
      reader.readAsArrayBuffer(action.payload)
      return newState
    }
    default : 
      return initialState
  }
}
