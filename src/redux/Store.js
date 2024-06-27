import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import cartReducer from './reducers/CartReducer';
import productReducer from './reducers/ProductReducer';
const rootReducer = combineReducers({
  cart: cartReducer,
  product: productReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
