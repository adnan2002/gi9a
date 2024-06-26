import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../configs/Config';
import { Link } from 'react-router-dom';
import ShopBanner from '../components/ShopBanner';
const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const querySnapshot = await getDocs(collection(db, 'products'));
                const productsArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProducts(productsArray);
            } catch (error) {
                console.error('Error fetching products: ', error);
            }
            setLoading(false);
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-2xl">Loading...</div>
            </div>
        );
    }

    return (
        <div>
            <ShopBanner title={"Shop"}/>
          <div className="flex justify-center items-center flex-wrap gap-6 mt-8 px-4">
            {products.map(product => (
              <Link key={product.id} to={`/shop/${product.id}`}>
                <div className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 w-80 cursor-pointer" style={{ height: '420px' }}>
                  <img className="w-full h-64 object-cover" src={product.image} alt={product.title} />
                  <div className="p-4 flex flex-col justify-between h-36">
                    <h2 className="text-xl font-bold transition duration-300 hover:text-blue-600 cursor-pointer">
                      {product.title}
                    </h2>
                    <p className="text-gray-600 hover:text-blue-600 cursor-pointer">{product.category}</p>
                    <p className="mt-2 text-green-600 font-semibold">{product.price.toFixed(2)} SAR</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      );
};

export default Shop;
