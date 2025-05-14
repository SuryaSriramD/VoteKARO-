import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { VotingContext } from '../context/VotingContext';
import { styles } from '../styles/GlobalStyles';

const AdminCreateScreen = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [candidates, setCandidates] = useState(''); // Comma-separated string
    const [message, setMessage] = useState('');
    const { addVoting } = useContext(VotingContext);

    const handleCreateVoting = () => {
         setMessage('');
        if (!title || !description || !candidates) {
            setMessage("Please fill in all fields.");
            // Alert.alert('Error', 'Please fill in all fields.');
            return;
        }
        // Basic validation for candidates (at least two separated by comma)
        if (!candidates.includes(',') || candidates.split(',').length < 2) {
             setMessage("Please enter at least two candidates, separated by commas.");
            // Alert.alert('Error', 'Please enter at least two candidates, separated by commas.');
             return;
        }


        const success = addVoting(title, description, candidates);

        if (success) {
             setMessage("Voting created successfully!");
             // Alert.alert('Success', 'Voting created successfully!');
             // Clear form
             setTitle('');
             setDescription('');
             setCandidates('');
             // Optionally navigate back
             // navigation.goBack();
        } else {
             setMessage("Failed to create voting. Check input or permissions.");
            // Alert.alert('Error', 'Failed to create voting.');
        }
    };

    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
            <Text style={styles.title}>Create New Voting</Text>

            {message ? <Text style={message.includes('success') ? { color: 'green', textAlign: 'center', marginBottom: 10 } : styles.errorText}>{message}</Text> : null}


            <Text style={styles.label}>Voting Title:</Text>
            <TextInput
                style={styles.input}
                placeholder="e.g., Class Representative Election"
                value={title}
                onChangeText={setTitle}
            />

            <Text style={styles.label}>Description:</Text>
            <TextInput
                style={[styles.input, { height: 80 }]} // Make description multiline capable
                placeholder="Brief description of the voting"
                value={description}
                onChangeText={setDescription}
                multiline
            />

             <Text style={styles.label}>Candidates (comma-separated):</Text>
            <TextInput
                style={styles.input}
                placeholder="e.g., Candidate A, Candidate B, Candidate C"
                value={candidates}
                onChangeText={setCandidates}
            />

            <TouchableOpacity style={styles.button} onPress={handleCreateVoting}>
                <Text style={styles.buttonText}>Create Voting</Text>
            </TouchableOpacity>
         </ScrollView>
    );
};

export default AdminCreateScreen;