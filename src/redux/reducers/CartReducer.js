// src/reducers/cartReducer.js
const initialState = {
  products: []
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        products: [...state.products, action.payload]
      };
    case 'UPDATE_CART':
      return {
        ...state,
        products: action.payload
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        products: state.products.filter(product => product.key !== action.payload)
      };
    default:
      return state;
  }
};

export default cartReducer;
