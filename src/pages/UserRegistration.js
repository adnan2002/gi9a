import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../configs/Config'; // Ensure correct path to your firebase.js
import SignupForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm';
import ForgotPassword from '../components/ForgotPassword'; // Ensure correct path

const UserRegistration = () => {
    const [formState, setFormState] = useState('login');
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('/user');
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [navigate]);

    const handleSwitchToLogin = () => {
        setFormState('login');
    };

    const handleSwitchToSignup = () => {
        setFormState('signup');
    };

    const handleSwitchToForgotPassword = () => {
        setFormState('forgot');
    };

    return (
        <div className="flex items-center justify-center border-2">
            {formState === 'login' && (
                <LoginForm 
                    onSwitchToSignup={handleSwitchToSignup} 
                    onSwitchToForgotPassword={handleSwitchToForgotPassword} 
                />
            )}
            {formState === 'signup' && (
                <SignupForm onSwitchToLogin={handleSwitchToLogin} />
            )}
            {formState === 'forgot' && (
                <ForgotPassword onSwitchToLogin={handleSwitchToLogin} />
            )}
        </div>
    );
};

export default UserRegistration;
