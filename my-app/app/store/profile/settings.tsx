import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StoreSettings() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Store Settings</Text>
            <Text style={styles.subtext}>Payment Methods, Notifications</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
    text: { fontSize: 20, fontWeight: 'bold', color: '#333' },
    subtext: { fontSize: 16, color: '#666', marginTop: 10 },
});
