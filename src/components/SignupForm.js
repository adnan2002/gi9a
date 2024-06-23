import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import countryCodes from '../utils/CountryCode.json';

const SignupForm = ({onSwitchToLogin }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
        country: 'Bahrain', // Default country is Bahrain
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        dialCode: '+973' // Default dial code for Bahrain
    });

    const [countries, setCountries] = useState([]);
    const [allowedCountries, setAllowedCountries] = useState([]);

    useEffect(() => {
        setCountries(countryCodes);
        setAllowedCountries(countryCodes.filter(country =>
            ['Saudi Arabia', 'Bahrain', 'United Kingdom', 'United States'].includes(country.name)
        ));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDialCodeChange = (e) => {
        const selectedDialCode = e.target.value;
        setFormData({
            ...formData,
            dialCode: selectedDialCode,
            phone: selectedDialCode // Initialize phone with the selected dial code
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const phoneNumberWithDialCode = `${formData.dialCode}${formData.phone}`;
        const formDataToSubmit = { ...formData, phone: phoneNumberWithDialCode };
        console.log(formDataToSubmit);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-wrap -mx-2 mb-4">
                        <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                            <label className="block text-gray-700 mb-2" htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-2">
                            <label className="block text-gray-700 mb-2" htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            value={formData.email}
                            onChange={handleChange}
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" // Basic email validation regex
                            required
                        />
                    </div>
                    <div className="mb-4 flex items-center">
                        <div className="mr-4">
                            <label className="block text-gray-700 mb-2" htmlFor="dialCode">Dial Code</label>
                            <select
                                id="dialCode"
                                name="dialCode"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                value={formData.dialCode}
                                onChange={handleDialCodeChange}
                                required
                            >
                                {countries.map(country => (
                                    country.dialCodes && country.dialCodes.length > 0 && (
                                        <option key={country.code} value={country.dialCodes[0]}>
                                            {country.dialCodes[0]}
                                        </option>
                                    )
                                ))}
                            </select>
                        </div>
                        <div className="flex-grow">
                            <label className="block text-gray-700 mb-2" htmlFor="phone">Phone</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                value={formData.phone}
                                onChange={handleChange}
                                pattern="^[\d()]{5,}$"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            value={formData.password}
                            onChange={handleChange}
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" // Password must contain at least one number, one lowercase and one uppercase letter, and at least 8 characters
                            required
                        />
                        <p className="text-gray-500 text-sm mt-1">Password must contain at least one number, one lowercase and one uppercase letter, and at least 8 characters.</p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="address1">Address Line 1</label>
                        <input
                            type="text"
                            id="address1"
                            name="address1"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            value={formData.address1}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="address2">Address Line 2</label>
                        <input
                            type="text"
                            id="address2"
                            name="address2"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            value={formData.address2}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="city">City</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            value={formData.city}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="country">Country</label>
                        <select
                            id="country"
                            name="country"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            value={formData.country}
                            onChange={handleChange}
                            required
                        >
                            {allowedCountries.map(country => (
                                <option key={country.code} value={country.name}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {formData.country === 'United States' && (
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="state">State/Province</label>
                            <input
                                type="text"
                                id="state"
                                name="state"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                value={formData.state}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="zip">Zip/Postal Code/Block</label>
                        <input
                            type="text"
                            id="zip"
                            name="zip"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            value={formData.zip}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Sign Up</button>
                    </div>
                    <div className="text-center">
                        <p className="text-gray-700">
                            Already have an account? <span onClick={onSwitchToLogin} className="text-blue-500 hover:underline cursor-pointer">Login</span>
                        </p>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default SignupForm;
