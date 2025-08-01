import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

// Axios instance to automatically add the auth header
const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
});

apiClient.interceptors.request.use(config => {
    const authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null;
    if (authTokens) {
        config.headers.Authorization = `Bearer ${authTokens.access}`;
    }
    return config;
});


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const loginUser = async (email, password) => {
        try {
            const response = await apiClient.post('/auth/login/', { email, password });
            const data = response.data;
            localStorage.setItem('authTokens', JSON.stringify(data));
            // دوای لۆگین، زانیاری تەواوی یوزەر وەردەگرین
            await fetchCurrentUser(); 
            return { success: true };
        } catch (error) {
            return { success: false, error: 'Invalid email or password.' };
        }
    };

    const logoutUser = () => {
        localStorage.removeItem('authTokens');
        setUser(null);
    };

    const fetchCurrentUser = async () => {
        const authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null;
        if (!authTokens) {
            setLoading(false);
            return;
        }
        try {
            const response = await apiClient.get('/auth/user/');
            setUser(response.data);
        } catch (error) {
            // ئەگەر تۆکنەکە هەڵە بوو
            logoutUser();
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchCurrentUser();
    }, []);

    const contextData = {
        user,
        loginUser,
        logoutUser,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? <p>Loading...</p> : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};