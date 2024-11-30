import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient';

const DoctorDashboard = () => {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Funkcja pobierania wizyt
    const fetchAppointments = async () => {
        const token = localStorage.getItem('token'); // Pobranie tokena
        if (!token) {
            setError('User not logged in. Please log in first.');
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const response = await apiClient.get('/api/appointments', {
                headers: { Authorization: `Bearer ${token}` }, // Dodanie tokena w nagłówkach
            });

            console.log('Appointments fetched successfully:', response.data);
            setAppointments(response.data); // Ustawienie wizyt
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

    // Pobranie wizyt przy załadowaniu komponentu
    useEffect(() => {
        fetchAppointments();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/'); // Przekierowanie na stronę główną
    };

    return (
        <div>
            <h2>Doctor Dashboard</h2>
            <button onClick={() => navigate('/schedule-appointment-doctor')}>Schedule Next Appointment</button>
            <button onClick={() => navigate('/complete-appointment')}>Complete Appointment</button>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={fetchAppointments} disabled={loading}>
                {loading ? 'Refreshing...' : 'Refresh Appointments'}
            </button>

            <h3>Your Appointments</h3>
            {loading ? (
                <p>Loading appointments...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <table border="1">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Patient</th>
                        <th>Date & Time</th>
                        <th>Details</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {appointments.map((appointment) => (
                        <tr key={appointment.id}>
                            <td>{appointment.id}</td>
                            <td>{appointment.patientName}</td>
                            {/* Wyświetlanie pełnej nazwy pacjenta */}
                            <td>{new Date(appointment.dateTime).toLocaleString()}</td>
                            <td>{appointment.details}</td>
                            <td>{appointment.status}</td>
                        </tr>
                    ))}
                    </tbody>

                </table>
            )}
        </div>
    );
};

export default DoctorDashboard;
