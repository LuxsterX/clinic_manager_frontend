import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient';

const RegisterDoctor = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        fullName: '',
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await apiClient.post('/auth/register/doctor', formData); // Call API to register doctor
            setMessage('Doctor registered successfully!');
            setFormData({ username: '', password: '', email: '', fullName: '' }); // Reset form
        } catch (error) {
            setMessage('Registration failed: ' + (error.response?.data || error.message));
        }
    };

    const handleBackToDashboard = () => {
        navigate('/admin-dashboard'); // Redirect back to the admin dashboard
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Register Doctor</h2>
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
                <div style={styles.formGroup}>
                    <label style={styles.label}>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Full Name:</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
                <button type="submit" style={styles.button}>Register</button>
            </form>
            {message && <p style={styles.message}>{message}</p>}
            <button onClick={handleBackToDashboard} style={styles.backButton}>Back to Dashboard</button>
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
    backButton: {
        padding: '12px 25px',
        fontSize: '1rem',
        backgroundColor: '#f44336', // Red color for back button
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        marginTop: '20px',
    },
    message: {
        marginTop: '20px',
        fontSize: '1rem',
        color: '#f44336', // Red color for messages (success or error)
    },
};

export default RegisterDoctor;
