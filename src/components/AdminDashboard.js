import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();

    const handleRegisterDoctor = () => {
        navigate('/register-doctor'); // Navigate to the doctor registration page
    };

    const handleLogout = () => {
        // Perform logout logic if necessary, e.g., clearing tokens
        navigate('/'); // Navigate to the home page
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Admin Dashboard</h2>
            <div style={styles.buttonContainer}>
                <button style={styles.button} onClick={handleRegisterDoctor}>
                    Register Doctor
                </button>
                <button style={styles.button} onClick={handleLogout}>
                    Logout
                </button>
            </div>
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
        marginBottom: '30px',
        color: '#2E7D32',
        fontWeight: '600',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
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
    buttonHover: {
        backgroundColor: '#2C6D2F',
    },
};

export default AdminDashboard;
