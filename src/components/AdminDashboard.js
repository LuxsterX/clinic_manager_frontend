import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();

    const handleRegisterDoctor = () => {
        navigate('/register-doctor'); // Navigate to the doctor registration page
    };

    const handleLogout = () => {
        // Perform logout logic if necessary, e.g., clearing tokens
        navigate('/'); // Navigate to the home page
    };

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <button onClick={handleRegisterDoctor}>Register Doctor</button>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default AdminDashboard;
