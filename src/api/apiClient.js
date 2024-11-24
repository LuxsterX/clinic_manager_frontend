import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // Ensure this environment variable is correctly configured
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the Authorization header if the token exists
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Retrieve token
        console.log('Retrieved token:', token); // Log the token
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;
