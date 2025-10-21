import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={styles.layout}>
      {/* Sidebar Navigation */}
      <nav style={styles.sidebar}>
        <h2 style={styles.logo}>MoneyMgr</h2>
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <Link to="/dashboard" style={styles.navLink}>Dashboard</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/incomes" style={styles.navLink}>Incomes</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/expenses" style={styles.navLink}>Expenses</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/categories" style={styles.navLink}>Categories</Link>
          </li>
        </ul>
      </nav>

      {/* Main Content Area */}
      <div style={styles.main}>
        {/* Header Bar */}
        <header style={styles.header}>
          <div>Welcome, {user?.fullName}</div>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        </header>

        {/* Page Content Renders Here */}
        <div style={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

// Basic styles for the layout
const styles = {
  layout: { display: 'flex', minHeight: '100vh', backgroundColor: '#f9f9f9' },
  sidebar: { width: '220px', backgroundColor: '#ffffff', borderRight: '1px solid #e0e0e0', padding: '1rem' },
  logo: { textAlign: 'center', color: '#333', marginBottom: '2rem' },
  navList: { listStyle: 'none', padding: 0, margin: 0 },
  navItem: { marginBottom: '1rem' },
  navLink: { textDecoration: 'none', color: '#555', fontSize: '1.1rem', display: 'block', padding: '0.5rem 0.75rem', borderRadius: '6px' },
  main: { flex: 1, display: 'flex', flexDirection: 'column' },
  header: {
    padding: '1rem 2rem',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e0e0e0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoutButton: {
    padding: '0.5rem 1rem',
    border: 'none',
    backgroundColor: '#dc3545',
    color: 'white',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  content: { padding: '2rem' },
};

export default Layout;