import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import userReducer from './userReducer'
import web3Reducer from './web3Reducer'
import galleryReducer from './galleryReducer'
import ipfsReducer from './ipfsReducer'

const reducers = combineReducers({
  routing: routerReducer,
  user: userReducer,
  web3: web3Reducer,
  gallery: galleryReducer,
  ipfs: ipfsReducer
})

export default reducers
