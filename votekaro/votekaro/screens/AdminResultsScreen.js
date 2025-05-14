import React, { useContext, useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { VotingContext } from '../context/VotingContext';
import { styles } from '../styles/GlobalStyles';

const AdminResultsScreen = ({ route }) => {
    const { votingId } = route.params;
    const { getVotingById, getResults } = useContext(VotingContext);
    const [voting, setVoting] = useState(null);
    const [results, setResults] = useState(null);

    useEffect(() => {
        const currentVoting = getVotingById(votingId);
        setVoting(currentVoting);
        if (currentVoting) {
            const currentResults = getResults(votingId);
            setResults(currentResults);
        }
    }, [votingId, getVotingById, getResults]); // Re-fetch if ID changes or context updates results potentially

    if (!voting || !results) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#007bff" />
                <Text>Loading results...</Text>
            </View>
        );
    }

    // Get candidate names in order defined in the voting object
    const candidateNames = voting.candidates || Object.keys(results.results);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Results: {voting.title}</Text>

            <View style={styles.listItem}>
                <Text style={styles.listItemTitle}>Total Votes Cast: {results.totalVotes}</Text>
            </View>

            <Text style={[styles.label, {fontSize: 18, marginTop: 20, marginBottom: 10 }]}>Vote Breakdown:</Text>

            {candidateNames.length === 0 ? (
                <Text>No candidates found for this voting.</Text>
            ) : (
                candidateNames.map((candidate) => (
                    <View key={candidate} style={styles.listItem}>
                        <Text style={styles.listItemTitle}>{candidate}: {results.results[candidate] || 0} votes</Text>
                    </View>
                ))
            )}

             {/* Show raw results object for debugging if needed */}
             {/* <Text style={{marginTop: 20, fontSize: 12, color: '#555'}}>Raw Results: {JSON.stringify(results.results)}</Text> */}

        </View>
    );
};

export default AdminResultsScreen;