import React, { useState } from 'react';
import SignupForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm';

const UserRegistration = () => {
    const [isLoginForm, setIsLoginForm] = useState(true);

    const handleSwitchToLogin = () => {
        setIsLoginForm(true);
    };

    const handleSwitchToSignup = () => {
        setIsLoginForm(false);
    };

    return (
        <div className="flex items-center justify-center border-2">
            {isLoginForm ? (
                <LoginForm onSwitchToSignup={handleSwitchToSignup} />
            ) : (
                <SignupForm onSwitchToLogin={handleSwitchToLogin} />
            )}
        </div>
    );
};

export default UserRegistration;
