import React from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorDashboard = () => {
    const navigate = useNavigate();

    const handleNavigateToSchedule = () => {
        navigate('/schedule-appointment'); // Redirect to schedule appointment page
    };

    const handleNavigateToComplete = () => {
        navigate('/complete-appointment'); // Redirect to complete appointment page
    };

    const handleLogout = () => {
        navigate('/'); // Redirect to the homepage (or login screen)
    };

    return (
        <div>
            <h2>Doctor Dashboard</h2>
            <button onClick={handleNavigateToSchedule}>Schedule Next Appointment</button>
            <button onClick={handleNavigateToComplete}>Complete Appointment</button>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default DoctorDashboard;
