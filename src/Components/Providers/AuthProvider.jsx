import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // const navigate = useNavigate();

    const login = async (email, password) => {
        try {
            const response = await fetch('https://hotel.aotrek.net/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();

            if (response.ok) {
                // Save token and user data
                localStorage.setItem('authToken', data.user.token); // Store token
                setUser(data.user); // Set user in context

                // Optionally, navigate to the home page or another protected route
                // navigate('/home'); 
            } else {
                throw new Error(data.message || 'Login failed');
            }
        } catch (error) {
            console.error(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('authToken'); // Remove token on logout
        setUser(null); // Clear user data
        navigate('/login'); // Navigate to login page
    };

    useEffect(() => {
        // Retrieve token and user data from localStorage if available
        const token = localStorage.getItem('authToken');
        if (token) {
            // Set user with token if it exists in localStorage (Optional: fetch user data with token)
            setUser({ token });
        }
        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
