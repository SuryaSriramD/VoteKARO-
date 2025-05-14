import React, { useContext, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native';
import { VotingContext } from '../context/VotingContext';
import { styles as globalStyles } from '../styles/GlobalStyles';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect

const UserDashboardScreen = ({ navigation }) => {
    const { getVotings } = useContext(VotingContext);
    const [activeVotings, setActiveVotings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Function to load data
    const loadData = useCallback(() => {
        setIsLoading(true);
        // Simulate fetching data if it were async
        try {
             const data = getVotings('active').reverse(); // Get newest first
             setActiveVotings(data);
        } catch (error) {
             console.error("Failed to load votings:", error);
             // Optionally set an error state here
        } finally {
            setIsLoading(false);
        }
    }, [getVotings]); // Dependency on getVotings

    // useFocusEffect to reload data when the screen comes into focus
    useFocusEffect(
      useCallback(() => {
        console.log("User Dashboard Focused - Reloading Data");
        loadData();

        // Optional cleanup function
        return () => {
            console.log("User Dashboard Unfocused");
            // Perform cleanup if needed, like cancelling subscriptions
        };
      }, [loadData]) // Rerun effect if loadData function changes (it shouldn't if getVotings is stable)
    );

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={globalStyles.listItem}
            onPress={() => navigation.navigate('Voting', { votingId: item.id })}
        >
            <Text style={globalStyles.listItemTitle}>{item.title}</Text>
            <Text style={globalStyles.listItemSubtitle}>{item.description}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={globalStyles.container}>
            <Text style={globalStyles.title}>Active Votings</Text>
            {isLoading ? (
                 <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 50 }} />
            ) : activeVotings.length === 0 ? (
                <Text style={styles.emptyText}>No active votings available.</Text>
            ) : (
                 <FlatList
                    data={activeVotings}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ paddingBottom: 20 }} // Add padding if list reaches bottom
                    refreshing={isLoading} // Show refresh indicator while loading
                    onRefresh={loadData} // Allow pull-to-refresh
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: globalStyles.scaleFontSize ? globalStyles.scaleFontSize(16) : 16, // Use scaled font size
        color: '#666',
    }
});

export default UserDashboardScreen;