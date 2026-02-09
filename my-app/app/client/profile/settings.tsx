import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useUser } from '../../../context/UserContext';
import { Ionicons } from '@expo/vector-icons';

export default function ClientSettings() {
    const { settings, updateSettings } = useUser();

    const toggleSwitch = (key: keyof typeof settings) => {
        updateSettings({ [key]: !settings[key] });
    };

    const handlePress = (item: string) => {
        Alert.alert(item, "This feature will be available soon.");
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.group}>
                <Text style={styles.groupTitle}>Preferences</Text>

                <View style={styles.settingItem}>
                    <View style={styles.labelContainer}>
                        <Ionicons name="notifications-outline" size={22} color="#333" />
                        <Text style={styles.label}>Push Notifications</Text>
                    </View>
                    <Switch
                        trackColor={{ false: "#767577", true: "#000080" }}
                        thumbColor={settings.notifications ? "#f4f3f4" : "#f4f3f4"}
                        onValueChange={() => toggleSwitch('notifications')}
                        value={settings.notifications}
                    />
                </View>

                <View style={styles.settingItem}>
                    <View style={styles.labelContainer}>
                        <Ionicons name="moon-outline" size={22} color="#333" />
                        <Text style={styles.label}>Dark Mode</Text>
                    </View>
                    <Switch
                        trackColor={{ false: "#767577", true: "#000080" }}
                        thumbColor={settings.darkMode ? "#f4f3f4" : "#f4f3f4"}
                        onValueChange={() => toggleSwitch('darkMode')}
                        value={settings.darkMode}
                    />
                </View>

                <View style={styles.settingItem}>
                    <View style={styles.labelContainer}>
                        <Ionicons name="location-outline" size={22} color="#333" />
                        <Text style={styles.label}>Share Location</Text>
                    </View>
                    <Switch
                        trackColor={{ false: "#767577", true: "#000080" }}
                        thumbColor={settings.locationSharing ? "#f4f3f4" : "#f4f3f4"}
                        onValueChange={() => toggleSwitch('locationSharing')}
                        value={settings.locationSharing}
                    />
                </View>
            </View>

            <View style={styles.group}>
                <Text style={styles.groupTitle}>Payment & Addresses</Text>

                <TouchableOpacity style={styles.linkItem} onPress={() => handlePress("Payment Methods")}>
                    <View style={styles.labelContainer}>
                        <Ionicons name="card-outline" size={22} color="#333" />
                        <Text style={styles.label}>Payment Methods</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.linkItem} onPress={() => handlePress("Address Book")}>
                    <View style={styles.labelContainer}>
                        <Ionicons name="book-outline" size={22} color="#333" />
                        <Text style={styles.label}>Address Book</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                </TouchableOpacity>
            </View>

            <View style={styles.group}>
                <Text style={styles.groupTitle}>Account</Text>

                <TouchableOpacity style={styles.linkItem} onPress={() => handlePress("Change Password")}>
                    <Text style={styles.linkText}>Change Password</Text>
                    <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.linkItem} onPress={() => handlePress("Privacy Policy")}>
                    <Text style={styles.linkText}>Privacy Policy</Text>
                    <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.linkItem} onPress={() => handlePress("Delete Account")}>
                    <Text style={[styles.linkText, { color: 'red' }]}>Delete Account</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.group}>
                <Text style={styles.groupTitle}>About</Text>
                <View style={styles.settingItem}>
                    <Text style={styles.linkText}>Version</Text>
                    <Text style={{ color: '#8E8E93' }}>1.0.0</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 20,
    },
    group: {
        marginBottom: 30,
        backgroundColor: '#FFF',
        borderRadius: 12,
        overflow: 'hidden',
        paddingVertical: 10,
    },
    groupTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#666',
        marginLeft: 20,
        marginBottom: 10,
        textTransform: 'uppercase',
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        color: '#333',
        marginLeft: 15,
    },
    linkItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    linkText: {
        fontSize: 16,
        color: '#333',
    },
});
