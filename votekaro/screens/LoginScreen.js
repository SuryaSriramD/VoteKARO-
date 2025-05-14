import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, SafeAreaView, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { styles as globalStyles } from '../styles/GlobalStyles';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'password';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, isLoading } = useContext(AuthContext); // Get isLoading state

    const handleLogin = async () => { // Make async if login returns promise
        setError('');
        if (!username || !password) {
            setError('Please enter both username and password.');
            return;
        }
        const success = login(username, password); // Context login handles loading state
        if (!success) { // This check might run before async login completes
             // Error setting might be handled by context or need adjustment for async
             setTimeout(() => { // Crude way to check after delay
                 if (!isLoading && !error) { // Check if still loading or error set
                    setError('Invalid username or password.');
                 }
             }, 600); // Slightly longer than login delay
        }
    };

    const handleAdminLogin = async () => { // Make async if login returns promise
        setError('');
        console.log(`Attempting direct admin login with user: ${ADMIN_USERNAME}`);
        const success = login(ADMIN_USERNAME, ADMIN_PASSWORD);
         if (!success) {
              setTimeout(() => {
                 if (!isLoading && !error) {
                    setError('Admin login failed.');
                    Alert.alert('Admin Login Failed', 'Could not log in as admin.');
                 }
             }, 600);
        }
    };

    return (
        <SafeAreaView style={globalStyles.container}>
             <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1, justifyContent: 'center' }} // Adjust styling as needed
             >
                <Text style={globalStyles.title}>VoteKARO - Login</Text>
                {error ? <Text style={globalStyles.errorText}>{error}</Text> : null}

                <TextInput
                    style={globalStyles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                    textContentType="username"
                    editable={!isLoading} // Disable input while loading
                />
                <TextInput
                    style={globalStyles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    textContentType="password"
                     editable={!isLoading} // Disable input while loading
                />

                {isLoading ? (
                    <ActivityIndicator size="large" color="#007bff" style={{ marginVertical: 10 }}/>
                ) : (
                    <>
                        <TouchableOpacity style={globalStyles.button} onPress={handleLogin} disabled={isLoading}>
                            <Text style={globalStyles.buttonText}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => !isLoading && navigation.navigate('Signup')} disabled={isLoading}>
                            <Text style={globalStyles.linkText}>Don't have an account? Sign Up</Text>
                        </TouchableOpacity>

                        <View style={styles.separator} />
                        <Text style={styles.orText}>Admin Access</Text>

                        <TouchableOpacity
                            style={[globalStyles.button, styles.adminButton]}
                            onPress={handleAdminLogin}
                            disabled={isLoading}
                        >
                            <Text style={globalStyles.buttonText}>Login as Admin</Text>
                        </TouchableOpacity>
                    </>
                )}
             </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

// Local styles for LoginScreen
const styles = StyleSheet.create({
    separator: {
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
        marginVertical: 25,
    },
     orText: {
        textAlign: 'center',
        color: '#6c757d',
        fontSize: 14, // Consider scaling this too if needed
        fontWeight: 'bold',
        marginBottom: 15,
     },
    adminButton: {
        backgroundColor: '#5a6268',
        borderColor: '#5a6268',
        marginTop: 0,
    },
});

export default LoginScreen;