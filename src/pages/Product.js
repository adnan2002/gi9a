import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../configs/Config';
import { getDocs, collection, query, where } from 'firebase/firestore';
import ShopBanner from '../components/ShopBanner';
import ProductForm from '../components/ProductForm';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions/CartActions';
const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productsRef = collection(db, 'products');
        const q = query(productsRef, where('id', '==', id));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const productData = querySnapshot.docs[0].data();
          setProduct(productData);
        } else {
          console.error('No such document!');
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Error fetching product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleFormSubmit = (data) => {
    data['productId'] = id;
    const productKey = JSON.stringify(data);
    console.log('Form submitted with data:', data);
    dispatch(addToCart({ ...data, key: productKey }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <ShopBanner title="Create a Story" />
      {product && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <div className="flex justify-center items-center">
            <img src={product.image} alt={product.title} className="w-full h-auto max-w-lg rounded-lg" />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">{product.title}</h2>
            <ProductForm onSubmit={handleFormSubmit} />
            <p className="text-lg font-bold mb-4 mt-4">{product.price.toFixed(2)} SAR</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
