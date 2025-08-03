
import React, { createContext, useEffect } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

// Get the base URL with fallback
const getBaseUrl = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  if (!baseUrl || baseUrl === 'undefined') {
    console.warn('VITE_BASE_URL is not set, using fallback: http://localhost:3000');
    return 'http://localhost:3000';
  }
  return baseUrl;
};

const socket = io(getBaseUrl(), {
    transports: ['websocket', 'polling']
});

const SocketProvider = ({ children }) => {
    useEffect(() => {
        // Basic connection logic
        socket.on('connect', () => {
            console.log('✅ Connected to server');
        });

        socket.on('disconnect', () => {
            console.log('❌ Disconnected from server');
        });

        socket.on('connect_error', (error) => {
            console.error('❌ Socket connection error:', error);
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('connect_error');
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;