import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Welcome to Clinic Manager</h1>
            <p style={styles.subheading}>Please choose an option:</p>

            <div style={styles.buttonContainer}>
                <button style={styles.button} onClick={() => navigate('/login')}>
                    Log In
                </button>
                <button style={styles.button} onClick={() => navigate('/register-patient')}>
                    Register
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        padding: '50px',
        fontFamily: 'Arial, sans-serif',
    },
    heading: {
        fontSize: '2.5rem',
        marginBottom: '20px',
        color: '#4CAF50',
    },
    subheading: {
        fontSize: '1.2rem',
        marginBottom: '40px',
        color: '#555',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
    },
    button: {
        padding: '15px 30px',
        fontSize: '1rem',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default HomePage;
