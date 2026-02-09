import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Settings() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Settings Page</Text>
            <Text style={styles.subtext}>Notifications, Privacy, App Theme</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
    text: { fontSize: 20, fontWeight: 'bold', color: '#333' },
    subtext: { fontSize: 16, color: '#666', marginTop: 10 },
});
