import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import PatientDashboard from './components/PatientDashboard';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/doctor" element={<DoctorDashboard />} />
                <Route path="/patient" element={<PatientDashboard />} />
            </Routes>
        </Router>
    );
};

export default App;
