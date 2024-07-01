import {useEffect} from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import {auth} from '../configs/Config'
import { removeUserFromLocalStorage } from '../utils/LocalStorageUtils';
const User = ()=>{
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                removeUserFromLocalStorage();
                return navigate('/registration');
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [navigate]);
    return (
        <h1>
            This is the user page
        </h1>
    )
}


export default User