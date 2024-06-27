import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../configs/Config';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { incrementQuantity, decrementQuantity, removeFromCart } from '../redux/actions/CartActions';

const Cart = () => {
  const cart = useSelector((state) => state.cart.products);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchProductDetails = async (productId) => {
    const productsRef = collection(db, 'products');
    const q = query(productsRef, where('id', '==', productId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data();
    }
    return null;
  };

  useEffect(() => {
    const fetchAllProductDetails = async () => {
      const productDetails = await Promise.all(
        cart.map(async (cartItem) => {
          const product = await fetchProductDetails(cartItem.productId);
          return { ...cartItem, product };
        })
      );
      setProducts(productDetails);

      // Calculate total price
      const totalPrice = productDetails.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      setTotal(totalPrice);
    };

    fetchAllProductDetails();
  }, [cart]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {products.map((cartItem) => (
            <CartItem key={cartItem.key} cartItem={cartItem} fetchProductDetails={fetchProductDetails} />
          ))}
          <div className="mt-6 text-right">
            <h2 className="text-xl font-bold">Total: {total.toFixed(2)} SAR</h2>
          </div>
        </div>
      )}
    </div>
  );
};

const CartItem = ({ cartItem }) => {
  const dispatch = useDispatch();
  const { product, quantity, key } = cartItem;

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-between border-b border-gray-300 py-4">
      <div className="flex items-center space-x-4 mb-4 md:mb-0">
        <img src={product.image} alt={product.title} className="w-20 h-20 object-cover" />
        <div>
          <h2 className="text-lg font-bold">{product.title}</h2>
          <p>{product.description}</p>
          <p className="text-m">{product.price} SAR</p>
          <p className='text-sm text-gray-400'>Description: A {cartItem.gender} between the ages of {cartItem.ageRange} who likes {cartItem.hobbyDetail}.</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => dispatch(decrementQuantity(key))}
          className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          onClick={() => dispatch(incrementQuantity(key))}
          className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
        >
          +
        </button>
        <button
          onClick={() => dispatch(removeFromCart(key))}
          className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Cart;
