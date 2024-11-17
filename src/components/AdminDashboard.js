import React, { useState } from 'react';
import apiClient from '../api/apiClient';

const AdminDashboard = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        fullName: '',
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await apiClient.post('/api/auth/register/doctor', formData); // Rejestracja lekarza
            setMessage('Doctor registered successfully!');
        } catch (error) {
            setMessage('Registration failed: ' + error.response?.data || error.message);
        }
    };

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <form onSubmit={handleSubmit}>
                <h3>Add New Doctor</h3>
                <div>
                    <label>Username:</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Full Name:</label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
                </div>
                <button type="submit">Add Doctor</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AdminDashboard;
