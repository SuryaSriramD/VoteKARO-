import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 45,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    linkText: {
        color: '#007bff',
        textAlign: 'center',
        marginTop: 10,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
        textAlign: 'center',
    },
    listItem: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#eee',
    },
    listItemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
     listItemSubtitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: '500',
    },
     profileDetail: {
        fontSize: 16,
        marginBottom: 8,
     },
      selectedCandidate: {
        fontWeight: 'bold',
        color: 'green',
    },
});