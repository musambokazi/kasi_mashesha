import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function Register() {
    const router = useRouter();
    const [role, setRole] = useState('client'); // client, runner, store

    // Common fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    // Specific fields
    const [businessName, setBusinessName] = useState('');
    const [businessAddress, setBusinessAddress] = useState('');
    const [driverLicense, setDriverLicense] = useState('');
    const [vehicleNumber, setVehicleNumber] = useState('');

    const handleRegister = () => {
        // Implement registration logic
        console.log('Registering...', { role, email, name });
    };

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Join the Kingdom</Text>
                    <Text style={styles.headerSubtitle}>Create your account</Text>
                </View>

                <View style={styles.formContainer}>
                    <View style={styles.roleContainer}>
                        {['client', 'runner', 'store'].map((r) => (
                            <TouchableOpacity
                                key={r}
                                style={[styles.roleButton, role === r && styles.selectedRoleButton]}
                                onPress={() => setRole(r)}
                            >
                                <Text style={[styles.roleText, role === r && styles.selectedRoleText]}>
                                    {r.charAt(0).toUpperCase() + r.slice(1)}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Full Name"
                            placeholderTextColor="#757575"
                            value={name}
                            onChangeText={setName}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Email Address"
                            placeholderTextColor="#757575"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor="#757575"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />

                        {role === 'store' && (
                            <>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Business Name"
                                    placeholderTextColor="#757575"
                                    value={businessName}
                                    onChangeText={setBusinessName}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Business Address"
                                    placeholderTextColor="#757575"
                                    value={businessAddress}
                                    onChangeText={setBusinessAddress}
                                />
                            </>
                        )}

                        {role === 'runner' && (
                            <>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Driver License"
                                    placeholderTextColor="#757575"
                                    value={driverLicense}
                                    onChangeText={setDriverLicense}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Vehicle Number"
                                    placeholderTextColor="#757575"
                                    value={vehicleNumber}
                                    onChangeText={setVehicleNumber}
                                />
                            </>
                        )}
                    </View>

                    <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                        <Text style={styles.registerButtonText}>SIGN UP</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.push('/log_in')} style={styles.linkButton}>
                        <Text style={styles.linkText}>Already have an account? <Text style={styles.linkTextBold}>Login</Text></Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF', // White
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    header: {
        marginBottom: 30,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000080', // Navy Blue
        marginBottom: 5,
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#000000',
    },
    formContainer: {
        backgroundColor: '#F5F5F5',
        padding: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#800000', // Maroon
        elevation: 2,
    },
    roleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 25,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 5,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    roleButton: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 10,
    },
    selectedRoleButton: {
        backgroundColor: '#800000', // Maroon
    },
    roleText: {
        color: '#757575',
        fontWeight: '600',
        fontSize: 12,
    },
    selectedRoleText: {
        color: '#FFFFFF', // White
        fontWeight: 'bold',
    },
    inputContainer: {
        gap: 15,
        marginBottom: 30,
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 15,
        color: '#000000',
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#000080', // Navy Blue
    },
    registerButton: {
        backgroundColor: '#800000', // Maroon
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
        elevation: 3,
    },
    registerButtonText: {
        color: '#FFFFFF', // White
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    linkButton: {
        alignItems: 'center',
    },
    linkText: {
        color: '#757575',
        fontSize: 14,
    },
    linkTextBold: {
        color: '#800000', // Maroon
        fontWeight: 'bold',
    },
});
