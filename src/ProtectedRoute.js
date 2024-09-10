import React from "react";
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth} from './firebase.init'
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
const ProtectedRoute = ({ children }) =>{

    const navigate=useNavigate();
    const [user,loading]=useAuthState(auth);
    if(!user)
    {
       return <Navigate to='/'/>;
    }
    return children;
}

export default ProtectedRoute;