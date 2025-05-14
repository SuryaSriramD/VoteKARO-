import { StyleSheet, Dimensions } from 'react-native';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

// Define some baseline factors for scaling, adjust as needed
const baseScreenWidth = 375; // Example baseline width (e.g., iPhone 8/SE)
const widthScaleFactor = width / baseScreenWidth;

// Function to scale font size (optional, provides smoother scaling)
const scaleFontSize = (size) => {
    const newSize = size * widthScaleFactor;
    // Optional: Add min/max caps to prevent excessively small/large fonts
    return Math.max(12, Math.min(newSize, 30)); // Cap font size between 12 and 30
    // return newSize;
};

export const styles = StyleSheet.create({
    // --- Containers ---
    container: {
        flex: 1,
        // Make padding proportional to screen width (e.g., 5% of width)
        paddingHorizontal: width * 0.05, // Horizontal padding based on width
        paddingVertical: height * 0.02, // Vertical padding based on height or fixed
        backgroundColor: '#f5f5f5',
    },

    // --- Typography ---
    title: {
        // Scale font size based on screen width
        fontSize: scaleFontSize(24), // Scaled font size
        fontWeight: 'bold',
        // Scale margin based on screen width or height
        marginBottom: height * 0.03, // Margin proportional to height
        textAlign: 'center',
        color: '#333',
    },
    label: {
        // Scale font size
        fontSize: scaleFontSize(15),
        // Scale margin
        marginBottom: height * 0.008,
        fontWeight: '500',
        color: '#333',
    },
    buttonText: {
        color: '#ffffff',
        // Scale font size
        fontSize: scaleFontSize(16),
        fontWeight: 'bold',
    },
    linkText: {
        color: '#007bff',
        textAlign: 'center',
        // Scale margin and font size
        marginTop: height * 0.015,
        fontSize: scaleFontSize(14),
        fontWeight: '500',
    },
    errorText: {
        color: '#dc3545', // Standard Bootstrap danger red
        // Scale margin and font size
        marginBottom: height * 0.015,
        fontSize: scaleFontSize(14),
        textAlign: 'center',
        fontWeight: '500',
    },
    profileDetail: {
        // Scale font size and margin
        fontSize: scaleFontSize(16),
        marginBottom: height * 0.01,
        color: '#555',
     },

    // --- Inputs ---
    input: {
        height: 45, // Keep height fixed or scale slightly based on height if needed
        borderColor: '#ccc',
        borderWidth: 1,
        // Scale margin based on height
        marginBottom: height * 0.018,
        paddingHorizontal: width * 0.03, // Scale padding slightly
        borderRadius: 5,
        backgroundColor: '#fff',
        // Font size inside input can also be scaled if desired
        fontSize: scaleFontSize(15),
    },

    // --- Buttons ---
    button: {
        backgroundColor: '#007bff',
        // Scale vertical padding based on height
        paddingVertical: height * 0.015,
        borderRadius: 8, // Slightly larger radius
        alignItems: 'center',
        // Scale margin based on height
        marginBottom: height * 0.012,
        // Add some elevation/shadow for depth
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },

    // --- List Items ---
    listItem: {
        backgroundColor: '#fff',
        // Scale padding
        padding: width * 0.04,
        borderRadius: 8,
        // Scale margin
        marginBottom: height * 0.012,
        borderWidth: 1,
        borderColor: '#eee',
        // Add subtle shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
    },
    listItemTitle: {
        // Scale font size
        fontSize: scaleFontSize(17),
        fontWeight: '600', // Slightly bolder
        color: '#444',
    },
     listItemSubtitle: {
        // Scale font size
        fontSize: scaleFontSize(14),
        color: '#666',
        // Scale margin
        marginTop: height * 0.005,
    },

    // --- Specific/Utility ---
    // Note: This style was for VotingScreen candidate selection.
    // Keep specific styles in their respective screen files unless truly global.
    // Renaming or moving is recommended if only used in one place.
    selectedCandidateVisual: { // Example rename
        fontWeight: 'bold',
        color: 'green',
    },
});