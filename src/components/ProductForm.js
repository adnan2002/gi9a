import React, { useState } from 'react';

const ProductForm = ({ onSubmit }) => {
  const boy = '/boys/3-5.png';
  const girl = '/girls/3-5.png';
  const ageRange = ["0-3", "3-5", "5-7", "7-9"];

  const boys = ageRange.map(val => `/boys/${val}.png`);
  const girls = ageRange.map(val => `/girls/${val}.png`);

  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedAgeRange, setSelectedAgeRange] = useState(null);
  const [selectedHobby, setSelectedHobby] = useState(null);
  const [selectedHobbyDetail, setSelectedHobbyDetail] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const hobbies = ["Drawing and Painting", "Sports", "Cooking or Baking", "Music"];
  const sports = ["Basketball", "Football", "Tennis", "Badminton"];
  const drawingAndPainting = ["Watercolors", "Sketching", "Oil Painting", "Digital Art"];
  const cookingOrBaking = ["Baking", "Grilling", "Pastry Making", "Healthy Cooking"];
  const music = ["Guitar", "Piano", "Violin", "Singing"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedGender && selectedAgeRange && selectedHobby && selectedHobbyDetail) {
      setErrorMessage('');
      if (onSubmit) {
        onSubmit({ gender: selectedGender, ageRange: selectedAgeRange, hobby: selectedHobby, hobbyDetail: selectedHobbyDetail });
      }
    } else {
      setErrorMessage('Please complete the form before submitting.');
    }
  };

  const handleSelectionChange = (setter, clearDependentSetter) => (value) => {
    setter(value);
    if (clearDependentSetter) {
      clearDependentSetter(null);
    }
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-blue-100 p-6 rounded-lg shadow-lg">
      {errorMessage && (
        <div className="text-red-500 mb-4">
          {errorMessage}
        </div>
      )}
      <div>
        <label className="block text-gray-700 text-lg font-semibold mb-4">
          What is the gender of your character?
        </label>
        <div className="flex space-x-6">
          <label className={`border-2 p-2 cursor-pointer ${selectedGender === 'boy' ? 'border-blue-500' : 'border-transparent'}`}>
            <input
              type="radio"
              name="gender"
              value="boy"
              onChange={() => handleSelectionChange(setSelectedGender)('boy')}
              className="hidden"
            />
            <img src={boy} alt="Boy" className="w-32 h-32 object-contain" />
            <div className="text-center text-base font-medium">Boy</div>
          </label>
          <label className={`border-2 p-2 cursor-pointer ${selectedGender === 'girl' ? 'border-blue-500' : 'border-transparent'}`}>
            <input
              type="radio"
              name="gender"
              value="girl"
              onChange={() => handleSelectionChange(setSelectedGender)('girl')}
              className="hidden"
            />
            <img src={girl} alt="Girl" className="w-32 h-32 object-contain" />
            <div className="text-center text-base font-medium">Girl</div>
          </label>
        </div>
      </div>

      {selectedGender && (
        <div className="mt-6">
          <label className="block text-gray-700 text-lg font-semibold mb-4">
            What is the age range of your character?
          </label>
          <div className="flex space-x-6">
            {(selectedGender === 'boy' ? boys : girls).map((imgSrc, index) => (
              <label
                key={imgSrc}
                className={`border-2 p-2 cursor-pointer ${selectedAgeRange === ageRange[index] ? 'border-blue-500' : 'border-transparent'}`}
              >
                <input
                  type="radio"
                  name="ageRange"
                  value={ageRange[index]}
                  onChange={() => handleSelectionChange(setSelectedAgeRange)(ageRange[index])}
                  className="hidden"
                />
                <img src={imgSrc} alt={`Age ${ageRange[index]}`} className="w-32 h-32 object-contain" />
                <div className="text-center text-base font-medium">{ageRange[index]}</div>
              </label>
            ))}
          </div>
        </div>
      )}

      {selectedGender && selectedAgeRange && (
        <div className="mt-6">
          <label className="block text-gray-700 text-lg font-semibold mb-4">
            What are your hobbies or interests?
          </label>
          <div className="grid grid-cols-2 gap-4">
            {hobbies.map(hobby => (
              <label
                key={hobby}
                className={`p-2 cursor-pointer ${selectedHobby === hobby ? 'bg-blue-500 text-white' : 'bg-white text-black'} hover:bg-blue-300 hover:text-white`}
              >
                <input
                  type="radio"
                  name="hobby"
                  value={hobby}
                  onChange={() => handleSelectionChange(setSelectedHobby, setSelectedHobbyDetail)(hobby)}
                  className="hidden"
                />
                <div className="w-full h-10 flex items-center justify-center">
                  <div className="text-center text-base font-medium">{hobby}</div>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      {selectedGender && selectedAgeRange && selectedHobby && (
        <div className="mt-6">
          <label className="block text-gray-700 text-lg font-semibold mb-4">
            {selectedHobby === 'Sports' ? "What sport do you enjoy practicing?" :
              selectedHobby === 'Drawing and Painting' ? "Which form of art do you enjoy the most?" :
              selectedHobby === 'Cooking or Baking' ? "Which culinary activity do you enjoy the most?" :
              "What type of music do you enjoy?"}
          </label>
          <div className="grid grid-cols-2 gap-4">
            {(selectedHobby === 'Sports' ? sports :
              selectedHobby === 'Drawing and Painting' ? drawingAndPainting :
              selectedHobby === 'Cooking or Baking' ? cookingOrBaking :
              music).map(option => (
                <label
                  key={option}
                  className={`p-2 cursor-pointer ${selectedHobbyDetail === option ? 'bg-blue-500 text-white' : 'bg-white text-black'} hover:bg-blue-300 hover:text-white`}
                >
                  <input
                    type="radio"
                    name="hobbyDetail"
                    value={option}
                    onChange={() => handleSelectionChange(setSelectedHobbyDetail)(option)}
                    className="hidden"
                  />
                  <div className="w-full h-10 flex items-center justify-center">
                    <div className="text-center text-base font-medium">{option}</div>
                  </div>
                </label>
              ))}
          </div>
        </div>
      )}

      <button type="submit" className="mt-6 bg-blue-500 text-white p-2 rounded-lg shadow-lg hover:bg-blue-600 self-center">
        Add to Cart
      </button>
    </form>
    
  );
};

export default ProductForm;
