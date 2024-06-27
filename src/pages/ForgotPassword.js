import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../configs/Config'; // Ensure you have the correct path to your firebase.js

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        setError(null);
        setLoading(true);

        try {
            await sendPasswordResetEmail(auth, email);
            setMessage('Password reset email sent. Please check your inbox.');
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                setError('No user found with this email.');
            } else {
                setError('An error occurred while sending the password reset email. Please try again.');
            }
            console.error('Error sending password reset email:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
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
                            onChange={(e) => setEmail(e.target.value)}
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
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
