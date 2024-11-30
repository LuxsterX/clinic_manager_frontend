import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPatient from './components/RegisterPatient';
import AdminDashboard from './components/AdminDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import PatientDashboard from './components/PatientDashboard';
import RegisterDoctor from './components/RegisterDoctor';
import CompleteAppointment from './components/CompleteAppointment';
import RateAppointment from './components/RateAppointment';
import CancelAppointment from './components/CancelAppointment';
import ScheduleAppointmentByDoctor from './components/ScheduleAppointmentByDoctor';
import ScheduleAppointmentByPatient from "./components/ScheduleAppointmentByPatient";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register-patient" element={<RegisterPatient />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
                <Route path="/patient-dashboard" element={<PatientDashboard />} />
                <Route path="/register-doctor" element={<RegisterDoctor />} />
                <Route path="/complete-appointment" element={<CompleteAppointment />} />
                <Route path="/rate-appointment" element={<RateAppointment />} />
                <Route path="/cancel-appointment" element={<CancelAppointment />} />
                <Route path="/schedule-appointment-doctor" element={<ScheduleAppointmentByDoctor />} />
                <Route path="/complete-appointment" element={<CompleteAppointment />} />
                <Route path="/schedule-appointment-patient" element={<ScheduleAppointmentByPatient />} />
                <Route path="/rate-appointment" element={<RateAppointment />} />
                <Route path="/cancel-appointment" element={<CancelAppointment />} />
            </Routes>
        </Router>
    );
}

export default App;
