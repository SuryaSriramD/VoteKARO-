import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserDashboardScreen from '../screens/UserDashboardScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import VotingScreen from '../screens/VotingScreen';
// Optional: Import icons
// import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Bottom Tab Navigator for User's main sections
const UserTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false, // Hide header for tab screens
                // tabBarIcon: ({ focused, color, size }) => { // Example Icons
                //     let iconName;
                //     if (route.name === 'UserDashboard') {
                //         iconName = focused ? 'home' : 'home-outline';
                //     } else if (route.name === 'UserProfile') {
                //         iconName = focused ? 'person' : 'person-outline';
                //     }
                //     return <Ionicons name={iconName} size={size} color={color} />;
                // },
                tabBarActiveTintColor: '#007bff', // Color for active tab
                tabBarInactiveTintColor: 'gray', // Color for inactive tab
            })}
        >
            <Tab.Screen name="UserDashboard" component={UserDashboardScreen} options={{ title: 'Dashboard' }}/>
            <Tab.Screen name="UserProfile" component={UserProfileScreen} options={{ title: 'Profile' }} />
        </Tab.Navigator>
    );
}

// Stack Navigator for User flow
const UserNavigator = () => {
    return (
        <Stack.Navigator
             screenOptions={{
                // Apply default header styles if needed
                // headerStyle: { backgroundColor: '#007bff' },
                // headerTintColor: '#fff',
             }}
        >
            <Stack.Screen
                name="UserRoot" // Entry point for the user section
                component={UserTabs}
                options={{ headerShown: false }} // Hide header for the tab container itself
            />
            <Stack.Screen
                name="Voting" // Screen pushed on top of tabs
                component={VotingScreen}
                options={{ title: 'Cast Your Vote' }} // Header title for this screen
             />
        </Stack.Navigator>
    );
};

export default UserNavigator;