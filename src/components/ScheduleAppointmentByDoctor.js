import React, { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';

const ScheduleAppointmentByDoctor = () => {
    const [formData, setFormData] = useState({
        patientId: '',
        dateTime: '',
        details: '',
    });
    const [patients, setPatients] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Pobierz listę pacjentów
        const fetchPatients = async () => {
            try {
                const response = await apiClient.get('/api/users/patients');
                setPatients(response.data); // Ustaw dane pacjentów w stanie
            } catch (error) {
                console.error('Failed to fetch patients:', error);
                setMessage('Nie udało się pobrać listy pacjentów.');
            }
        };
        fetchPatients();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            await apiClient.post('/api/appointments/doctor/schedule', formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessage('Appointment scheduled successfully!');
            setFormData({ patientId: '', dateTime: '', details: '' });
        } catch (error) {
            setMessage('Failed to schedule appointment: ' + error.message);
        } finally {
            setLoading(false);
        }
    };



    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Zaplanuj wizytę (Doktor)</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Pacjent:</label>
                    <select
                        name="patientId"
                        value={formData.patientId}
                        onChange={handleChange}
                        required
                        style={styles.select}
                    >
                        <option value="">Wybierz pacjenta</option>
                        {patients.length > 0 ? (
                            patients.map((patient) => (
                                <option key={patient.id} value={patient.id}>
                                    {patient.fullName}
                                </option>
                            ))
                        ) : (
                            <option disabled>Brak pacjentów</option>
                        )}
                    </select>
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Data i godzina:</label>
                    <input
                        type="datetime-local"
                        name="dateTime"
                        value={formData.dateTime}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Szczegóły (opcjonalne):</label>
                    <input
                        type="text"
                        name="details"
                        value={formData.details}
                        onChange={handleChange}
                        style={styles.input}
                    />
                </div>
                <button type="submit" style={styles.button}>
                    Zaplanuj wizytę
                </button>
            </form>
            {message && <p style={styles.message}>{message}</p>}
        </div>
    );
};

const styles = {
    container: { textAlign: 'center', padding: '50px', fontFamily: 'Roboto, sans-serif', backgroundColor: '#f4f7f6', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' },
    heading: { fontSize: '2.5rem', marginBottom: '20px', color: '#2E7D32', fontWeight: '600' },
    form: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', backgroundColor: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', maxWidth: '400px', margin: '0 auto' },
    formGroup: { width: '100%', textAlign: 'left' },
    label: { fontSize: '1.2rem', color: '#555', marginBottom: '8px' },
    select: { width: '100%', padding: '10px', fontSize: '1rem', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '20px' },
    input: { width: '100%', padding: '10px', fontSize: '1rem', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '20px' },
    button: { padding: '15px 30px', fontSize: '1rem', backgroundColor: '#388E3C', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: 'background-color 0.3s ease' },
    message: { marginTop: '20px', fontSize: '1rem', color: '#f44336' },
};

export default ScheduleAppointmentByDoctor;
