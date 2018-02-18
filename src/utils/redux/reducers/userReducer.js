import { USER_LOGGED_IN, USER_UPDATED, USER_LOGGED_OUT } from '../actions/types'

const initialState = {
  data: null
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGGED_IN : {
      console.log(action.payload);
      const newState = { ...state }
      newState.data = action.payload
      return newState
    }
    case USER_UPDATED : {
      const newState = { ...state }
      newState.data = action.payload
      return newState
    }
    case USER_LOGGED_OUT : {
      const newState = { ...state }
      newState.data = null
      return newState
    }
    default:
      return state
  }
}
