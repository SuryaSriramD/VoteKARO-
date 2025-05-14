import React, { useState, useContext, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { VotingContext } from '../context/VotingContext';
import { AuthContext } from '../context/AuthContext';
import { styles as globalStyles } from '../styles/GlobalStyles';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect

const VotingScreen = ({ route, navigation }) => {
    const { votingId } = route.params;
    const { getVotingById, castVote, hasUserVoted, getUserVotes } = useContext(VotingContext); // Add getUserVotes
    const { currentUser } = useContext(AuthContext);

    const [voting, setVoting] = useState(null);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [alreadyVoted, setAlreadyVoted] = useState(false);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const loadVotingData = useCallback(() => {
        setIsLoading(true);
        setMessage('');
        console.log(`Loading data for voting ID: ${votingId}`);
        const currentVoting = getVotingById(votingId);
        setVoting(currentVoting);

        if (currentUser && currentVoting) {
            const userHasVoted = hasUserVoted(currentUser.id, votingId);
            setAlreadyVoted(userHasVoted);
            console.log(`User ${currentUser.username} has voted: ${userHasVoted}`);
            if (userHasVoted) {
                // Find the actual vote to pre-select the candidate
                const userVotesData = getUserVotes(currentUser.id); // Fetch user's votes
                const specificVote = userVotesData.find(v => v.votingId === votingId);
                if (specificVote) {
                    console.log(`User voted for: ${specificVote.candidate}`);
                    setSelectedCandidate(specificVote.candidate);
                } else {
                     console.warn("User has voted but couldn't find vote record?");
                     setSelectedCandidate(null); // Fallback
                }
            } else {
                setSelectedCandidate(null); // Ensure no selection if not voted
            }
        } else {
            setSelectedCandidate(null);
            setAlreadyVoted(false); // Reset if user/voting is invalid
        }
        setIsLoading(false);
    }, [votingId, currentUser, getVotingById, hasUserVoted, getUserVotes]); // Add getUserVotes dependency

     // Load data when the screen focuses
    useFocusEffect(loadVotingData);

    const handleVote = () => {
         setMessage('');
        if (!selectedCandidate) {
            setMessage("Please select a candidate.");
            return;
        }
        if (alreadyVoted) {
             setMessage("You have already voted in this election.");
            return;
        }

        // Optional: Add confirmation alert
        Alert.alert(
            "Confirm Vote",
            `Are you sure you want to vote for ${selectedCandidate}?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Confirm", onPress: () => {
                        const result = castVote(votingId, selectedCandidate);
                        setMessage(result.message);
                        if (result.success) {
                            setAlreadyVoted(true); // Update UI immediately
                            // Optionally navigate back after a short delay
                            // setTimeout(() => navigation.goBack(), 1500);
                        }
                    }
                }
            ]
        );
    };

    const renderCandidate = ({ item }) => (
        <TouchableOpacity
            style={[
                globalStyles.listItem,
                selectedCandidate === item && !alreadyVoted && styles.selectedItem, // Highlight only if selecting
                alreadyVoted && selectedCandidate === item && styles.votedItem, // Green if this was the vote
                alreadyVoted && selectedCandidate !== item && styles.disabledItem, // Fade if voted for someone else
            ]}
            onPress={() => !alreadyVoted && setSelectedCandidate(item)}
            disabled={alreadyVoted}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                 <Text style={[
                    globalStyles.listItemTitle,
                     alreadyVoted && styles.disabledItemText
                    ]}>
                    {item}
                </Text>
                 {/* Simple radio button visual */}
                 <View style={[styles.radioOuter, alreadyVoted && styles.disabledRadio]}>
                    {selectedCandidate === item && <View style={styles.radioInner} />}
                 </View>
             </View>
             {alreadyVoted && selectedCandidate === item && (
                  <Text style={styles.votedIndicator}> (Your Vote)</Text>
             )}
        </TouchableOpacity>
    );

    if (isLoading) {
        return (
            <SafeAreaView style={[globalStyles.container, {justifyContent: 'center', alignItems: 'center'}]}>
                <ActivityIndicator size="large" color="#007bff" />
                <Text style={{marginTop: 10}}>Loading voting details...</Text>
            </SafeAreaView>
        );
    }
     if (!voting) {
        return (
            <SafeAreaView style={globalStyles.container}>
                <Text style={globalStyles.errorText}>Voting event not found or invalid.</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={globalStyles.container}>
            <FlatList
                ListHeaderComponent={
                    <>
                        <Text style={globalStyles.title}>{voting.title}</Text>
                        <Text style={styles.descriptionText}>{voting.description}</Text>
                        {message ? <Text style={[styles.messageText, message.includes('success') ? styles.successText : styles.errorText]}>{message}</Text> : null}
                        {alreadyVoted && !message.includes('success') && (
                             <Text style={styles.alreadyVotedText}>You have voted in this election.</Text>
                         )}
                        <Text style={styles.candidatesHeader}>Select a Candidate:</Text>
                    </>
                }
                data={voting.candidates}
                renderItem={renderCandidate}
                keyExtractor={(item) => item}
                extraData={{selectedCandidate, alreadyVoted}} // Re-render list when selection or voted status changes
                contentContainerStyle={{ paddingBottom: 100 }} // Ensure space below list for button
                ListFooterComponent={
                    !alreadyVoted && (
                         <TouchableOpacity
                            style={[
                                globalStyles.button,
                                styles.voteButton, // Specific style for vote button
                                (!selectedCandidate || isLoading) && styles.disabledButton // Disable if no selection or loading
                            ]}
                            onPress={handleVote}
                            disabled={!selectedCandidate || isLoading}
                        >
                            <Text style={globalStyles.buttonText}>Cast Your Vote</Text>
                        </TouchableOpacity>
                    )
                }
            />
        </SafeAreaView>
    );
};

// Add/Update local styles
const styles = StyleSheet.create({
    descriptionText: {
        fontSize: globalStyles.scaleFontSize ? globalStyles.scaleFontSize(16) : 16,
        color: '#555',
        textAlign: 'center',
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    candidatesHeader: {
        fontSize: globalStyles.scaleFontSize ? globalStyles.scaleFontSize(18) : 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        color: '#333',
    },
    selectedItem: {
        backgroundColor: '#e7f3ff', // Lighter blue for selection before voting
        borderColor: '#007bff',
        borderWidth: 1.5, // Slightly thicker border when selected
    },
    votedItem: {
         backgroundColor: '#d4edda', // Light green for confirmed vote
         borderColor: '#28a745',
         borderWidth: 1,
         opacity: 0.8, // Slightly faded
    },
     disabledItem: {
         backgroundColor: '#f8f9fa', // Default background
         opacity: 0.6, // More faded
     },
     disabledItemText: {
         color: '#6c757d', // Greyed out text
     },
     votedIndicator: {
        fontSize: globalStyles.scaleFontSize ? globalStyles.scaleFontSize(13) : 13,
        color: '#28a745', // Green text
        fontWeight: 'bold',
        marginTop: 4, // Space below candidate name
     },
    messageText: {
        textAlign: 'center',
        marginVertical: 10,
        fontWeight: 'bold',
        fontSize: globalStyles.scaleFontSize ? globalStyles.scaleFontSize(15) : 15,
    },
    successText: {
        color: 'green',
    },
    errorText: { // Local error text style if needed, otherwise global
        color: 'red',
    },
    alreadyVotedText: {
        color: '#856404', // Dark yellow/brown for info
        backgroundColor: '#fff3cd', // Light yellow background
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ffeeba',
        textAlign: 'center',
        marginVertical: 15,
        fontSize: globalStyles.scaleFontSize ? globalStyles.scaleFontSize(15) : 15,
        fontWeight: 'bold',
    },
     voteButton: {
         marginHorizontal: 10, // Add horizontal margin to center it a bit
         marginTop: 30, // Ensure space from the list
     },
    disabledButton: {
        backgroundColor: '#aaa', // Grey out button if no selection or loading
        elevation: 0, // Remove shadow when disabled
        shadowOpacity: 0,
    },
    // Radio button visual styles
    radioOuter: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#007bff',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
    },
     radioInner: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: '#007bff',
    },
    disabledRadio: {
         borderColor: '#ccc',
    },
});

export default VotingScreen;