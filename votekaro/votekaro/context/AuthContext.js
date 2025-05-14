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

    const authContextValue = useMemo(() => ({
        currentUser,
        login: (username, password) => {
            const user = users.find(u => u.username === username && u.password === password);
            if (user) {
                console.log("Login successful:", user.username, "isAdmin:", user.isAdmin);
                setCurrentUser(user);
                return true;
            }
            console.log("Login failed for:", username);
            setCurrentUser(null);
            return false;
        },
        signup: (username, password) => {
            if (users.some(u => u.username === username)) {
                console.log("Signup failed: Username taken", username);
                return false; // Username already exists
            }
            const newUser = {
                id: `user${Date.now()}`, // Simple unique ID
                username,
                password,
                isAdmin: false,
                voterId: `VOTER${Math.floor(10000 + Math.random() * 90000)}` // Generate mock voter ID
            };
            setUsers(prevUsers => [...prevUsers, newUser]);
            console.log("Signup successful:", newUser.username);
            setCurrentUser(newUser); // Automatically log in after signup
            return true;
        },
        logout: () => {
            console.log("Logout");
            setCurrentUser(null);
        },
        // Function to get user details - useful for profile if needed beyond currentUser
        getUserById: (userId) => {
             return users.find(u => u.id === userId);
        }
    }), [currentUser, users]); // Include users in dependency array

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};