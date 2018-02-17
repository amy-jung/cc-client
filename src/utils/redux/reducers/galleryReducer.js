import {
  SET_GALLERY_FILTER,
  IMAGE_PUBLIC_STATUS,
  SET_ACTIVE_IMAGE
} from '../actions/types'

const initialState = {
  filter: '',
  activeImagePublicStatus: false,
  activeImage: ''
}

export default function galleryReducer(state = initialState, action){
  switch(action.type) {
    case SET_GALLERY_FILTER : {
      const newState = { ...state }
      newState.filter = action.payload
      return newState
    }
    case IMAGE_PUBLIC_STATUS : {
      const newState = { ...state }
      if (action.payload !== undefined) {
        newState.activeImagePublicStatus = action.payload
      } else {
        const status = 'get public status via contract'
        newState.activeImagePublicStatus = status
      }
      return newState
    }
    case SET_ACTIVE_IMAGE : {
      const newState = { ...state }
      newState.activeImage = action.payload
      return newState
    }
    default:
      return state
  }
}