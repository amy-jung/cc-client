import {
  SET_GALLERY_FILTER,
  UPLOAD_IMAGE,
  USER_LOGGED_IN,
  IMAGE_PUBLIC_STATUS,
  FUZZY_SEARCH,
  SET_ACTIVE_IMAGE,
  UPLOAD_CONTRACT
} from './types'

// GALLERY

export const setGalleryFilter = filter => async dispatch => {
  dispatch({
    type: SET_GALLERY_FILTER,
    payload: filter
  })
}

export const fuzzySearch = term => async dispatch => {
  dispatch({
    type: FUZZY_SEARCH,
    payload: term
  })
}

export const setActiveImage = image => async dispatch => {
  dispatch({
    type: SET_ACTIVE_IMAGE,
    payload: image
  })
}

// FILE TRANSFER

export const uploadImage = file => async dispatch => {
  dispatch({
    type: UPLOAD_IMAGE,
    payload: file
  })
}

export const imagePublicStatus = status => async dispatch => {
  return {
    type: IMAGE_PUBLIC_STATUS,
    payload: status
  }
}

// AUTH

export const userLoggedIn = user => {
  console.log('fire');
  return {
    type: USER_LOGGED_IN,
    payload: user
  }
}

// SOLIDITY

export const uploadContract = file => {
  return {
    type: UPLOAD_CONTRACT,
    payload: file
  }
}
