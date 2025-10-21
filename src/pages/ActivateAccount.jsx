import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../services/api';

const ActivateAccount = () => {
  const [message, setMessage] = useState('Activating your account...');
  const [searchParams] = useSearchParams();
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const activate = async () => {
      // Get the token from the URL (e.g., /activate?token=...)
      const token = searchParams.get('token');

      if (!token) {
        setMessage('Activation token is missing. Invalid link.');
        setIsError(true);
        return;
      }

      try {
        // Send the token to the backend's /activate endpoint
        const response = await api.get(`/activate?token=${token}`);
        setMessage(response.data); // Should be "Profile Activated Successfully"
        setIsError(false);
      } catch (err) {
        setMessage('Activation failed. The token might be invalid or expired.');
        setIsError(true);
      }
    };

    activate();
  }, [searchParams]);

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={{ color: isError ? 'red' : 'green' }}>{message}</h2>
        {!isError && (
          <p>You can now log in to your account.</p>
        )}
        <Link to="/login" style={styles.button}>Go to Login</Link>
      </div>
    </div>
  );
};

const styles = {
  container: { 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh', 
    backgroundColor: '#f0f2f5' 
  },
  box: { 
    padding: '2rem', 
    backgroundColor: 'white', 
    borderRadius: '8px', 
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
    textAlign: 'center' 
  },
  button: {
    display: 'inline-block',
    marginTop: '1rem',
    padding: '0.75rem 1.5rem',
    textDecoration: 'none',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer'
  }
};

export default ActivateAccount;