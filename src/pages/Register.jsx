import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    
    if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
    }

    try {
      // Calls the register function from your AuthContext
      await register(fullName, email, password);
      setMessage('Registration successful! Please check your email to activate your account.');
      
      // Optional: redirect to login after a few seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);

    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
         setError(err.response.data.message);
      } else {
         setError('Registration failed. Please try again.');
      }
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>Register</h2>
        {error && <p style={styles.error}>{error}</p>}
        {message && <p style={styles.message}>{message}</p>}
        
        <div style={styles.inputGroup}>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        
        <div style={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        
        <button type="submit" style={styles.button}>Register</button>
        <p style={styles.link}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

// Basic CSS-in-JS for styling
const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' },
  form: { padding: '2rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', minWidth: '300px' },
  inputGroup: { marginBottom: '1rem' },
  input: { width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' },
  button: { width: '100%', padding: '0.75rem', border: 'none', borderRadius: '4px', backgroundColor: '#007bff', color: 'white', cursor: 'pointer' },
  error: { color: 'red', textAlign: 'center' },
  message: { color: 'green', textAlign: 'center' },
  link: { textAlign: 'center', marginTop: '1rem' }
};

export default Register;