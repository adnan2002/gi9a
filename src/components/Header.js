// src/components/Header.js
import React, {useEffect, useState} from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom'; // Assuming you're using React Router for navigation
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from '../configs/Config';

const Header = () => {
  const [isUserName, setIsUserName] = useState(false);
  const [displayName, setDisplayName] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user){
        setIsUserName(true);
        setDisplayName(user.displayName);
      } else {
        setIsUserName(false);
        setDisplayName(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
}, []);
  const navigate = useNavigate();
  const cartCount = useSelector((state) => {
    const products = state.cart?.products ?? [];
    return products.reduce((total, product) => total + product.quantity, 0);
  });

  return (
    <header>
      <div className="bg-yellow-200 w-full h-10 flex items-center justify-between px-4">
        <div className="flex items-center">
          <button
            className="bg-blue-500 rounded-full p-1 pl-2 pr-2 focus:outline-none hover:bg-gray-300 transition duration-300"
            onClick={() => {
              // Handle search icon click here
            }}
          >
            <FontAwesomeIcon icon={faSearch} className="text-white" />
          </button>
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 p-1 rounded h-7 ml-2 focus:outline-none focus:border-gray-500"
          />
        </div>

        <div className="text-center">
          <p className="font-bold text-black select-none">
            Free delivery worldwide!
          </p>
        </div>

        <div className="flex items-center space-x-10">
          <FontAwesomeIcon
            icon={faUser}
            className="text-gray-700 hover:text-blue-500 cursor-pointer transition duration-300 text-2xl"
            onClick={() => {
              navigate('/registration')
            }}
          />
          <p>{(isUserName && displayName) && `Hello, ${displayName}`}</p>
          <div className="relative">
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="text-gray-700 hover:text-blue-500 cursor-pointer transition duration-300 text-2xl"
              onClick={() => {
                navigate('/cart')
              }}
            />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 left-4 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center select-none">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="bg-white w-full h-32 flex items-center justify-between px-4">
        <Link to="/">
          <div className="w-32 h-32 bg-cover bg-center" style={{ backgroundImage: 'url(/header-image.png)' }} />
        </Link>
        <div className="flex items-center">
          <NavLink
            to="/"
            className="mr-4"
            style={({isActive}) => {
              return isActive ? {color:'rgb(37 99 235)'} : {}
            }}
          >
            <h1 className='hover:text-blue-600 hover:underline transition duration-300 hover:cursor-pointer text-2xl' style={{ fontFamily: "'Dancing Script', cursive" }}>
              Home
            </h1>
          </NavLink>
          <NavLink
            to="/shop"
            className="ml-4"
            style={({isActive}) => {
              return isActive ? {color:'rgb(37 99 235)'} : {}
            }}
          >
            <h1 className='hover:text-blue-600 hover:underline transition duration-300 hover:cursor-pointer text-2xl' style={{ fontFamily: "'Dancing Script', cursive" }}>
              Shop
            </h1>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
