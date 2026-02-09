import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

export default function Register() {
    const router = useRouter();
    const [role, setRole] = useState('client'); // client, runner, store
    const [showPassword, setShowPassword] = useState(false);

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
        router.replace('/log_in');
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Back Button */}
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#FFF" />
                </TouchableOpacity>

                <View style={styles.header}>
                    <View style={styles.iconCircle}>
                        <Ionicons name="person-add" size={32} color="#D4FF00" />
                    </View>
                    <Text style={styles.headerTitle}>Create Your Account</Text>
                    <Text style={styles.headerSubtitle}>Join the Kasi Mashesha kingdom today.</Text>
                </View>

                <View style={styles.formContainer}>
                    <View style={styles.roleContainer}>
                        {/* Animated Background Slider */}
                        <View style={[
                            styles.roleSlider,
                            {
                                left: role === 'client' ? '1%' : role === 'runner' ? '34%' : '67%'
                            }
                        ]} />

                        {['client', 'runner', 'store'].map((r) => (
                            <TouchableOpacity
                                key={r}
                                style={styles.roleButton}
                                onPress={() => setRole(r)}
                            >
                                <Text style={[styles.roleText, role === r && styles.selectedRoleText]}>
                                    {r.charAt(0).toUpperCase() + r.slice(1)}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputLabel}>Full Name*</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Thabo Mokoena"
                                placeholderTextColor="#666"
                                value={name}
                                onChangeText={setName}
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputLabel}>Email address*</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="example@gmail.com"
                                placeholderTextColor="#666"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputLabel}>Password*</Text>
                            <View style={styles.passwordContainer}>
                                <TextInput
                                    style={styles.passwordInput}
                                    placeholder="Create a password"
                                    placeholderTextColor="#666"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!showPassword}
                                />
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                                    <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="#666" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {role === 'store' && (
                            <>
                                <View style={styles.inputWrapper}>
                                    <Text style={styles.inputLabel}>Business Name</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Kasi Kota Joint"
                                        placeholderTextColor="#666"
                                        value={businessName}
                                        onChangeText={setBusinessName}
                                    />
                                </View>
                                <View style={styles.inputWrapper}>
                                    <Text style={styles.inputLabel}>Business Address</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="123 Main St"
                                        placeholderTextColor="#666"
                                        value={businessAddress}
                                        onChangeText={setBusinessAddress}
                                    />
                                </View>
                            </>
                        )}

                        {role === 'runner' && (
                            <>
                                <View style={styles.inputWrapper}>
                                    <Text style={styles.inputLabel}>Driver License</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="License Number"
                                        placeholderTextColor="#666"
                                        value={driverLicense}
                                        onChangeText={setDriverLicense}
                                    />
                                </View>
                                <View style={styles.inputWrapper}>
                                    <Text style={styles.inputLabel}>Vehicle Registration</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Reg Number"
                                        placeholderTextColor="#666"
                                        value={vehicleNumber}
                                        onChangeText={setVehicleNumber}
                                    />
                                </View>
                            </>
                        )}
                    </View>

                    <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                        <Text style={styles.registerButtonText}>Register</Text>
                        <Ionicons name="arrow-forward" size={20} color="#000" style={{ marginLeft: 10 }} />
                    </TouchableOpacity>

                    <View style={styles.dividerContainer}>
                        <View style={styles.divider} />
                        <Text style={styles.dividerText}>Or continue with</Text>
                        <View style={styles.divider} />
                    </View>

                    <View style={styles.socialRow}>
                        <TouchableOpacity style={styles.socialButton}>
                            <Ionicons name="logo-google" size={20} color="#FFF" />
                            <Text style={styles.socialButtonText}>Google</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialButton}>
                            <Ionicons name="logo-apple" size={20} color="#FFF" />
                            <Text style={styles.socialButtonText}>Apple</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={() => router.push('/log_in')} style={styles.linkButton}>
                        <Text style={styles.linkText}>Already have an account? <Text style={styles.linkTextBold}>Sign In</Text></Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#050511', // Deep Navy/Black
    },
    scrollContent: {
        flexGrow: 1,
        padding: 24,
        paddingTop: 60, // Space for status bar
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 10,
        padding: 5,
    },
    header: {
        marginBottom: 32,
        alignItems: 'center',
    },
    iconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#1A1A2E',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#333',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 8,
        textAlign: 'center',
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#A0A0A0',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    formContainer: {
        width: '100%',
    },
    roleContainer: {
        flexDirection: 'row',
        backgroundColor: '#1A1A2E',
        borderRadius: 30,
        padding: 4,
        marginBottom: 24,
        position: 'relative',
        height: 50,
    },
    roleSlider: {
        position: 'absolute',
        top: 4,
        bottom: 4,
        width: '32%',
        backgroundColor: '#D4FF00', // Neon Green
        borderRadius: 25,
        zIndex: 0,
    },
    roleButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    roleText: {
        color: '#A0A0A0',
        fontWeight: '600',
        fontSize: 13,
    },
    selectedRoleText: {
        color: '#000000',
        fontWeight: 'bold',
    },
    inputContainer: {
        marginBottom: 24,
        gap: 16,
    },
    inputWrapper: {
        gap: 8,
    },
    inputLabel: {
        color: '#FFFFFF',
        fontSize: 14,
        marginLeft: 4,
    },
    input: {
        backgroundColor: '#1A1A2E',
        borderRadius: 12,
        padding: 16,
        color: '#FFFFFF',
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#333',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1A1A2E',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#333',
    },
    passwordInput: {
        flex: 1,
        padding: 16,
        color: '#FFFFFF',
        fontSize: 16,
    },
    eyeIcon: {
        padding: 16,
    },
    registerButton: {
        backgroundColor: '#D4FF00', // Neon Green
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 24,
        shadowColor: '#D4FF00',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    registerButtonText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
        gap: 16,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#333',
    },
    dividerText: {
        color: '#666',
        fontSize: 14,
    },
    socialRow: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 32,
    },
    socialButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 14,
        backgroundColor: '#1A1A2E',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#333',
    },
    socialButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
    },
    linkButton: {
        alignItems: 'center',
    },
    linkText: {
        color: '#A0A0A0',
        fontSize: 14,
    },
    linkTextBold: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});
