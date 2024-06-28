// src/components/SignOutButton.js
import React from 'react';
import { auth } from '../configs/Config';
import { signOut } from 'firebase/auth';

const SignOutButton = () => {
    let error = "";
  const handleSignOut = () => {
    signOut(auth).then(() => {
      console.log("User signed out successfully.");
    }).catch((error) => {
      console.error("Error signing out: ", error);
      error = error.toString();
    });
  };

  return (
    <button onClick={handleSignOut} className="px-4 py-2 bg-blue-500 text-white rounded">
      Sign Out
      <div>
        {error}
      </div>
    </button>
  );
};

export default SignOutButton;
