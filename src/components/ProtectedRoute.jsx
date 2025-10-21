import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or a spinner
  }

  // If authenticated, render the child route.
  // Otherwise, redirect to the login page.
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;