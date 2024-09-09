import React, { useContext } from 'react';
import { AuthContext } from '../Components/Providers/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <Spinner animation="border" variant="primary" />;
    }

    if (user && user.token) {
        return children; // Render children if authenticated
    }

    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
