import React, { useEffect, useState } from 'react';
import apiClient from '../api/apiClient';

const PatientDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [completedAppointments, setCompletedAppointments] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Pobranie wizyt pacjenta
        apiClient.get('/api/appointments?role=PATIENT&status=SCHEDULED')
            .then((response) => setAppointments(response.data))
            .catch((error) => console.error('Error fetching appointments:', error));

        // Pobranie zakończonych wizyt
        apiClient.get('/api/appointments?role=PATIENT&status=COMPLETED')
            .then((response) => setCompletedAppointments(response.data))
            .catch((error) => console.error('Error fetching completed appointments:', error));
    }, []);

    const handleRate = async (id, rating) => {
        try {
            await apiClient.post(`/api/ratings/${id}`, { score: rating }); // Ocena wizyty
            setCompletedAppointments(completedAppointments.filter((appointment) => appointment.id !== id));
            setMessage('Appointment rated successfully!');
        } catch (error) {
            setMessage('Failed to rate appointment: ' + error.message);
        }
    };

    return (
        <div>
            <h2>Patient Dashboard</h2>
            <h3>Upcoming Appointments</h3>
            {appointments.map((appointment) => (
                <div key={appointment.id}>
                    <p>Doctor: {appointment.doctor.fullName}</p>
                    <p>Date: {new Date(appointment.dateTime).toLocaleString()}</p>
                </div>
            ))}

            <h3>Rate Completed Appointments</h3>
            {completedAppointments.map((appointment) => (
                <div key={appointment.id}>
                    <p>Doctor: {appointment.doctor.fullName}</p>
                    <p>Date: {new Date(appointment.dateTime).toLocaleString()}</p>
                    {[1, 2, 3, 4, 5].map((rating) => (
                        <button key={rating} onClick={() => handleRate(appointment.id, rating)}>{rating}</button>
                    ))}
                </div>
            ))}
            {message && <p>{message}</p>}
        </div>
    );
};

export default PatientDashboard;
