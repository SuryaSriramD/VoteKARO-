import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { VotingContext } from '../context/VotingContext';
import { styles as globalStyles } from '../styles/GlobalStyles';
import Ionicons from '@expo/vector-icons/Ionicons';

const AdminCreateScreen = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [candidates, setCandidates] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false); // Loading state for submit
    const { addVoting } = useContext(VotingContext);

    const handleCreateVoting = () => {
         setMessage('');
         setIsSubmitting(true);

        if (!title.trim() || !description.trim() || !candidates.trim()) {
            setMessage("Please fill in all fields.");
            setIsSubmitting(false);
            return;
        }
        const candidateList = candidates.split(',').map(c => c.trim()).filter(c => c);
        if (candidateList.length < 2) {
             setMessage("Please enter at least two candidates, separated by commas.");
             setIsSubmitting(false);
             return;
        }

        // Simulate async operation
        setTimeout(() => {
             const success = addVoting(title.trim(), description.trim(), candidates); // Pass original comma-separated string
             if (success) {
                 setMessage("Voting created successfully!");
                 setTitle('');
                 setDescription('');
                 setCandidates('');
                 Alert.alert("Success", "Voting created successfully!");
                 // Optionally navigate back after success
                 // navigation.goBack();
            } else {
                 setMessage("Failed to create voting. Only Admin can perform this action.");
                 Alert.alert("Error", "Failed to create voting.");
            }
             setIsSubmitting(false);
        }, 500); // Simulate 0.5 sec delay
    };

    return (
        <SafeAreaView style={globalStyles.container}>
            <KeyboardAvoidingView
                 behavior={Platform.OS === "ios" ? "padding" : "height"}
                 style={{ flex: 1 }}
                 keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0} // Adjust offset if needed
             >
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ paddingBottom: 40 }} // Space at the bottom
                >
                    <Text style={globalStyles.title}>Create New Voting</Text>

                    {message ? <Text style={[styles.messageText, message.includes('success') ? styles.successText : styles.errorText]}>{message}</Text> : null}

                    <Text style={globalStyles.label}>Voting Title:</Text>
                    <TextInput
                        style={globalStyles.input}
                        placeholder="e.g., Project Lead Election"
                        value={title}
                        onChangeText={setTitle}
                        editable={!isSubmitting}
                    />

                    <Text style={globalStyles.label}>Description:</Text>
                    <TextInput
                        style={[globalStyles.input, styles.textArea]}
                        placeholder="Brief description of the voting purpose"
                        value={description}
                        onChangeText={setDescription}
                        multiline
                        numberOfLines={4}
                        editable={!isSubmitting}
                    />

                     <Text style={globalStyles.label}>Candidates (comma-separated):</Text>
                    <TextInput
                        style={globalStyles.input}
                        placeholder="e.g., Alice, Bob, Charlie"
                        value={candidates}
                        onChangeText={setCandidates}
                        editable={!isSubmitting}
                    />

                    <TouchableOpacity
                        style={[
                            globalStyles.button,
                            styles.createButton,
                            isSubmitting && styles.disabledButton // Style when submitting
                        ]}
                        onPress={handleCreateVoting}
                        disabled={isSubmitting}
                     >
                         <Ionicons name="checkmark-circle-outline" size={20} color="#fff" style={{ marginRight: 8 }}/>
                        <Text style={globalStyles.buttonText}>
                             {isSubmitting ? "Creating..." : "Create Voting"}
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
         </SafeAreaView>
    );
};

const styles = StyleSheet.create({
     messageText: {
        textAlign: 'center',
        marginVertical: 10,
        fontWeight: 'bold',
        fontSize: globalStyles.scaleFontSize ? globalStyles.scaleFontSize(15) : 15,
    },
    successText: {
        color: 'green',
    },
    errorText: {
        color: 'red',
    },
     textArea: {
        height: 100, // Increase height for description
        textAlignVertical: 'top', // Align text to top for multiline
     },
    createButton: {
         flexDirection: 'row', // Align icon and text
         alignItems: 'center',
         justifyContent: 'center',
         backgroundColor: '#28a745', // Green for create action
         marginTop: 20,
    },
     disabledButton: {
         backgroundColor: '#aaa',
         elevation: 0,
         shadowOpacity: 0,
     },
});

export default AdminCreateScreen;