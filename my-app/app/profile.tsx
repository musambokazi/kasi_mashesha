import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

// IMPORTANT:
// We DO NOT import expo-image-picker at the top level because
// web / rollup preview environments cannot bundle native permission modules.
// Instead, we dynamically load it only on real mobile devices.

export default function Profile() {
    const router = useRouter();

    const [name, setName] = useState('Thabo Mokoena');
    const [email, setEmail] = useState('thabo@kasi.com');
    const [phone, setPhone] = useState('072 123 4567');
    const [address, setAddress] = useState('45 Mandela St, Soweto');

    // Profile image state
    const [image, setImage] = useState<string | null>(null);

    /**
     * SAFE IMAGE PICKER
     * - Dynamically imports expo-image-picker ONLY on native platforms.
     * - Prevents Rollup / web bundling crash.
     * - Fully guarded with try/catch.
     */
    const pickImage = async () => {
        try {
            // 🚫 Web fallback (no permissions available)
            if (Platform.OS === 'web') {
                Alert.alert('Not supported on web', 'Image upload works only on a real mobile device.');
                return;
            }

            // ✅ Dynamically import to avoid bundling crash
            const ImagePicker = await import('expo-image-picker');

            const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!permission.granted) {
                Alert.alert('Permission required', 'Please allow photo access to continue.');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
            });

            if (!result.canceled && result.assets?.length) {
                setImage(result.assets[0].uri);
            }
        } catch (error) {
            console.error('Image pick error:', error);
            Alert.alert('Error', 'Unable to open image library in this environment.');
        }
    };

    const handleLogout = () => {
        router.replace('/log_in');
    };

    // Get initials from name (TM stays visible if no image)
    const getInitials = () => {
        const parts = name.trim().split(' ').filter(Boolean);
        return parts.map(p => p[0]).join('').toUpperCase() || 'U';
    };

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />

            {/* TOP RIGHT SMALL AVATAR (visible in app after login) */}
            <View style={styles.topRightAvatarWrapper}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.topRightAvatar} />
                ) : (
                    <View style={styles.topRightAvatar}>
                        <Text style={styles.topRightAvatarText}>{getInitials()}</Text>
                    </View>
                )}
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* HEADER */}
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

                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.role}>Client</Text>
                    <Text style={styles.changePhotoHint}>Tap photo to change</Text>
                </View>

                {/* PERSONAL DETAILS */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Personal Details</Text>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Full Name</Text>
                        <TextInput style={styles.input} value={name} onChangeText={setName} />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email Address</Text>
                        <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Phone Number</Text>
                        <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Default Address</Text>
                        <TextInput style={styles.input} value={address} onChangeText={setAddress} />
                    </View>
                </View>

                {/* SAVE BUTTON */}
                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={() => Alert.alert('Success', 'Profile Updated!')}
                >
                    <Text style={styles.saveButtonText}>SAVE CHANGES</Text>
                </TouchableOpacity>

                {/* LOGOUT BUTTON */}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutButtonText}>LOGOUT</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    /* ---------- TOP RIGHT AVATAR ---------- */
    topRightAvatarWrapper: {
        position: 'absolute',
        top: 50,
        right: 20,
        zIndex: 10,
    },
    topRightAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#000080',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    topRightAvatarText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },

    scrollContent: {
        padding: 20,
        paddingTop: 100,
    },

    /* ---------- HEADER ---------- */
    header: {
        alignItems: 'center',
        marginBottom: 30,
    },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#000080',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    avatarImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 15,
    },
    avatarText: {
        color: '#FFFFFF',
        fontSize: 36,
        fontWeight: 'bold',
    },
    changePhotoHint: {
        fontSize: 12,
        color: '#888',
        marginTop: 4,
    },

    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    role: {
        fontSize: 16,
        color: '#757575',
        marginTop: 5,
    },

    /* ---------- SECTION ---------- */
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000080',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
        paddingBottom: 10,
    },

    inputGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        color: '#757575',
        marginBottom: 5,
        fontWeight: '600',
    },
    input: {
        backgroundColor: '#F9F9F9',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: '#333',
    },

    /* ---------- BUTTONS ---------- */
    saveButton: {
        backgroundColor: '#006400',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 15,
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },

    logoutButton: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#800000',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    logoutButtonText: {
        color: '#800000',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
