import React, { createContext, useState, useContext, useEffect } from 'react';
import apiClient from '../lib/axios'; // 1. apiClient لە فایلی ناوەندییەوە import دەکەین

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authTokens, setAuthTokens] = useState(() => 
        localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
    );
    const [loading, setLoading] = useState(true);

    const loginUser = async (email, password) => {
        try {
            // 2. apiClient بەکاردەهێنین
            const response = await apiClient.post('/auth/login/', { email, password });
            const data = response.data;
            
            // 3. authTokens لە localStorage پاشەکەوت دەکەین
            localStorage.setItem('authTokens', JSON.stringify(data));
            setAuthTokens(data);

            // 4. زانیاری بەکارهێنەر لە تۆکنە نوێیەکە وەردەگرین
            const userResponse = await apiClient.get('/auth/user/');
            setUser(userResponse.data);

            return { success: true };
        } catch (error) {
            return { success: false, error: 'Invalid email or password.' };
        }
    };

    const logoutUser = () => {
        localStorage.removeItem('authTokens');
        setAuthTokens(null);
        setUser(null);
    };

    useEffect(() => {
        const fetchUserOnLoad = async () => {
            if (authTokens) {
                try {
                    // 5. apiClient بەکاردەهێنین
                    const response = await apiClient.get('/auth/user/');
                    setUser(response.data);
                } catch {
                    logoutUser(); // ئەگər تۆکنەکە هەڵە بوو
                }
            }
            setLoading(false);
        };
        fetchUserOnLoad();
    }, []); // تەنها یەکجار کاردەکات

    const contextData = {
        user,
        authTokens,
        loginUser,
        logoutUser,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? <p>Loading application...</p> : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};