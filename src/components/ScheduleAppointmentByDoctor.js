import React, { useState } from 'react';
import apiClient from '../api/apiClient';

const ScheduleAppointmentByDoctor = () => {
    const [formData, setFormData] = useState({
        patientId: '',
        dateTime: '',
        details: '',
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Post appointment details to API
            await apiClient.post('/appointments/doctor/schedule', formData);
            setMessage('Appointment scheduled successfully by the doctor!');
            setFormData({ patientId: '', dateTime: '', details: '' }); // Reset form
        } catch (error) {
            setMessage('Failed to schedule appointment: ' + (error.response?.data || error.message));
        }
    };

    return (
        <div>
            <h2>Schedule Appointment (Doctor)</h2>
            <p>As a doctor, schedule an appointment for your patient below.</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Patient ID:</label>
                    <input
                        type="text"
                        name="patientId"
                        value={formData.patientId}
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
                    <label>Details (Optional Notes):</label>
                    <input
                        type="text"
                        name="details"
                        value={formData.details}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Schedule Appointment</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ScheduleAppointmentByDoctor;
