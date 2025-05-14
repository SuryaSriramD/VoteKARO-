import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { VotingProvider } from './context/VotingContext';
import AppNavigator from './navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native'; // Import StatusBar

export default function App() {
  return (
    <SafeAreaProvider>
        {/* Optional: Configure StatusBar globally */}
        <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
        <AuthProvider>
            <VotingProvider>
                <AppNavigator />
            </VotingProvider>
        </AuthProvider>
    </SafeAreaProvider>
  );
}