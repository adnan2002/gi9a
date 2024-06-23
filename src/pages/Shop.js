import React from 'react';

const products = [
    {
        id: 1,
        image: '/product1.jpg',
        title: 'Product 1',
        subtitle: 'Amazing Product',
        price: '50 SAR',
    },
    {
        id: 2,
        image: '/product2.jpg',
        title: 'Product 2',
        subtitle: 'Wonderful Product',
        price: '70 SAR',
    },
];

const Shop = () => {
    return (
        <div>
            <div className="relative h-48 flex justify-center items-center bg-cover bg-center" style={{ backgroundImage: "url('/shop-bg.jpg')" }}>
                <span className="text-black font-bold text-5xl" style={{ fontFamily: "'Dancing Script', cursive" }}>
                    Shop
                </span>
            </div>
            <h1 className="text-2xl mt-4 text-center">This is the shop</h1>
            <div className="flex justify-center items-center flex-wrap gap-6 mt-8 px-4">
                {products.map(product => (
                    <div key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 w-80 cursor-pointer">
                        <img className="w-full h-64 object-cover" src={product.image} alt={product.title} />
                        <div className="p-4">
                            <h2 className="text-xl font-bold transition duration-300 hover:text-blue-600">{product.title}</h2>
                            <p className="text-gray-600">{product.subtitle}</p>
                            <p className="mt-2 text-green-600 font-semibold">{product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Shop;
