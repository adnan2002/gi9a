import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth, db } from '../configs/Config'; // Ensure you have the correct path to your firebase.js
import { collection, query, where, getDocs } from 'firebase/firestore';

const ForgotPassword = ({ onSwitchToLogin }) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isGoogleAccount, setIsGoogleAccount] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        setError(null);
        setLoading(true);
        setIsGoogleAccount(false);

        try {
            // Query Firestore to check if the user signed in using Google
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('email', '==', email));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0].data();
                if (userDoc.signedInUsingGoogle) {
                    setIsGoogleAccount(true);
                } else {
                    await sendPasswordResetEmail(auth, email);
                    setMessage('Password reset email sent. Please check your inbox.');
                }
            } else {
                setError('No user found with this email.');
            }
        } catch (error) {
            setError('An error occurred while sending the password reset email. Please try again.');
            console.error('Error sending password reset email:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center w-96 bg-gray-100 ">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    {message && <div className="text-green-500 mb-4">{message}</div>}
                    {error && <div className="text-red-500 mb-4">{error}</div>}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                        disabled={loading}
                    >
                        {loading ? 'Sending...' : 'Send Password Reset Email'}
                    </button>
                    <div className="text-center">
                        <p className="text-gray-700 mt-10">
                            Go back to{' '}
                            <span onClick={onSwitchToLogin} className="text-blue-500 hover:underline cursor-pointer">
                                Login
                            </span>
                        </p>
                    </div>
                </form>
                {isGoogleAccount && (
                    <div className="mt-4 p-4 bg-yellow-100 text-yellow-700 rounded">
                        <p>If you signed in using Google, you do not need a password to access your account.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
