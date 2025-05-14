import React, { useContext, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { VotingContext } from '../context/VotingContext';
import { styles as globalStyles } from '../styles/GlobalStyles';
import { AuthContext } from '../context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

const AdminDashboardScreen = ({ navigation }) => {
    const { getVotings } = useContext(VotingContext);
    const { logout } = useContext(AuthContext);
    const [allVotings, setAllVotings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadAdminData = useCallback(() => {
        setIsLoading(true);
        try {
             const data = getVotings('all').reverse(); // Show newest first
             setAllVotings(data);
        } catch(e) {
             console.error("Failed to load admin votings:", e);
        } finally {
             setIsLoading(false);
        }
    }, [getVotings]);

     useFocusEffect(loadAdminData);

     const handleLogout = () => {
        Alert.alert("Confirm Logout", "Log out as Admin?", [
            { text: "Cancel", style: "cancel" },
            { text: "Logout", onPress: logout, style: "destructive" }
        ]);
     };

     const renderItem = ({ item }) => (
        <TouchableOpacity
            style={globalStyles.listItem}
            onPress={() => navigation.navigate('AdminResults', { votingId: item.id })}
        >
            <View style={styles.listItemContent}>
                <Text style={globalStyles.listItemTitle}>{item.title}</Text>
                 <Text style={[styles.statusText, item.status === 'active' ? styles.activeStatus : styles.closedStatus]}>
                     {item.status.toUpperCase()}
                 </Text>
             </View>
             {/* Optional: Add description or vote count preview */}
             {/* <Text style={globalStyles.listItemSubtitle}>{item.description}</Text> */}
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={globalStyles.container}>
            <FlatList
                ListHeaderComponent={
                    <>
                        <Text style={globalStyles.title}>Admin Dashboard</Text>
                         <TouchableOpacity
                             style={[globalStyles.button, styles.createButton]}
                             onPress={() => navigation.navigate('AdminCreate')} // Use Stack navigation name
                         >
                              <Ionicons name="add-circle-outline" size={20} color="#fff" style={{ marginRight: 8 }}/>
                             <Text style={globalStyles.buttonText}>Create New Voting</Text>
                        </TouchableOpacity>
                        <Text style={styles.listHeader}>Manage Votings / View Results</Text>
                    </>
                }
                data={allVotings}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                refreshing={isLoading}
                onRefresh={loadAdminData}
                ListEmptyComponent={
                    !isLoading && <Text style={styles.emptyText}>No votings found. Create one!</Text>
                }
                contentContainerStyle={{ paddingBottom: 100 }} // Space for logout
                ListFooterComponent={
                    !isLoading && ( // Only show logout when not loading initial data
                        <TouchableOpacity style={[globalStyles.button, styles.logoutButton]} onPress={handleLogout}>
                             <Ionicons name="log-out-outline" size={20} color="#fff" style={{ marginRight: 8 }}/>
                            <Text style={globalStyles.buttonText}>Logout</Text>
                        </TouchableOpacity>
                    )
                }
            />
             {/* Show loading overlay if needed */}
            {isLoading && !allVotings.length && (
                <View style={styles.loadingOverlay}>
                     <ActivityIndicator size="large" color="#007bff" />
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    createButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#28a745',
        marginBottom: 25,
    },
     listHeader: {
        fontSize: globalStyles.scaleFontSize ? globalStyles.scaleFontSize(18) : 18,
        fontWeight: '600',
        marginBottom: 15,
        color: '#444',
    },
     listItemContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    statusText: {
        fontSize: globalStyles.scaleFontSize ? globalStyles.scaleFontSize(12) : 12,
        fontWeight: 'bold',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 4,
        overflow: 'hidden', // Ensures background respects border radius
    },
    activeStatus: {
        color: 'green',
        backgroundColor: '#d4edda', // Light green background
        borderColor: '#c3e6cb',
        borderWidth: 1,
    },
    closedStatus: {
        color: 'grey',
         backgroundColor: '#e2e3e5', // Light grey background
        borderColor: '#d6d8db',
        borderWidth: 1,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: globalStyles.scaleFontSize ? globalStyles.scaleFontSize(16) : 16,
        color: '#666',
    },
     loadingOverlay: { // Optional overlay for initial load
         ...StyleSheet.absoluteFillObject, // Cover screen
         backgroundColor: 'rgba(245, 245, 245, 0.8)', // Semi-transparent background
         justifyContent: 'center',
         alignItems: 'center',
     },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#dc3545',
        marginTop: 40,
         marginHorizontal: 20,
    },
});

export default AdminDashboardScreen;