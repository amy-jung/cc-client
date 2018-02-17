import buffer from 'buffer'
import UPLOAD_IMAGE from '../actions/types'

const initialState = {
  imageURL: ''
}

export default function ipfsReducer(state = initialState, action) {
  switch (action.type) {
    case UPLOAD_IMAGE : {
      const newState = { ...state }
      const reader = new FileReader();
      reader.onloadend = function() {
        const ipfs = window.IpfsApi('localhost', 5001)
        const buf = buffer.Buffer(reader.result)
        ipfs.files.add(buf, (err, result) => {
          if(err) {
            console.error(err)
            return
          }
          let url = `https://ipfs.io/ipfs/${result[0].hash}`
          console.log(`Url --> ${url}`)
          newState.imageURL = action.payload
          return newState
        })
        reader.readAsArrayBuffer(action.payload)
      }
      const photo = document.getElementById("photo");
      reader.readAsArrayBuffer(photo.files[0])
      return newState
    }
    default : 
      return initialState
  }
}
