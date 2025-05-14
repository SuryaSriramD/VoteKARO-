import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, SafeAreaView, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { styles as globalStyles } from '../styles/GlobalStyles';

const SignupScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const { signup, isLoading } = useContext(AuthContext); // Get isLoading

    const handleSignup = () => {
        setError('');
        if (!username.trim() || !password || !confirmPassword) {
             setError('Please fill in all fields.');
             return;
        }
        if (password !== confirmPassword) {
             setError('Passwords do not match.');
             return;
        }
        if (password.length < 6) {
             setError('Password must be at least 6 characters long.');
             return;
        }

        const success = signup(username.trim(), password);
        if (!success && !isLoading) { // Only show error if signup failed immediately (e.g., username taken)
             setError('Username already exists. Please choose another.');
        }
         // Navigation happens automatically via AppNavigator if successful (after loading)
    };

    return (
        <SafeAreaView style={globalStyles.container}>
             <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1, justifyContent: 'center' }}
             >
                <Text style={globalStyles.title}>VoteKARO - Sign Up</Text>
                {error ? <Text style={globalStyles.errorText}>{error}</Text> : null}

                <TextInput
                    style={globalStyles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                    textContentType="username"
                    editable={!isLoading}
                />
                <TextInput
                    style={globalStyles.input}
                    placeholder="Password (min. 6 characters)"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    textContentType="newPassword"
                    editable={!isLoading}
                />
                <TextInput
                    style={globalStyles.input}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                    textContentType="newPassword"
                    editable={!isLoading}
                />

                {isLoading ? (
                     <ActivityIndicator size="large" color="#007bff" style={{ marginVertical: 10 }}/>
                ) : (
                    <>
                        <TouchableOpacity style={globalStyles.button} onPress={handleSignup} disabled={isLoading}>
                            <Text style={globalStyles.buttonText}>Sign Up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => !isLoading && navigation.navigate('Login')} disabled={isLoading}>
                            <Text style={globalStyles.linkText}>Already have an account? Login</Text>
                        </TouchableOpacity>
                    </>
                 )}
             </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

// No local styles needed unless further customization required

export default SignupScreen;