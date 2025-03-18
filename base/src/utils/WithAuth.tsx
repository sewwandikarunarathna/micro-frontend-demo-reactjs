import React, { Component } from 'react'
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const withAuth = (WrappedComponent: any) => {
    const WithAuthComponent = (props: any) => {
        const { isLoggedIn } = useAuth();
    
        // Check if user exists and has the required role
        if (!isLoggedIn) {
          return <Navigate to="/login" replace />;
        }

    
        return <WrappedComponent {...props} />;
    };
    return WithAuthComponent;
}

export default withAuth;
