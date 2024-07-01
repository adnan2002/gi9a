import React, {  useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../configs/Config'; // Ensure you have the correct path to your firebaseConfig.js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Link } from 'react-router-dom';
import { setDoc, doc, getDocs, query, where, collection } from 'firebase/firestore';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { getUserById, saveUserToLocalStorage } from '../utils/LocalStorageUtils';

const LoginForm = ({ onSwitchToSignup, onSwitchToForgotPassword }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [googleSignInResult, setGoogleSignInResult] = useState(null);
    const navigate = useNavigate();


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const userAuth = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            const userCred = await getUserById(userAuth?.user?.uid);
            delete userCred['uid'];
            saveUserToLocalStorage(userCred);
            navigate('/');
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
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        setError(null);
    
        try {
            // Query Firestore to check if the email already exists
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
    
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('email', '==', user.email));
            const querySnapshot = await getDocs(q);
    
            if (!querySnapshot.empty) {
                // If email already exists, set error and do not proceed
                setError('An account with this email already exists.');
                return;
            }
    
            // If email does not exist, proceed to save user data in Firestore
            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                signedInUsingGoogle: true
            });
    
            setGoogleSignInResult(user);
            console.log(googleSignInResult)
            navigate('/');
            console.log('Google sign-in successful:', user);
        } catch (error) {
            setError('An error occurred during Google sign-in. Please try again.');
            console.error('Error during Google sign-in:', error);
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
                        <span onClick={onSwitchToForgotPassword} className="text-blue-500 hover:underline cursor-pointer">Forgot Password?</span>
                    </div>
                    <div className="mb-6">
                        <button
                            type="button"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center w-full"
                            onClick={handleGoogleSignIn}
                            disabled={loading}
                        >
                            <FontAwesomeIcon icon={faGoogle} size="xl" className="pr-3" />
                            Sign in with Google
                        </button>
                    </div>
                    <div className="mb-6">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                            disabled={loading}
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
