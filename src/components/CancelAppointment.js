import React, { useState } from 'react';
import apiClient from '../api/apiClient';

const CancelAppointment = () => {
    const [appointmentId, setAppointmentId] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            setMessage('You must be logged in to cancel an appointment.');
            return;
        }
        try {
            // API call to cancel the appointment by updating its status to CANCELED
            await apiClient.put(`/api/appointments/${appointmentId}/cancel`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setMessage('Appointment canceled successfully!');
            setAppointmentId(''); // Reset the input field
        } catch (error) {
            const errorMessage = error.response
                ? `${error.response.status}: ${error.response.data}`
                : error.message;
            setMessage('Failed to cancel appointment: ' + errorMessage);
        }
    };

    return (
        <div>
            <h2>Cancel Appointment</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Appointment ID:</label>
                    <input
                        type="text"
                        value={appointmentId}
                        onChange={(e) => setAppointmentId(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Cancel</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CancelAppointment;
