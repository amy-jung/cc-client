import {
  SET_GALLERY_FILTER
} from '../actions/types'

const initialState = {
  filter: ''
}

export default function galleryReducer(state = initialState, action){
  switch(action.type) {
    case SET_GALLERY_FILTER : {
      const newState = { ...state }
      newState.filter = action.payload
      return newState
    }
    default:
      return state
  }
}
