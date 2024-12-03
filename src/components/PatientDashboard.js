import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient';

const PatientDashboard = () => {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to fetch appointments
    const fetchAppointments = async () => {
        const token = localStorage.getItem('token'); // Ensure token exists
        if (!token) {
            setError('User not logged in. Please log in first.');
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const response = await apiClient.get('/api/appointments', {
                headers: { Authorization: `Bearer ${token}` }, // Attach token in headers
            });

            console.log('Appointments fetched successfully:', response.data);

            setAppointments(response.data); // Set fetched appointments
        } catch (err) {
            const errorMessage = err.response
                ? `${err.response.status} ${err.response.statusText}: ${err.response.data}`
                : err.message;

            console.error('Error fetching appointments:', errorMessage);

            setError('Failed to fetch appointments. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    // Fetch appointments initially when component mounts
    React.useEffect(() => {
        fetchAppointments();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/'); // Redirect to the homepage
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Patient Dashboard</h2>
            <div style={styles.buttonContainer}>
                <button onClick={() => navigate('/schedule-appointment-patient')} style={styles.button}>
                    Schedule Appointment
                </button>
                <button onClick={() => navigate('/rate-appointment')} style={styles.button}>
                    Rate Appointment
                </button>
                <button onClick={() => navigate('/cancel-appointment')} style={styles.button}>
                    Cancel Appointment
                </button>
                <button onClick={handleLogout} style={styles.button}>
                    Logout
                </button>
                <button onClick={fetchAppointments} disabled={loading} style={styles.button}>
                    {loading ? 'Refreshing...' : 'Refresh Appointments'}
                </button>
            </div>

            <h3 style={styles.subheading}>Your Appointments</h3>
            {loading ? (
                <p>Loading appointments...</p>
            ) : error ? (
                <p style={styles.error}>{error}</p>
            ) : (
                <table style={styles.table}>
                    <thead>
                    <tr>
                        <th style={styles.tableHeader}>ID</th>
                        <th style={styles.tableHeader}>Doctor</th>
                        <th style={styles.tableHeader}>Date & Time</th>
                        <th style={styles.tableHeader}>Details</th>
                        <th style={styles.tableHeader}>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {appointments.map((appointment) => (
                        <tr key={appointment.id} style={styles.tableRow}>
                            <td style={styles.tableCell}>{appointment.id}</td>
                            <td style={styles.tableCell}>{appointment.doctorName}</td>
                            <td style={styles.tableCell}>
                                {new Date(appointment.dateTime).toLocaleString()}
                            </td>
                            <td style={styles.tableCell}>{appointment.details}</td>
                            <td style={styles.tableCell}>{appointment.status}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
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
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        marginBottom: '30px',
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
    subheading: {
        fontSize: '1.5rem',
        color: '#555',
    },
    table: {
        width: '80%',
        margin: '0 auto',
        borderCollapse: 'collapse',
        marginTop: '20px',
    },
    tableHeader: {
        backgroundColor: '#388E3C',
        color: 'white',
        padding: '12px',
        textAlign: 'center',
        border: '1px solid #ddd',
    },
    tableRow: {
        textAlign: 'center',
        borderBottom: '1px solid #ddd',
    },
    tableCell: {
        padding: '12px',
        border: '1px solid #ddd',
    },
    error: {
        color: '#f44336', // Red color for error messages
    },
};

export default PatientDashboard;
