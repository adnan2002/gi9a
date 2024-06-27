

export const addToCart = (product) => {
    return (dispatch, getState) => {
      const { cart } = getState();
      const productKey = JSON.stringify(product);
      const existingProduct = cart.products?.find(p => p.key === productKey);
  
      if (existingProduct) {
        const updatedProducts = cart.products.map(p =>
          p.key === productKey ? { ...p, quantity: p.quantity + 1 } : p
        );
        dispatch({ type: 'UPDATE_CART', payload: updatedProducts });
      } else {
        dispatch({ type: 'ADD_TO_CART', payload: { ...product, key: productKey, quantity: 1 } });
      }
    };
  };
  
  
  export const removeFromCart = (key) => {
    return (dispatch, getState) => {
      const { cart } = getState();
      const updatedProducts = cart.products.filter(p => p.key !== key);
      dispatch({ type: 'UPDATE_CART', payload: updatedProducts });
    };
  };
  
  export const incrementQuantity = (key) => {
    return (dispatch, getState) => {
      const { cart } = getState();
      const updatedProducts = cart.products.map(p =>
        p.key === key ? { ...p, quantity: p.quantity + 1 } : p
      );
      dispatch({ type: 'UPDATE_CART', payload: updatedProducts });
    };
  };
  
  export const decrementQuantity = (key) => {
    return (dispatch, getState) => {
      const { cart } = getState();
      const updatedProducts = cart.products.map(p =>
        p.key === key ? { ...p, quantity: p.quantity - 1 } : p
      ).filter(p => p.quantity > 0);
      dispatch({ type: 'UPDATE_CART', payload: updatedProducts });
    };
  };
  