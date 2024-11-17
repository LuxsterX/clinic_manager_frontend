import React, { useEffect, useState } from 'react';
import apiClient from '../api/apiClient';

const DoctorDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Pobranie wizyt do potwierdzenia
        apiClient.get('/api/appointments?role=DOCTOR&status=SCHEDULED')
            .then((response) => setAppointments(response.data))
            .catch((error) => console.error('Error fetching appointments:', error));
    }, []);

    const handleComplete = async (id) => {
        try {
            await apiClient.patch(`/api/appointments/${id}/complete`); // Potwierdzenie wizyty
            setAppointments(appointments.filter((appointment) => appointment.id !== id));
            setMessage('Appointment marked as completed!');
        } catch (error) {
            setMessage('Failed to complete appointment: ' + error.message);
        }
    };

    return (
        <div>
            <h2>Doctor Dashboard</h2>
            <h3>Pending Appointments</h3>
            {appointments.map((appointment) => (
                <div key={appointment.id}>
                    <p>Patient: {appointment.patient.fullName}</p>
                    <p>Date: {new Date(appointment.dateTime).toLocaleString()}</p>
                    <button onClick={() => handleComplete(appointment.id)}>Mark as Completed</button>
                </div>
            ))}
            {message && <p>{message}</p>}
        </div>
    );
};

export default DoctorDashboard;
