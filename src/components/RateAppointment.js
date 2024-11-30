import React, { useState } from 'react';
import apiClient from '../api/apiClient';

const RateAppointment = () => {
    const [formData, setFormData] = useState({
        appointmentId: '',
        score: '',
        comments: '',
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
            // API call to rate appointment
            const response = await apiClient.post(
                `/api/ratings/rate?appointmentId=${formData.appointmentId}&score=${formData.score}&comments=${formData.comments || ''}`
            );
            setMessage('Appointment rated successfully!');
            setFormData({ appointmentId: '', score: '', comments: '' }); // Reset form
        } catch (error) {
            setMessage('Failed to rate appointment: ' + (error.response?.data || error.message));
        }
    };

    return (
        <div>
            <h2>Rate Appointment</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Appointment ID:</label>
                    <input
                        type="text"
                        name="appointmentId"
                        value={formData.appointmentId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Score (1-5):</label>
                    <input
                        type="number"
                        name="score"
                        value={formData.score}
                        onChange={handleChange}
                        min="1"
                        max="5"
                        required
                    />
                </div>
                <div>
                    <label>Comments (Optional):</label>
                    <input
                        type="text"
                        name="comments"
                        value={formData.comments}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Rate</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default RateAppointment;
