import React, { useState } from 'react';
import apiClient from '../api/apiClient';

function RegisterPatient() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        fullName: '',
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRegister = async () => {
        try {
            await apiClient.post('/auth/register/patient', formData); // Use the new endpoint
            setMessage('Patient registration successful!');
            setFormData({ username: '', password: '', email: '', fullName: '' }); // Reset form
        } catch (error) {
            console.error('Patient registration failed:', error);
            setMessage('Registration failed: ' + (error.response?.data || error.message));
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Register as Patient</h2>
            <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Username:</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
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
                        placeholder="Password"
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
                        placeholder="Email"
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
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
                <button type="submit" onClick={handleRegister} style={styles.button}>
                    Register
                </button>
            </form>
            {message && <p style={styles.message}>{message}</p>}
        </div>
    );
}

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
        color: '#f44336', // Red color for messages
    },
};

export default RegisterPatient;
