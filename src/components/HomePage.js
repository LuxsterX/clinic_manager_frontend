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
        fontFamily: 'Roboto, sans-serif',
        backgroundColor: '#f4f7f6', // Light background to make the content stand out
        height: '100vh', // Full screen height
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    heading: {
        fontSize: '3rem',
        marginBottom: '20px',
        color: '#2E7D32', // Darker green for a more professional look
        fontWeight: '600', // Bold heading for emphasis
    },
    subheading: {
        fontSize: '1.2rem',
        marginBottom: '40px',
        color: '#616161', // Soft grey for the subheading
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
    },
    button: {
        padding: '15px 30px',
        fontSize: '1.1rem',
        backgroundColor: '#388E3C', // Dark green button color
        color: 'white',
        border: 'none',
        borderRadius: '8px', // Rounded corners for a modern look
        cursor: 'pointer',
        transition: 'background-color 0.3s ease', // Smooth hover effect
    },
    buttonHover: {
        backgroundColor: '#2C6D2F', // Darker shade of green on hover
    },
};

export default HomePage;
