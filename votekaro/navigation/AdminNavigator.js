import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AdminDashboardScreen from '../screens/AdminDashboardScreen';
import AdminCreateScreen from '../screens/AdminCreateScreen';
import AdminResultsScreen from '../screens/AdminResultsScreen';
// import Ionicons from '@expo/vector-icons/Ionicons'; // Optional icons

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Admin Tabs
const AdminTabs = () => {
     return (
        <Tab.Navigator
             screenOptions={({ route }) => ({
                headerShown: false, // Hide header for tab screens
                // tabBarIcon: ({ focused, color, size }) => { // Example Icons
                //     let iconName;
                //     if (route.name === 'AdminDashboard') {
                //         iconName = focused ? 'stats-chart' : 'stats-chart-outline';
                //     } else if (route.name === 'AdminCreateTab') {
                //         iconName = focused ? 'add-circle' : 'add-circle-outline';
                //     }
                //     return <Ionicons name={iconName} size={size} color={color} />;
                // },
                 tabBarActiveTintColor: '#007bff',
                 tabBarInactiveTintColor: 'gray',
             })}
        >
            {/* Screen name here MUST be different from the Stack screen if both exist */}
            <Tab.Screen name="AdminDashboard" component={AdminDashboardScreen} options={{ title: 'Dashboard' }} />
            <Tab.Screen name="AdminCreateTab" component={AdminCreateScreen} options={{ title: 'Create Voting' }} />
        </Tab.Navigator>
    );
}

// Stack Navigator for Admin flow
const AdminNavigator = () => {
    return (
        <Stack.Navigator>
             <Stack.Screen
                name="AdminRoot" // Entry point for the admin section
                component={AdminTabs}
                options={{ headerShown: false }} // Hide header for tab container
            />
            <Stack.Screen
                name="AdminResults" // Screen for viewing results (pushed on top)
                component={AdminResultsScreen}
                options={{ title: 'Voting Results' }}
             />
             {/* Optional: Keep this if you want to navigate to Create via Stack too */}
             <Stack.Screen
                 name="AdminCreate"
                 component={AdminCreateScreen}
                 options={{ title: 'Create Voting' }}
             />
        </Stack.Navigator>
    );
};

export default AdminNavigator;