import UPLOAD_CONTRACT from '../actions/types'
import GET_WEB3_INSTANCE from '../actions/types'

const initialState = {
  x: '',
  web3: null,

}

export default function solidityReducer(state = initialState, action) {
  switch (action.type) {
    case UPLOAD_CONTRACT : {
      const newState = { ...state }
      newState.x = action.payload
      return newState
    }
    case GET_WEB3_INSTANCE : {
      const newState = { ...state }
      newState.web3 = action.payload
      return newState
    }
    default :
      return state
  }
}
