import React, { useState } from 'react';
import apiClient from '../api/apiClient';

const CompleteAppointment = () => {
    const [appointmentId, setAppointmentId] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Retrieve token from localStorage
        const token = localStorage.getItem('token');
        if (!token) {
            setMessage('You must be logged in to complete an appointment.');
            return;
        }

        // Validate appointment ID
        if (!appointmentId.trim()) {
            setMessage('Appointment ID cannot be empty.');
            return;
        }

        try {
            // Send PUT request to complete the appointment
            const response = await apiClient.put(
                `/api/appointments/${appointmentId}/complete`,
                {}, // Empty body
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setMessage(response.data || 'Appointment completed successfully!');
            setAppointmentId(''); // Reset input field
        } catch (error) {
            // Error handling with detailed message
            const errorMessage = error.response
                ? `${error.response.status} ${error.response.statusText}: ${error.response.data || 'An error occurred'}`
                : 'An unexpected error occurred.';
            setMessage(`Failed to complete appointment: ${errorMessage}`);
        }
    };

    return (
        <div>
            <h2>Complete Appointment</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="appointmentId">Appointment ID:</label>
                    <input
                        type="text"
                        id="appointmentId"
                        value={appointmentId}
                        onChange={(e) => setAppointmentId(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Complete Appointment</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CompleteAppointment;
