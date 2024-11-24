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
            const response = await apiClient.get('/api/appointments/patient/appointments', {
                headers: { Authorization: `Bearer ${token}` }, // Attach token in headers
            });

            // Debug: Log server response
            console.log('Appointments fetched successfully:', response.data);

            setAppointments(response.data); // Set fetched appointments
        } catch (err) {
            const errorMessage = err.response
                ? `${err.response.status} ${err.response.statusText}: ${err.response.data}`
                : err.message;

            // Debug: Log the error message
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
        <div>
            <h2>Patient Dashboard</h2>
            <button onClick={() => navigate('/schedule-appointment')}>Schedule Appointment</button>
            <button onClick={() => navigate('/rate-appointment')}>Rate Appointment</button>
            <button onClick={() => navigate('/cancel-appointment')}>Cancel Appointment</button>
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
                        <th>Doctor</th>
                        <th>Date & Time</th>
                        <th>Details</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {appointments.map((appointment) => (
                        <tr key={appointment.id}>
                            <td>{appointment.id}</td>
                            <td>{appointment.doctorName || appointment.doctorId}</td>
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

export default PatientDashboard;
