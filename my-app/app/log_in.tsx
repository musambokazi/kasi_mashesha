import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('client'); // client, runner, store
    const [showPassword, setShowPassword] = useState(false);

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
            <StatusBar style="light" />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <View style={styles.logoContainer}>
                        {/* Placeholder for Logo - In a real app, use the actual Image with tintColor if needed, or leave natural */}
                        <Image
                            source={require('../assets/images/KasiLogo.png')}
                            style={{ width: 100, height: 100 }}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={styles.headerTitle}>Welcome Back!</Text>
                    <Text style={styles.headerSubtitle}>Sign in to access your Kasi Mashesha account.</Text>
                </View>

                <View style={styles.formContainer}>
                    {/* Role Selection - Slider Style */}
                    <View style={styles.roleContainer}>
                        {/* Animated Background Slider */}
                        <View style={[
                            styles.roleSlider,
                            {
                                transform: [
                                    { translateX: role === 'client' ? 0 : role === 'runner' ? 100 : 200 } // Approximate, will use flex for better responsiveness
                                ],
                                // Better approach using flex/percentage if we can't measure, 
                                // but for now simplified with state-based styles strictly or simple math.
                                // Let's use a simple state-based alignment for the slider effect
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
                                    placeholder="Enter your password"
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

                        <View style={styles.rememberRow}>
                            {/* Placeholder for Checkbox */}
                            <TouchableOpacity style={styles.rememberMe}>
                                <View style={styles.checkbox} />
                                <Text style={styles.rememberText}>Remember me</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.forgotPassword}>Forgot Password?</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                        <Text style={styles.loginButtonText}>Sign in</Text>
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

                    <TouchableOpacity onPress={() => router.push('/register')} style={styles.linkButton}>
                        <Text style={styles.linkText}>Don't have an account? <Text style={styles.linkTextBold}>Sign up</Text></Text>
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
        justifyContent: 'center',
    },
    header: {
        marginBottom: 32,
        alignItems: 'center',
    },
    logoContainer: {
        marginBottom: 24,
        // Add a subtle glow or container if needed
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 8,
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#A0A0A0',
        textAlign: 'center',
    },
    formContainer: {
        width: '100%',
    },
    roleContainer: {
        flexDirection: 'row',
        backgroundColor: '#1A1A2E',
        borderRadius: 30, // Pill shape
        padding: 4,
        marginBottom: 24,
        position: 'relative',
        height: 50, // Fixed height for alignment
    },
    roleSlider: {
        position: 'absolute',
        top: 4,
        bottom: 4,
        width: '32%', // Approx 1/3
        backgroundColor: '#D4FF00', // Neon Green
        borderRadius: 25,
        zIndex: 0,
    },
    roleButton: {
        flex: 1,
        justifyContent: 'center', // Vertically center
        alignItems: 'center',
        zIndex: 1, // Above the slider
    },
    roleText: {
        color: '#A0A0A0',
        fontWeight: '600',
        fontSize: 14,
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
    rememberRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    rememberMe: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#666',
        backgroundColor: 'transparent',
    },
    rememberText: {
        color: '#A0A0A0',
        fontSize: 14,
    },
    forgotPassword: {
        color: '#A0A0A0',
        fontSize: 14,
    },
    loginButton: {
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
    loginButtonText: {
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
