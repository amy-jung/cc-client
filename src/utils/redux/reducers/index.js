import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import userReducer from './userReducer'
import web3Reducer from './web3Reducer'
import galleryReducer from './galleryReducer'

const reducers = combineReducers({
  routing: routerReducer,
  user: userReducer,
  web3: web3Reducer,
  gallery: galleryReducer
})

export default reducers
