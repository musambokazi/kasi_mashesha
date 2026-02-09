import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from '../../../context/UserContext';

export default function EditStoreProfile() {
    const router = useRouter();
    const { userData, updateUserData } = useUser();

    // Local state for form
    const [name, setName] = useState(userData.name);
    const [email, setEmail] = useState(userData.email);
    const [phone, setPhone] = useState(userData.phone);
    const [businessName, setBusinessName] = useState(userData.businessName || '');
    const [businessAddress, setBusinessAddress] = useState(userData.businessAddress || '');

    const handleSave = () => {
        if (!name || !email || !phone || !businessName || !businessAddress) {
            Alert.alert("Error", "Please fill in all required fields.");
            return;
        }

        updateUserData({
            name,
            email,
            phone,
            businessName,
            businessAddress
        });

        Alert.alert("Success", "Store profile updated successfully!", [
            { text: "OK", onPress: () => router.back() }
        ]);
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Owner Details</Text>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Owner Name</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Email Contact</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Phone Number</Text>
                    <TextInput
                        style={styles.input}
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="phone-pad"
                    />
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Business Information</Text>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Business Name</Text>
                    <TextInput
                        style={styles.input}
                        value={businessName}
                        onChangeText={setBusinessName}
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Business Address</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        value={businessAddress}
                        onChangeText={setBusinessAddress}
                        multiline
                    />
                </View>
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    content: {
        padding: 20,
    },
    section: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 15,
        marginBottom: 20,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#800000',
        marginBottom: 15,
    },
    formGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#F9F9F9',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        fontSize: 16,
        color: '#333',
    },
    textArea: {
        height: 80,
        textAlignVertical: 'top',
    },
    saveButton: {
        backgroundColor: '#800000', // Maroon for store
        paddingVertical: 18,
        borderRadius: 12,
        alignItems: 'center',
        elevation: 2,
    },
    saveButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
