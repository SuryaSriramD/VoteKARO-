import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { VotingContext } from '../context/VotingContext';
import { styles as globalStyles } from '../styles/GlobalStyles';
import Ionicons from '@expo/vector-icons/Ionicons'; // Import icons

const UserProfileScreen = () => {
    const { currentUser, logout } = useContext(AuthContext);
    const { getUserVotes, getVotingById } = useContext(VotingContext);

    if (!currentUser) {
        // Fallback, should be protected by navigation
        return (
            <SafeAreaView style={globalStyles.container}>
                <Text style={globalStyles.errorText}>Error: User not logged in.</Text>
            </SafeAreaView>
        );
    }

    const userVotes = getUserVotes(currentUser.id);
    const votedElections = userVotes.map(vote => {
         const votingDetails = getVotingById(vote.votingId);
         return {
            id: vote.voteId,
            title: votingDetails ? votingDetails.title : 'Unknown Election',
            votedFor: vote.candidate,
         };
    }).reverse(); // Show most recent first

     const handleLogout = () => {
        Alert.alert(
            "Confirm Logout",
            "Are you sure you want to log out?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Logout", onPress: logout, style: "destructive" } // Call context logout
            ]
        );
     };


     const renderVoteItem = ({ item }) => (
        <View style={globalStyles.listItem}>
            <Text style={globalStyles.listItemTitle}>{item.title}</Text>
            <Text style={styles.voteDetail}>Your vote: {item.votedFor}</Text>
        </View>
    );

    return (
        <SafeAreaView style={globalStyles.container}>
             <FlatList
                 ListHeaderComponent={
                    <>
                        <View style={styles.headerContainer}>
                             <Ionicons name="person-circle-outline" size={globalStyles.scaleFontSize ? globalStyles.scaleFontSize(60) : 60} color="#007bff" />
                             <Text style={globalStyles.title}>User Profile</Text>
                         </View>
                        <View style={styles.profileCard}>
                             <Text style={styles.detailText}><Text style={styles.detailLabel}>Username:</Text> {currentUser.username}</Text>
                             <Text style={styles.detailText}><Text style={styles.detailLabel}>User ID:</Text> {currentUser.id}</Text>
                             <Text style={styles.detailText}><Text style={styles.detailLabel}>Voter Card ID:</Text> {currentUser.voterId}</Text>
                        </View>
                        <Text style={styles.historyHeader}>Voting History</Text>
                    </>
                 }
                 data={votedElections}
                 renderItem={renderVoteItem}
                 keyExtractor={(item) => item.id}
                 ListEmptyComponent={
                     <Text style={styles.emptyText}>You haven't voted in any elections yet.</Text>
                 }
                 contentContainerStyle={{ paddingBottom: 100 }} // Space for logout button
                 ListFooterComponent={
                    <TouchableOpacity style={[globalStyles.button, styles.logoutButton]} onPress={handleLogout}>
                         <Ionicons name="log-out-outline" size={20} color="#fff" style={{ marginRight: 8 }}/>
                        <Text style={globalStyles.buttonText}>Logout</Text>
                    </TouchableOpacity>
                 }
             />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
     headerContainer: {
        alignItems: 'center',
        marginBottom: 10, // Reduced margin below icon/title combo
     },
     profileCard: {
        marginBottom: 30,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 12, // Slightly more rounded
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1, // Softer shadow
        shadowRadius: 3,
        elevation: 3,
    },
    detailText: {
        fontSize: globalStyles.scaleFontSize ? globalStyles.scaleFontSize(16) : 16,
        marginBottom: 12,
        color: '#333',
        lineHeight: globalStyles.scaleFontSize ? globalStyles.scaleFontSize(22) : 22, // Better line spacing
     },
     detailLabel: { // Style for the label part
        fontWeight: 'bold',
        color: '#555',
     },
    historyHeader: {
        fontSize: globalStyles.scaleFontSize ? globalStyles.scaleFontSize(20) : 20,
        fontWeight: '600',
        marginBottom: 15,
        color: '#007bff', // Use primary color for header
        borderBottomWidth: 2,
        borderColor: '#007bff',
        paddingBottom: 8,
        marginTop: 10,
    },
    voteDetail: {
        fontSize: globalStyles.scaleFontSize ? globalStyles.scaleFontSize(15) : 15,
        color: '#555',
        marginTop: 5,
    },
     emptyText: {
        textAlign: 'center',
        marginTop: 40,
        fontSize: globalStyles.scaleFontSize ? globalStyles.scaleFontSize(16) : 16,
        color: '#666',
    },
    logoutButton: {
        flexDirection: 'row', // Align icon and text
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#dc3545',
        marginTop: 40,
        marginHorizontal: 20, // Center button slightly
    },
});

export default UserProfileScreen;