import React, { createContext, useState, useMemo } from 'react';

export const AuthContext = createContext();

// Mock user data (replace with API calls in a real app)
const initialUsers = [
    { id: 'admin001', username: 'admin', password: 'password', isAdmin: true, voterId: 'ADMIN' },
    { id: 'user001', username: 'testuser', password: 'password', isAdmin: false, voterId: 'VOTER12345' },
];

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [users, setUsers] = useState(initialUsers); // In-memory user store
    const [isLoading, setIsLoading] = useState(false); // Optional loading state

    const authContextValue = useMemo(() => ({
        currentUser,
        isLoading, // Expose loading state if needed by AppNavigator
        login: (username, password) => {
            setIsLoading(true); // Simulate loading
            const user = users.find(u => u.username === username && u.password === password);
            // Simulate network delay
            setTimeout(() => {
                 if (user) {
                    console.log("Login successful:", user.username, "isAdmin:", user.isAdmin);
                    setCurrentUser(user);
                    setIsLoading(false);
                } else {
                     console.log("Login failed for:", username);
                    setCurrentUser(null);
                    setIsLoading(false);
                }
            }, 500); // 0.5 second delay

            // Need to return promise or handle differently if expecting immediate result
            // For now, just return true/false based on immediate find (won't reflect delay)
            return !!user;
        },
        signup: (username, password) => {
            setIsLoading(true);
            let success = false;
            if (users.some(u => u.username === username)) {
                console.log("Signup failed: Username taken", username);
                success = false;
            } else {
                const newUser = {
                    id: `user${Date.now()}`, // Simple unique ID
                    username,
                    password, // Store plain text password (NOT RECOMMENDED FOR REAL APPS)
                    isAdmin: false,
                    voterId: `VOTER${Math.floor(10000 + Math.random() * 90000)}` // Generate mock voter ID
                };
                setUsers(prevUsers => [...prevUsers, newUser]);
                console.log("Signup successful:", newUser.username);
                setCurrentUser(newUser); // Automatically log in after signup
                success = true;
            }
             // Simulate network delay
             setTimeout(() => {
                 setIsLoading(false);
             }, 500);
            return success;
        },
        logout: () => {
            console.log("Logout");
            setCurrentUser(null);
        },
        getUserById: (userId) => {
             return users.find(u => u.id === userId);
        }
    }), [currentUser, users, isLoading]); // Include dependencies

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};