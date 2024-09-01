import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
function PrivateRoute({
    children
})
 {
    const isAuthenticate = useSelector(state=> state.auth.isAuthenticate); 


    return isAuthenticate ? children : <Navigate to='/login'/> ;
         
}

export default PrivateRoute;