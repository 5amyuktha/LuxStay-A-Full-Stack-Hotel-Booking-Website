import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { isLoggedIn, loading } = useContext(AuthContext);

    if (loading) {
        // You can render a loading spinner here
        return <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '2rem' }}>Loading...</div>;
    }

    return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;