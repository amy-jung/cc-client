import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import userReducer from './userReducer'
import web3Reducer from './web3Reducer'
import galleryReducer from './galleryReducer'
import ipfsReducer from './ipfsReducer'
import solidityReducer from './solidityReducer'

const reducers = combineReducers({
  routing: routerReducer,
  user: userReducer,
  web3: web3Reducer,
  gallery: galleryReducer,
  ipfs: ipfsReducer,
  solidity: solidityReducer
})

export default reducers
