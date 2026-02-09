import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

export default function StoreProfile() {
    const router = useRouter();
    const [storeName, setStoreName] = useState("Mama's Kitchen");
    const [description, setDescription] = useState('Authentic South African home-cooked meals.');
    const [address, setAddress] = useState('101 Vilakazi St, Soweto');
    const [hours, setHours] = useState('08:00 - 20:00');
    const [phone, setPhone] = useState('011 987 6543');
    const [image, setImage] = useState<string | null>(null);

    const getInitials = () => {
        const parts = storeName.trim().split(' ').filter(Boolean);
        return parts.map(p => p[0]).join('').toUpperCase() || 'S';
    };

    const pickImage = async () => {
        if (Platform.OS === 'web') {
            Alert.alert('Not supported', 'Image upload works only on mobile devices.');
            return;
        }

        try {
            const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!permission.granted) {
                Alert.alert('Permission needed', 'Allow access to photos.');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
            if (!result.canceled && result.assets?.length) setImage(result.assets[0].uri);
        } catch (err) {
            console.error(err);
            Alert.alert('Error', 'Unable to pick image.');
        }
    };

    const handleLogout = () => {
        // In a real app, clear auth tokens here
        router.replace('/log_in');
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={pickImage}>
                        {image ? (
                            <Image source={{ uri: image }} style={styles.avatarImage} />
                        ) : (
                            <View style={styles.avatarContainer}>
                                <Text style={styles.avatarText}>{getInitials()}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                    <Text style={styles.storeName}>{storeName}</Text>
                    <Text style={styles.role}>Store Owner</Text>
                </View>

                {/* STORE DETAILS */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Store Information</Text>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Store Name</Text>
                        <TextInput style={styles.input} value={storeName} onChangeText={setStoreName} />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Description</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            value={description}
                            onChangeText={setDescription}
                            multiline
                            numberOfLines={3}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Address</Text>
                        <TextInput style={styles.input} value={address} onChangeText={setAddress} />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Operating Hours</Text>
                        <TextInput style={styles.input} value={hours} onChangeText={setHours} placeholder="e.g. 09:00 - 18:00" />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Contact Phone</Text>
                        <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
                    </View>
                </View>

                <TouchableOpacity style={styles.saveButton} onPress={() => alert('Store Profile Updated!')}>
                    <Text style={styles.saveButtonText}>SAVE CHANGES</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutButtonText}>LOGOUT</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    scrollContent: { padding: 20 },
    header: { alignItems: 'center', marginBottom: 30 },
    avatarContainer: { width: 100, height: 100, borderRadius: 10, backgroundColor: '#000080', justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
    avatarImage: { width: 100, height: 100, borderRadius: 10, marginBottom: 15 },
    avatarText: { color: '#fff', fontSize: 36, fontWeight: 'bold' },
    storeName: { fontSize: 24, fontWeight: 'bold', color: '#333' },
    role: { fontSize: 16, color: '#757575', marginTop: 5 },
    section: { marginBottom: 20 },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#000080', marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#EEE', paddingBottom: 10 },
    inputGroup: { marginBottom: 15 },
    label: { fontSize: 14, color: '#757575', marginBottom: 5, fontWeight: '600' },
    input: { backgroundColor: '#F9F9F9', borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8, padding: 12, fontSize: 16 },
    textArea: { height: 80, textAlignVertical: 'top' },
    saveButton: { backgroundColor: '#006400', paddingVertical: 15, borderRadius: 10, alignItems: 'center', marginBottom: 15 },
    saveButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
    logoutButton: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#800000', paddingVertical: 15, borderRadius: 10, alignItems: 'center' },
    logoutButtonText: { color: '#800000', fontWeight: 'bold', fontSize: 16 },
});
