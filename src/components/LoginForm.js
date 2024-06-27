import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../configs/Config'; // Ensure you have the correct path to your firebase.js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

const LoginForm = ({ onSwitchToSignup }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset error message
        setLoading(true); // Set loading to true

        try {
            await signInWithEmailAndPassword(auth, formData.email, formData.password);
            console.log('User logged in successfully');
            navigate('/'); // Navigate to the home page
        } catch (error) {
            if (error.code === 'auth/invalid-password') {
                setError('Incorrect password.');
            } else if (error.code === 'auth/user-not-found') {
                setError('No user found with this email.');
            } else {
                setError('An error occurred during login. Please try again.');
            }
            console.error('Error logging in:', error);
        } finally {
            setLoading(false); // Set loading to false
        }
    };

    return (
        <div className="flex items-center justify-center w-96 bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    {error && <div className="text-red-500 mb-4">{error}</div>}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
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
                            required
                        />
                    </div>
                    <div className="mb-4 text-right">
                        <Link to="/forgot" className="text-blue-500 hover:underline cursor-pointer">Forgot Password?</Link>
                    </div>
                    <div className='mb-6'>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center w-full"
                        >
                            <FontAwesomeIcon icon={faGoogle} size='xl' className='pr-3'/>
                            Sign in with Google
                        </button>
                    </div>
                    <div className="mb-6">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                            disabled={loading} // Disable button while loading
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>
                    <div className="text-center">
                        <p className="text-gray-700">
                            Don't have an account?{' '}
                            <span onClick={onSwitchToSignup} className="text-blue-500 hover:underline cursor-pointer">
                                Sign Up
                            </span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
