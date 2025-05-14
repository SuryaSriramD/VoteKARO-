import React, { useContext, useState, useEffect, useCallback } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { VotingContext } from '../context/VotingContext';
import { styles as globalStyles } from '../styles/GlobalStyles';
import { useFocusEffect } from '@react-navigation/native';

const AdminResultsScreen = ({ route, navigation }) => {
    const { votingId } = route.params;
    const { getVotingById, getResults } = useContext(VotingContext);

    const [voting, setVoting] = useState(null);
    const [resultsData, setResultsData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const loadResults = useCallback(() => {
        setIsLoading(true);
        console.log(`Loading results for voting ID: ${votingId}`);
        try {
            const currentVoting = getVotingById(votingId);
            if (currentVoting) {
                const currentResults = getResults(votingId);
                setVoting(currentVoting);
                setResultsData(currentResults);
                // Update header title dynamically
                 navigation.setOptions({ title: `Results: ${currentVoting.title.substring(0, 20)}...` });
            } else {
                setVoting(null);
                setResultsData(null);
                 navigation.setOptions({ title: 'Results Not Found' });
            }
        } catch(e) {
            console.error("Failed to load results:", e);
            setVoting(null);
            setResultsData(null);
             navigation.setOptions({ title: 'Error Loading Results' });
        } finally {
            setIsLoading(false);
        }
    }, [votingId, getVotingById, getResults, navigation]); // Add navigation dependency for setOptions

     // Load results when the screen comes into focus
    useFocusEffect(loadResults);


    const renderResultItem = ({ item }) => {
        const candidate = item.candidate;
        const votes = item.votes;
        // Ensure totalVotes is not zero before dividing
        const percentage = resultsData?.totalVotes > 0 ? ((votes / resultsData.totalVotes) * 100) : 0;
        const percentageString = percentage.toFixed(1); // Format to one decimal place

        return (
            <View style={styles.resultItem}>
                <View style={styles.candidateInfo}>
                    <Text style={styles.candidateName}>{candidate}</Text>
                    <Text style={styles.voteCount}>{votes} votes ({percentageString}%)</Text>
                </View>
                <View style={styles.progressBarBackground}>
                    {/* Use percentageString for the width */}
                    <View style={[styles.progressBarFill, { width: `${percentageString}%` }]} />
                </View>
            </View>
        );
    };

    if (isLoading) {
        return (
            <SafeAreaView style={[globalStyles.container, styles.centerContent]}>
                <ActivityIndicator size="large" color="#007bff" />
                <Text style={styles.loadingText}>Loading results...</Text>
            </SafeAreaView>
        );
    }

    if (!voting || !resultsData) {
        return (
            <SafeAreaView style={globalStyles.container}>
                <Text style={globalStyles.errorText}>Could not load results for this voting event.</Text>
            </SafeAreaView>
        );
    }

    // Prepare data for FlatList - sort by votes descending
    const candidateResults = (voting.candidates || Object.keys(resultsData.results))
        .map(candidate => ({
            candidate: candidate,
            votes: resultsData.results[candidate] || 0,
        }))
        .sort((a, b) => b.votes - a.votes); // Sort highest votes first

    return (
        <SafeAreaView style={globalStyles.container}>
             <FlatList
                ListHeaderComponent={
                    <>
                        {/* Title is now in the header, maybe add description here */}
                         <Text style={styles.descriptionHeader}>{voting.description}</Text>
                        <View style={styles.totalVotesCard}>
                            <Text style={styles.totalVotesText}>Total Votes Cast: {resultsData.totalVotes}</Text>
                        </View>
                        <Text style={styles.breakdownHeader}>Vote Breakdown</Text>
                    </>
                }
                data={candidateResults}
                renderItem={renderResultItem}
                keyExtractor={(item) => item.candidate}
                refreshing={isLoading} // Allow pull-to-refresh
                onRefresh={loadResults}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>
                        {resultsData.totalVotes === 0 ? "No votes have been cast yet." : "No candidate data found."}
                    </Text>
                }
                 contentContainerStyle={{ paddingBottom: 20 }} // Padding at the very bottom
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: globalStyles.scaleFontSize ? globalStyles.scaleFontSize(16) : 16,
        color: '#555',
    },
    descriptionHeader: { // Style for description if added
        fontSize: globalStyles.scaleFontSize ? globalStyles.scaleFontSize(16) : 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    totalVotesCard: {
        backgroundColor: '#e7f3ff', // Light blue background
        padding: 15,
        borderRadius: 8,
        marginBottom: 25,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#b8daff',
    },
    totalVotesText: {
        fontSize: globalStyles.scaleFontSize ? globalStyles.scaleFontSize(18) : 18,
        fontWeight: 'bold',
        color: '#0056b3', // Darker blue
    },
    breakdownHeader: {
        fontSize: globalStyles.scaleFontSize ? globalStyles.scaleFontSize(19) : 19,
        fontWeight: '600',
        marginBottom: 15,
        color: '#333',
        borderBottomWidth: 1,
        borderColor: '#ddd',
        paddingBottom: 5,
    },
    resultItem: {
        backgroundColor: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 8,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#eee',
    },
     candidateInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    candidateName: {
        fontSize: globalStyles.scaleFontSize ? globalStyles.scaleFontSize(17) : 17,
        fontWeight: '500',
        color: '#333',
        flexShrink: 1, // Allow text to shrink if needed
        marginRight: 10,
    },
    voteCount: {
        fontSize: globalStyles.scaleFontSize ? globalStyles.scaleFontSize(15) : 15,
        color: '#0056b3', // Darker blue for count
        fontWeight: '500',
        flexShrink: 0, // Don't allow count to shrink
    },
    progressBarBackground: {
        height: 10, // Slightly thicker bar
        backgroundColor: '#e9ecef',
        borderRadius: 5,
        overflow: 'hidden',
        marginTop: 4,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#007bff',
        borderRadius: 5,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 30,
        fontSize: globalStyles.scaleFontSize ? globalStyles.scaleFontSize(16) : 16,
        color: '#666',
    },
});

export default AdminResultsScreen;