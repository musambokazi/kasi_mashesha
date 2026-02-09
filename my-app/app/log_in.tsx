import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('client'); // client, runner, store

    const handleLogin = () => {
        // Implement login logic here
        console.log('Login as', role, email, password);

        switch (role) {
            case 'client':
                router.replace('/client/home');
                break;
            case 'store':
                router.replace('/store/home');
                break;
            case 'runner':
                router.replace('/runner/home');
                break;
            default:
                console.error('Unknown role');
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Image
                        source={require('../assets/images/KasiLogo.png')}
                        style={{ width: 100, height: 100, marginBottom: 20 }}
                        resizeMode="contain"
                    />
                    <Text style={styles.headerTitle}>Welcome Back</Text>
                    <Text style={styles.headerSubtitle}>Sign in to continue</Text>
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
                    </View>

                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                        <Text style={styles.loginButtonText}>LOGIN</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.push('/register')} style={styles.linkButton}>
                        <Text style={styles.linkText}>Don't have an account? <Text style={styles.linkTextBold}>Sign Up</Text></Text>
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
        marginBottom: 40,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000080', // Navy Blue
        marginBottom: 10,
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#000000', // Black
    },
    formContainer: {
        backgroundColor: '#F5F5F5',
        padding: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#006400', // Dark Green
        elevation: 2,
    },
    roleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
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
        backgroundColor: '#006400', // Dark Green
    },
    roleText: {
        color: '#757575',
        fontWeight: '600',
    },
    selectedRoleText: {
        color: '#FFFFFF', // White
        fontWeight: 'bold',
    },
    inputContainer: {
        gap: 20,
        marginBottom: 30,
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 15,
        color: '#000000',
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#000080', // Navy Blue border
    },
    loginButton: {
        backgroundColor: '#006400', // Dark Green
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
        elevation: 3,
    },
    loginButtonText: {
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
        color: '#006400', // Dark Green
        fontWeight: 'bold',
    },
});
