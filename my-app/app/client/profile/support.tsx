import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Support() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Help & Support</Text>
            <Text style={styles.subtext}>Contact us at support@kasi.com</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
    text: { fontSize: 20, fontWeight: 'bold', color: '#333' },
    subtext: { fontSize: 16, color: '#666', marginTop: 10 },
});
