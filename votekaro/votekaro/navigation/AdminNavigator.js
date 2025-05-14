import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AdminDashboardScreen from '../screens/AdminDashboardScreen';
import AdminCreateScreen from '../screens/AdminCreateScreen';
import AdminResultsScreen from '../screens/AdminResultsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


// Admin Tabs (Optional, could just use Stack if preferred)
// Let's use Tabs for Dashboard/Create as requested initially
const AdminTabs = () => {
     return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
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
                name="AdminRoot"
                component={AdminTabs} // Use Tabs as the base
                options={{ headerShown: false }}
            />
            {/* Screen for viewing results - navigated from AdminDashboard */}
            <Stack.Screen
                name="AdminResults"
                component={AdminResultsScreen}
                options={{ title: 'Voting Results' }}
             />
              {/* Screen for creating - can be navigated to from Dashboard button OR Tab */}
             {/* If using tabs, this stack screen might be redundant unless needed for specific nav patterns */}
             <Stack.Screen
                 name="AdminCreate"
                 component={AdminCreateScreen}
                 options={{ title: 'Create Voting' }}
             />
        </Stack.Navigator>
    );
};

export default AdminNavigator;