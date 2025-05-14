import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { VotingContext } from '../context/VotingContext';
import { styles } from '../styles/GlobalStyles';
import { useFocusEffect } from '@react-navigation/native'; // Optional: to refresh data on screen focus

const UserDashboardScreen = ({ navigation }) => {
    const { getVotings } = useContext(VotingContext);
    const activeVotings = getVotings('active'); // Get only active votings

    // Optional: If votings could change while user is on other tabs
    // useFocusEffect(
    //   React.useCallback(() => {
    //     // Here you might refetch or re-filter if data source could update
    //     console.log("User Dashboard Focused");
    //     return () => {}; // Optional cleanup
    //   }, [])
    // );

     const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.listItem}
            onPress={() => navigation.navigate('Voting', { votingId: item.id })} // Pass ID to voting screen
        >
            <Text style={styles.listItemTitle}>{item.title}</Text>
            <Text style={styles.listItemSubtitle}>{item.description}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Active Votings</Text>
             {activeVotings.length === 0 ? (
                <Text style={{textAlign: 'center', marginTop: 20}}>No active votings available.</Text>
            ) : (
                 <FlatList
                    data={activeVotings}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            )}
        </View>
    );
};

export default UserDashboardScreen;