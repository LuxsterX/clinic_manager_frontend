import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import apiClient from '../api/apiClient';

const ScheduleAppointmentByPatient = () => {
    const [formData, setFormData] = useState({
        doctorId: '',
        dateTime: '',
        details: '',
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            setMessage('You must be logged in to schedule an appointment.');
            return;
        }

        setLoading(true);
        try {
            const response = await apiClient.post(
                '/api/appointments/patient/schedule',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Attach the token
                    },
                }
            );
            setMessage('Appointment scheduled successfully!');
            setFormData({ doctorId: '', dateTime: '', details: '' });

            // Redirect to the patient dashboard
            setTimeout(() => navigate('/patient-dashboard'), 2000); // Redirect after 2 seconds
        } catch (error) {
            const errorMessage = error.response
                ? `${error.response.status} ${error.response.statusText}: ${error.response.data}`
                : error.message;
            setMessage('Failed to schedule appointment: ' + errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Schedule Appointment (Patient)</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Doctor ID:</label>
                    <input
                        type="text"
                        name="doctorId"
                        value={formData.doctorId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Date and Time:</label>
                    <input
                        type="datetime-local"
                        name="dateTime"
                        value={formData.dateTime}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Details (Optional):</label>
                    <input
                        type="text"
                        name="details"
                        value={formData.details}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Scheduling...' : 'Schedule Appointment'}
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ScheduleAppointmentByPatient;
