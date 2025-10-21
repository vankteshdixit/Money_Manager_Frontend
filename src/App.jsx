import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';


// Pages
import Dashboard from './pages/Dashboard.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ActivateAccount from './pages/ActivateAccount.jsx';
import Incomes from './pages/Incomes.jsx';
import Expenses from './pages/Expenses.jsx';
import Categories from './pages/Categories.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Layout from './components/Layout.jsx';

// A small component to handle redirection if logged in
const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? <Navigate to="/dashboard" replace /> : children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/login" 
            element={<PublicRoute><Login /></PublicRoute>} 
          />
          <Route 
            path="/register" 
            element={<PublicRoute><Register /></PublicRoute>} 
          />
          {/* The backend activation link is '/activate'
            The link sent in the email might be different,
            but this frontend route must match the URL the user clicks.
            We'll assume the controller path `/activate` is what the user hits.
          */}
          <Route path="/activate" element={<ActivateAccount />} />

          {/* Protected Routes (Inside Layout) */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}> {/* Wrap protected pages in a Layout */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/incomes" element={<Incomes />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/categories" element={<Categories />} />
            </Route>
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;