import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from '../../../context/UserContext';

export default function EditRunnerProfile() {
    const router = useRouter();
    const { userData, updateUserData } = useUser();

    // Local state for form
    const [name, setName] = useState(userData.name);
    const [email, setEmail] = useState(userData.email);
    const [phone, setPhone] = useState(userData.phone);
    const [vehicleType, setVehicleType] = useState(userData.vehicleType || '');
    const [vehiclePlate, setVehiclePlate] = useState(userData.vehiclePlate || '');

    const handleSave = () => {
        if (!name || !email || !phone || !vehicleType) {
            Alert.alert("Error", "Please fill in all required fields.");
            return;
        }

        updateUserData({
            name,
            email,
            phone,
            vehicleType,
            vehiclePlate
        });

        Alert.alert("Success", "Runner profile updated successfully!", [
            { text: "OK", onPress: () => router.back() }
        ]);
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Personal Details</Text>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Full Name</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Phone</Text>
                    <TextInput
                        style={styles.input}
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="phone-pad"
                    />
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Vehicle Information</Text>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Vehicle Type (e.g. Motorbike, Bicycle)</Text>
                    <TextInput
                        style={styles.input}
                        value={vehicleType}
                        onChangeText={setVehicleType}
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Number Plate (Optional)</Text>
                    <TextInput
                        style={styles.input}
                        value={vehiclePlate}
                        onChangeText={setVehiclePlate}
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
        color: '#006400',
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
    saveButton: {
        backgroundColor: '#006400', // Green for runner
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
