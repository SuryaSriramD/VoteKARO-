import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { VotingContext } from '../context/VotingContext';
import { styles } from '../styles/GlobalStyles';

const UserProfileScreen = () => {
    const { currentUser, logout } = useContext(AuthContext);
    const { getUserVotes, getVotingById } = useContext(VotingContext);

    if (!currentUser) {
        // This shouldn't happen if navigation is set up correctly, but good practice
        return (
            <View style={styles.container}>
                <Text>Not logged in.</Text>
            </View>
        );
    }

    const userVotes = getUserVotes(currentUser.id);
    const votedElections = userVotes.map(vote => {
         const votingDetails = getVotingById(vote.votingId);
         return {
            id: vote.voteId, // Use voteId as key
            title: votingDetails ? votingDetails.title : 'Unknown Election',
            votedFor: vote.candidate,
         };
    });

     const renderVoteItem = ({ item }) => (
        <View style={styles.listItem}>
            <Text style={styles.listItemTitle}>{item.title}</Text>
            <Text style={styles.listItemSubtitle}>Your vote: {item.votedFor}</Text>
        </View>
    );


    return (
        <View style={styles.container}>
            <Text style={styles.title}>User Profile</Text>

            <View style={{ marginBottom: 20, padding: 15, backgroundColor: '#fff', borderRadius: 8 }}>
                 <Text style={styles.profileDetail}>Username: {currentUser.username}</Text>
                 <Text style={styles.profileDetail}>User ID: {currentUser.id}</Text>
                 <Text style={styles.profileDetail}>Voter Card ID: {currentUser.voterId}</Text>
            </View>


            <Text style={[styles.label, { fontSize: 18, marginBottom: 10 }]}>Voting History:</Text>
            {votedElections.length === 0 ? (
                <Text style={{textAlign: 'center'}}>You haven't voted in any elections yet.</Text>
            ) : (
                <FlatList
                     data={votedElections}
                     renderItem={renderVoteItem}
                     keyExtractor={(item) => item.id}
                     style={{ maxHeight: 250 }} // Limit height if list gets long
                />
            )}


            <TouchableOpacity style={[styles.button, { backgroundColor: '#dc3545', marginTop: 30 }]} onPress={logout}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

export default UserProfileScreen;