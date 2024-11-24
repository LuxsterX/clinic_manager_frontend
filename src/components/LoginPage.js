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
      <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        {message && <p>{message}</p>}
      </div>
  );
};

export default LoginPage;
