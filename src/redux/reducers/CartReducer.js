const initialState = {
    count: 0,
    error: null,
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TO_CART_SUCCESS':
        return {
          ...state,
          count: state.count + 1,
        };
      case 'ADD_TO_CART_FAILURE':
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default cartReducer;
  