import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import apiClient from '../api/apiClient';
import { jwtDecode } from 'jwt-decode'; // Use named import for jwt-decode

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post('/auth/login', formData); // Login API call
      const token = response.data.token; // Get the token from response

      // Save the token to localStorage
      localStorage.setItem('token', token);

      setMessage('Login successful!');

      // Decode the token to get user role
      const decodedToken = jwtDecode(token); // Decode JWT token
      const role = decodedToken.role; // Extract role from token

      // Redirect based on user role
      if (role === 'PATIENT') {
        navigate('/patient-dashboard');
      } else if (role === 'DOCTOR') {
        navigate('/doctor-dashboard');
      } else if (role === 'ADMIN') {
        navigate('/admin-dashboard');
      } else {
        setMessage('Unknown user role: Access denied');
        localStorage.removeItem('token'); // Remove token for safety
      }
    } catch (error) {
      setMessage('Login failed: ' + (error.response?.data || error.message));
    }
  };

  return (
      <div style={styles.container}>
        <h2 style={styles.heading}>Login</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Username:</label>
            <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Password:</label>
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>Login</button>
        </form>
        {message && <p style={styles.message}>{message}</p>}
      </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
    fontFamily: 'Roboto, sans-serif',
    backgroundColor: '#f4f7f6',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '20px',
    color: '#2E7D32',
    fontWeight: '600',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    margin: '0 auto',
  },
  formGroup: {
    width: '100%',
    textAlign: 'left',
  },
  label: {
    fontSize: '1.2rem',
    color: '#555',
    marginBottom: '8px',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginBottom: '20px',
  },
  button: {
    padding: '15px 30px',
    fontSize: '1rem',
    backgroundColor: '#388E3C',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  message: {
    marginTop: '20px',
    fontSize: '1rem',
    color: '#f44336', // Red color for error messages
  },
};

export default LoginPage;
