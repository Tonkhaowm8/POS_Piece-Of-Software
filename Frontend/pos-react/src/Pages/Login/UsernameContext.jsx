import React, { createContext, useContext, useState } from 'react';

// Create a context for the username
const UsernameContext = createContext();

// Create a custom hook for accessing the username and its setter
export function useUsername() {
    return useContext(UsernameContext);
}

// Create a provider component to wrap your app and provide the username state
export function UsernameProvider({ children }) {
    const [username, setUsername] = useState(''); // Initialize with an empty string

    return (
        <UsernameContext.Provider value={{ username, setUsername }}>
            {children}
        </UsernameContext.Provider>
    );
}