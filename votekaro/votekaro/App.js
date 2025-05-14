import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { VotingProvider } from './context/VotingContext';
import AppNavigator from './navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context'; // Important for proper layout

export default function App() {
  return (
    <SafeAreaProvider>
        <AuthProvider>
            <VotingProvider>
                <AppNavigator />
            </VotingProvider>
        </AuthProvider>
    </SafeAreaProvider>
  );
}