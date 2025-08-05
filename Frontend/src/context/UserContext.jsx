import React, { createContext, useState, useEffect } from 'react';
import api from '../utils/api';// Adjust the import path as necessary

export const UserDataContext = createContext();

const UserContext = ({children}) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Check for existing user data on mount
    useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        setIsLoading(true);
        api.get('/users/profile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            setUser(res.data);
            setIsLoading(false);
        })
        .catch((err) => {
            console.error("Error fetching user profile:", err);
            setUser(null);
            // Only remove token if error is 401 (Unauthorized)
            if (err.response && err.response.status === 401) {
                localStorage.removeItem('token');
            }
            setIsLoading(false);
        });
    } else {
        setIsLoading(false);
    }
}, []); // <--- Only run on mount

    // Update user function
    const updateUser = (newUser) => {
        if (newUser) {
            console.log('Updating user data:', newUser);
            setUser(newUser);
        } else {
            console.log('Clearing user data');
            setUser(null);
        }
    };

    // Clear user function
    const clearUser = () => {
        console.log('Clearing user data');
        setUser(null);
        localStorage.removeItem('token');
    };

    const value = {
        user,
        setUser: updateUser,
        clearUser,
        isLoading,
        setIsLoading,
        error,
        setError
    };

    return (
        <UserDataContext.Provider value={value}>
            {children}
        </UserDataContext.Provider>
    );
};

export default UserContext;