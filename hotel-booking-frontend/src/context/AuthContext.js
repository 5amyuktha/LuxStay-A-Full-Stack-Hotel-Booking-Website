import React, { createContext, useState, useEffect} from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    // RENAMED: 'token' state variable to 'authToken' for consistency
    const [authToken, setAuthToken] = useState(localStorage.getItem('token') || null);
    const [loading, setLoading] = useState(true);

    const API_URL = 'http://localhost:5000/api/auth';

    useEffect(() => {
        const loadUser = async () => {
            // Use 'authToken' here
            if (authToken) {
                try {
                    // Client-side decoding of JWT to get basic user info for display
                    // In a production app, you might hit a /api/auth/me endpoint to verify token
                    // and get fresh user data from the backend.
                    const decoded = JSON.parse(atob(authToken.split('.')[1]));
                    // Assuming your JWT payload contains 'id', 'username', and 'email'
                    setUser({
                        id: decoded.id,
                        username: decoded.username || 'User', // Provide a fallback
                        email: decoded.email || 'N/A' // Provide a fallback
                    });
                } catch (error) {
                    console.error('Failed to load user from token or token malformed/expired:', error);
                    // Clear invalid token and user state
                    setAuthToken(null);
                    localStorage.removeItem('token');
                    setUser(null);
                }
            }
            setLoading(false);
        };
        loadUser();
    }, [authToken]); // Dependency array updated to 'authToken'

    const register = async (username, email, password) => {
        setLoading(true);
        try {
            const res = await axios.post(`${API_URL}/register`, { username, email, password });
            // Use 'setAuthToken'
            setAuthToken(res.data.token);
            localStorage.setItem('token', res.data.token);
            setUser(res.data.user);
            setLoading(false);
            return { success: true, message: res.data.message };
        } catch (error) {
            console.error('Registration failed:', error.response ? error.response.data : error.message);
            setLoading(false);
            return { success: false, message: error.response?.data?.message || 'Registration failed' };
        }
    };

    const login = async (email, password) => {
        setLoading(true);
        try {
            const res = await axios.post(`${API_URL}/login`, { email, password });
            // Use 'setAuthToken'
            setAuthToken(res.data.token);
            localStorage.setItem('token', res.data.token);
            setUser(res.data.user);
            setLoading(false);
            return { success: true, message: res.data.message };
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
            // Use 'setAuthToken'
            setAuthToken(null);
            localStorage.removeItem('token');
            setUser(null);
            setLoading(false);
            return { success: false, message: error.response?.data?.message || 'Login failed' };
        }
    };

    const logout = () => {
        // Use 'setAuthToken'
        setAuthToken(null);
        setUser(null);
        localStorage.removeItem('token');
    };

    // Use 'authToken' for isLoggedIn check
    const isLoggedIn = !!authToken && !!user;

    return (
        // EXPOSE 'authToken' in the context value
        <AuthContext.Provider value={{ user, authToken, isLoggedIn, loading, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};