import { db } from "../configs/Config";
import {doc, getDoc} from 'firebase/firestore'

export const saveUserToLocalStorage = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
};

export const getUserFromLocalStorage = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

export const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user');
};

export const getUserById = async (userId)=>{
    try {
        const userDoc = doc(db, 'users', userId);
        const userSnapshot = await getDoc(userDoc);
    
        if (userSnapshot.exists()) {
          return userSnapshot.data();
        } else {
          console.log('No such document!');
          return null;
        }
      } catch (error) {
        console.error('Error getting user document:', error);
        return null;
      }
};


export const isUserInLocalStorage = () => {
    return localStorage.getItem('user') !== null;
};


