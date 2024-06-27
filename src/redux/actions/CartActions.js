export const addToCart = () => {
    return (dispatch) => {
      try {
        
        dispatch({ type: 'ADD_TO_CART_SUCCESS' });
        alert('Product added to cart successfully!');
      } catch (error) {
        dispatch({ type: 'ADD_TO_CART_FAILURE', payload: 'Error adding product to cart' });
        alert('Error adding product to cart');
      }
    };
  };
  