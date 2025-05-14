import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native'; // Added StyleSheet
import { AuthContext } from '../context/AuthContext';
import { styles as globalStyles } from '../styles/GlobalStyles'; // Rename imported styles

// Define admin credentials here to use in the button action
// Make sure these match what's in AuthContext.js
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'password';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);

    const handleLogin = () => {
        setError(''); // Clear previous errors
        if (!username || !password) {
            setError('Please enter both username and password.');
            return;
        }
        const success = login(username, password);
        if (!success) {
            setError('Invalid username or password.');
        }
        // Navigation happens automatically in AppNavigator based on context change
    };

    // --- New Function for Admin Login ---
    const handleAdminLogin = () => {
        setError(''); // Clear previous errors
        console.log(`Attempting direct admin login with user: ${ADMIN_USERNAME}`); // For debugging
        const success = login(ADMIN_USERNAME, ADMIN_PASSWORD);
        if (!success) {
            // This should ideally not happen if credentials match AuthContext
            setError('Admin login failed. Please check hardcoded credentials or AuthContext setup.');
            Alert.alert('Admin Login Failed', 'Could not log in as admin. Check console or context setup.');
        }
         // Navigation happens automatically
    };
    // --- End of New Function ---

    return (
        // Use globalStyles.container or merge local styles if needed
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>VoteKARO - Login</Text>
            {error ? <Text style={globalStyles.errorText}>{error}</Text> : null}

            {/* Regular User Login Section */}
            <TextInput
                style={globalStyles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />
            <TextInput
                style={globalStyles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={globalStyles.button} onPress={handleLogin}>
                <Text style={globalStyles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={globalStyles.linkText}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>

            {/* --- Optional Separator --- */}
            <View style={styles.separator} />
            <Text style={styles.orText}>Admin Access</Text>
            {/* --- End of Separator --- */}


            {/* --- New Admin Login Button --- */}
            <TouchableOpacity
                style={[globalStyles.button, styles.adminButton]} // Use global button style + local override
                onPress={handleAdminLogin}
            >
                <Text style={globalStyles.buttonText}>Login as Admin</Text>
            </TouchableOpacity>
            {/* --- End of New Button --- */}

        </View>
    );
};

// --- Optional Local Styles for this screen ---
const styles = StyleSheet.create({
    separator: {
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
        marginVertical: 25, // Increased spacing
    },
     orText: {
        textAlign: 'center',
        color: '#6c757d', // Bootstrap's secondary color
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 15, // Spacing before admin button
     },
    adminButton: {
        backgroundColor: '#5a6268', // Darker Gray color for distinction
        borderColor: '#5a6268',
        marginTop: 0, // Remove default top margin if separator provides spacing
    },
});
// --- End of Local Styles ---


export default LoginScreen;