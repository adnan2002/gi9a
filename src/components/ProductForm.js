import React, { useState } from 'react';

const ProductForm = ({ onSubmit }) => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit({ title, image, gender, age });
    };
  
    return (
      <form onSubmit={handleSubmit} className="bg-blue-100 p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block text-lg mb-2" htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg mb-2" htmlFor="image">Image URL</label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg mb-2">Gender</label>
          <div className="flex space-x-4">
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                onChange={(e) => setGender(e.target.value)}
                className="mr-2"
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                onChange={(e) => setGender(e.target.value)}
                className="mr-2"
              />
              Female
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-lg mb-2">Age Range</label>
          <select
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select Age Range</option>
            <option value="0-3">0 - 3</option>
            <option value="3-5">3 - 5</option>
            <option value="5-7">5 - 7</option>
            <option value="7-9">7 - 9</option>
          </select>
        </div>
        <div className="text-center">
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">Submit</button>
        </div>
      </form>
    );
};

export default ProductForm;
