import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import AuthNavigator from './AuthNavigator';
import UserNavigator from './UserNavigator';
import AdminNavigator from './AdminNavigator';

const AppNavigator = () => {
    const { currentUser, isLoading } = useContext(AuthContext);

    if (isLoading) { // Show loading indicator during initial auth check or login/signup process
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007bff" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {!currentUser ? (
                <AuthNavigator />
            ) : currentUser.isAdmin ? (
                 <AdminNavigator />
             ) : (
                 <UserNavigator />
             )}
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5', // Match background
    }
});

export default AppNavigator;