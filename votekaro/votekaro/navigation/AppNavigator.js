import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator } from 'react-native'; // Added for potential loading state
import { AuthContext } from '../context/AuthContext';
import AuthNavigator from './AuthNavigator';
import UserNavigator from './UserNavigator';
import AdminNavigator from './AdminNavigator';

const AppNavigator = () => {
    const { currentUser, isLoading } = useContext(AuthContext); // Assume isLoading state exists if needed

    if (isLoading) { // Optional: Show loading indicator during initial auth check
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {!currentUser ? (
                // No user logged in, show Auth screens
                <AuthNavigator />
            ) : currentUser.isAdmin ? (
                // User is logged in and is an Admin
                 <AdminNavigator />
             ) : (
                 // User is logged in and is a Regular User
                 <UserNavigator />
             )}
        </NavigationContainer>
    );
};

export default AppNavigator;