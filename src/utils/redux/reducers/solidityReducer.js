import { UPLOAD_CONTRACT, GET_WEB3_INSTANCE, GET_IMAGE_CONTRACT } from '../actions/types'

const imagesJSON = require('../../../../build/contracts/Images.json')
const imageMigrationAddress = '0x9fbda871d559710256a2502a2517b794b482db40'



// const compile = (fileName) => {
//   const inboxJSON = path.resolve(__dirname, 'contracts', fileName)
//   const source = fs.readFileSync(inboxPath, 'utf8')
//   return solc.compile(source, 1).contracts[':Inbox']
  
// }

const initialState = {
  x: '',
  web3: null,
  imageContract: {}
}

export default function solidityReducer(state = initialState, action) {
  switch (action.type) {
    case UPLOAD_CONTRACT : {
      const newState = { ...state }
      newState.x = action.payload
      console.log(newState);
      return newState
    }
    case GET_WEB3_INSTANCE : {
      const newState = { ...state }
      newState.web3 = action.payload
      // console.log(newState);
      return newState
    }
    case GET_IMAGE_CONTRACT : {
      const newState = { ...state }
      console.log(state.web3)
      // if (state.web3 !== null) {
        // const web3 = action.payload
        const { web3 } = state
        // console.log(web3);
        const ImagesContract = web3.eth.contract(imagesJSON.abi)
        const imageContractInstance = ImagesContract.at(imageMigrationAddress)
        newState.imageContract = imageContractInstance
        // newState.web3 = action.payload
        console.log(newState.imageContract);
        // newState.imageContract.hello.call((err, res) => console.log(err))
      // } else {
      //   console.log('not null');
      //   // console.log(newState.web3);
      // }
      return newState
    }
    default :
      return state
  }
}
