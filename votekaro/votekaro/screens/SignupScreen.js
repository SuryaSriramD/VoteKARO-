import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { styles } from '../styles/GlobalStyles';

const SignupScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const { signup } = useContext(AuthContext);

    const handleSignup = () => {
        setError('');
        if (!username || !password || !confirmPassword) {
             setError('Please fill in all fields.');
             return;
        }
        if (password !== confirmPassword) {
             setError('Passwords do not match.');
             return;
        }

        const success = signup(username, password);
        if (!success) {
             setError('Username already exists. Please choose another.');
            // Alert.alert('Signup Failed', 'Username already exists.'); // Inline error preferred
        }
         // Navigation happens automatically via AppNavigator
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>VoteKARO - Sign Up</Text>
             {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleSignup}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.linkText}>Already have an account? Login</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SignupScreen;