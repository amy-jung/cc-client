import {
  SET_GALLERY_FILTER,
  UPLOAD_IMAGE
} from './types'

export const setGalleryFilter = filter => async dispatch => {
  dispatch({
    type: SET_GALLERY_FILTER,
    payload: filter
  })
}

export const uploadImage = file => async dispatch => {
  dispatch({
    type: UPLOAD_IMAGE,
    payload: file
  })
}
