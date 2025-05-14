import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { VotingContext } from '../context/VotingContext';
import { AuthContext } from '../context/AuthContext';
import { styles } from '../styles/GlobalStyles';

const VotingScreen = ({ route, navigation }) => {
    const { votingId } = route.params; // Get votingId passed from navigation
    const { getVotingById, castVote, hasUserVoted } = useContext(VotingContext);
    const { currentUser } = useContext(AuthContext);
    const [voting, setVoting] = useState(null);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [alreadyVoted, setAlreadyVoted] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const currentVoting = getVotingById(votingId);
        setVoting(currentVoting);
        if (currentUser && currentVoting) {
             setAlreadyVoted(hasUserVoted(currentUser.id, votingId));
        }
    }, [votingId, getVotingById, currentUser, hasUserVoted]); // Rerun if these change

    const handleVote = () => {
         setMessage('');
        if (!selectedCandidate) {
            setMessage("Please select a candidate.");
           // Alert.alert("Selection Required", "Please select a candidate before voting.");
            return;
        }
        if (alreadyVoted) {
             setMessage("You have already voted in this election.");
            //Alert.alert("Already Voted", "You cannot vote more than once in the same election.");
            return;
        }

        const result = castVote(votingId, selectedCandidate);

         setMessage(result.message);
        // Alert.alert(result.success ? "Success" : "Error", result.message);

        if (result.success) {
            setAlreadyVoted(true); // Update UI immediately
            // Optionally navigate back or disable controls further
             // navigation.goBack(); // Go back after successful vote
        }
    };

     const renderCandidate = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.listItem,
                selectedCandidate === item && { backgroundColor: '#d0eaff' } // Highlight selected
            ]}
            onPress={() => !alreadyVoted && setSelectedCandidate(item)} // Allow selection only if not voted
            disabled={alreadyVoted}
        >
            <Text style={styles.listItemTitle}>{item}</Text>
        </TouchableOpacity>
    );


    if (!voting) {
        return (
            <View style={styles.container}>
                <Text>Loading voting details...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{voting.title}</Text>
            <Text style={styles.listItemSubtitle}>{voting.description}</Text>

            {message ? <Text style={alreadyVoted || !selectedCandidate ? styles.errorText : { color: 'green', textAlign: 'center', marginVertical: 10 }}>{message}</Text> : null}

             {alreadyVoted && (
                 <Text style={{ color: 'green', fontWeight: 'bold', textAlign: 'center', marginVertical: 15 }}>
                     You have voted in this election.
                 </Text>
             )}

            <FlatList
                data={voting.candidates}
                renderItem={renderCandidate}
                keyExtractor={(item) => item}
                extraData={selectedCandidate} // Re-render list when selection changes
                style={{ marginTop: 20, marginBottom: 20 }}
            />


            {!alreadyVoted && (
                 <TouchableOpacity
                    style={[styles.button, !selectedCandidate && { backgroundColor: '#aaa'}]} // Grey out if no selection
                    onPress={handleVote}
                    disabled={!selectedCandidate}
                >
                    <Text style={styles.buttonText}>Cast Your Vote</Text>
                </TouchableOpacity>
            )}

        </View>
    );
};

export default VotingScreen;