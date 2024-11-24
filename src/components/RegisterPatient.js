import React, { useState } from 'react';
import apiClient from '../api/apiClient';

function RegisterPatient() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        fullName: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRegister = async () => {
        try {
            await apiClient.post('/auth/register/patient', formData); // Use the new endpoint
            alert('Patient registration successful!');
            setFormData({ username: '', password: '', email: '', fullName: '' }); // Reset form
        } catch (error) {
            console.error('Patient registration failed:', error);
            alert('Registration failed: ' + (error.response?.data || error.message));
        }
    };

    return (
        <div>
            <h2>Register as Patient</h2>
            <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
            />
            <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
            />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
}

export default RegisterPatient;
