import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserDashboardScreen from '../screens/UserDashboardScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import VotingScreen from '../screens/VotingScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Bottom Tab Navigator for User's main sections
const UserTabs = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="UserDashboard" component={UserDashboardScreen} options={{ title: 'Dashboard' }}/>
            <Tab.Screen name="UserProfile" component={UserProfileScreen} options={{ title: 'Profile' }} />
        </Tab.Navigator>
    );
}

// Stack Navigator for User flow (includes Tabs and screens navigated to from Tabs)
const UserNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="UserRoot"
                component={UserTabs}
                options={{ headerShown: false }} // Hide header for the tab container itself
            />
             {/* Screen for casting a vote - header title can be set dynamically if needed */}
            <Stack.Screen
                name="Voting"
                component={VotingScreen}
                options={{ title: 'Cast Your Vote' }}
             />
        </Stack.Navigator>
    );
};

export default UserNavigator;