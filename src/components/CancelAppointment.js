import React, { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';

const CancelAppointment = () => {
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await apiClient.get('/api/appointments/patient/appointments/status/SCHEDULED', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setAppointments(response.data);
            } catch (error) {
                setMessage('Failed to fetch appointments: ' + error.message);
            }
        };
        fetchAppointments();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await apiClient.put(`/api/appointments/${selectedAppointment}/cancel`, null, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setMessage('Appointment canceled successfully!');
            setSelectedAppointment('');
        } catch (error) {
            setMessage('Failed to cancel appointment: ' + error.message);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Cancel Appointment</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Appointment:</label>
                    <select
                        value={selectedAppointment}
                        onChange={(e) => setSelectedAppointment(e.target.value)}
                        required
                        style={styles.select}
                    >
                        <option value="">Select an appointment</option>
                        {appointments.map((appointment) => (
                            <option key={appointment.id} value={appointment.id}>
                                {appointment.details} - {new Date(appointment.dateTime).toLocaleString()}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" style={styles.button}>Cancel</button>
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
    select: {
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

export default CancelAppointment;
