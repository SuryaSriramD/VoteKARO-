import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { VotingContext } from '../context/VotingContext';
import { styles } from '../styles/GlobalStyles';
import { AuthContext } from '../context/AuthContext'; // For logout

const AdminDashboardScreen = ({ navigation }) => {
    const { getVotings } = useContext(VotingContext);
    const { logout } = useContext(AuthContext);
    const allVotings = getVotings('all'); // Get all votings (active and closed)

     const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.listItem}
            onPress={() => navigation.navigate('AdminResults', { votingId: item.id })} // Navigate to results
        >
            <Text style={styles.listItemTitle}>{item.title}</Text>
            <Text style={styles.listItemSubtitle}>Status: {item.status}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Admin Dashboard - Votings</Text>

             <TouchableOpacity
                 style={[styles.button, {backgroundColor: '#28a745', marginBottom: 20}]}
                 onPress={() => navigation.navigate('AdminCreate')}
             >
                 <Text style={styles.buttonText}>Create New Voting</Text>
            </TouchableOpacity>

            <Text style={[styles.label, {fontSize: 18, marginBottom: 10}]}>View Results:</Text>
             {allVotings.length === 0 ? (
                <Text style={{textAlign: 'center', marginTop: 20}}>No votings found.</Text>
            ) : (
                 <FlatList
                    data={allVotings}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            )}

             {/* Optional: Add logout directly on admin dashboard */}
              <TouchableOpacity style={[styles.button, { backgroundColor: '#dc3545', marginTop: 30 }]} onPress={logout}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AdminDashboardScreen;