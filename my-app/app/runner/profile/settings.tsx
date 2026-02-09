import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useUser } from '../../../context/UserContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function RunnerSettings() {
    const { settings, updateSettings } = useUser();
    const router = useRouter();

    const toggleSwitch = (key: keyof typeof settings) => {
        updateSettings({ [key]: !settings[key] });
    };

    const handlePress = (item: string) => {
        Alert.alert(item, "This feature will be available in the next release.");
    };

    return (
        <ScrollView style={styles.container}>
            {/* Delivery Preferences */}
            <View style={styles.group}>
                <Text style={styles.groupTitle}>Delivery Preferences</Text>

                <View style={styles.settingItem}>
                    <View style={styles.labelContainer}>
                        <Ionicons name="cash-outline" size={22} color="#333" />
                        <Text style={styles.label}>Accept Cash Orders</Text>
                    </View>
                    <Switch
                        trackColor={{ false: "#767577", true: "#006400" }}
                        thumbColor={settings.acceptCashOrders ? "#f4f3f4" : "#f4f3f4"}
                        onValueChange={() => toggleSwitch('acceptCashOrders')}
                        value={settings.acceptCashOrders}
                    />
                </View>

                <TouchableOpacity style={styles.linkItem} onPress={() => handlePress("Max Distance")}>
                    <View style={styles.labelContainer}>
                        <Ionicons name="resize-outline" size={22} color="#333" />
                        <Text style={styles.label}>Max Delivery Distance</Text>
                    </View>
                    <Text style={{ color: '#666', marginRight: 10 }}>10 km</Text>
                    <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                </TouchableOpacity>
            </View>

            {/* Vehicle & Transport */}
            <View style={styles.group}>
                <Text style={styles.groupTitle}>Vehicle & Transport</Text>

                <TouchableOpacity style={styles.linkItem} onPress={() => router.push('/runner/profile/edit')}>
                    <View style={styles.labelContainer}>
                        <Ionicons name="bicycle-outline" size={22} color="#333" />
                        <Text style={styles.label}>Vehicle Type</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.linkItem} onPress={() => router.push('/runner/profile/edit')}>
                    <View style={styles.labelContainer}>
                        <Ionicons name="document-text-outline" size={22} color="#333" />
                        <Text style={styles.label}>Registration & Papers</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                </TouchableOpacity>
            </View>

            {/* Earnings & Payouts */}
            <View style={styles.group}>
                <Text style={styles.groupTitle}>Earnings & Payouts</Text>

                <TouchableOpacity style={styles.linkItem} onPress={() => handlePress("Banking Details")}>
                    <View style={styles.labelContainer}>
                        <Ionicons name="wallet-outline" size={22} color="#333" />
                        <Text style={styles.label}>Banking Details</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.linkItem} onPress={() => handlePress("Payout Schedule")}>
                    <View style={styles.labelContainer}>
                        <Ionicons name="calendar-outline" size={22} color="#333" />
                        <Text style={styles.label}>Payout Schedule</Text>
                    </View>
                    <Text style={{ color: '#666', marginRight: 10 }}>Weekly (Mon)</Text>
                    <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.linkItem} onPress={() => handlePress("Tax Information")}>
                    <View style={styles.labelContainer}>
                        <Ionicons name="receipt-outline" size={22} color="#333" />
                        <Text style={styles.label}>Tax Information</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                </TouchableOpacity>
            </View>

            {/* App Settings */}
            <View style={styles.group}>
                <Text style={styles.groupTitle}>App Settings</Text>

                <View style={styles.settingItem}>
                    <View style={styles.labelContainer}>
                        <Ionicons name="notifications-outline" size={22} color="#333" />
                        <Text style={styles.label}>New Order Alerts</Text>
                    </View>
                    <Switch
                        trackColor={{ false: "#767577", true: "#006400" }}
                        thumbColor={settings.notifications ? "#f4f3f4" : "#f4f3f4"}
                        onValueChange={() => toggleSwitch('notifications')}
                        value={settings.notifications}
                    />
                </View>

                <View style={styles.settingItem}>
                    <View style={styles.labelContainer}>
                        <Ionicons name="location-outline" size={22} color="#333" />
                        <Text style={styles.label}>Share Real-time Location</Text>
                    </View>
                    <Switch
                        trackColor={{ false: "#767577", true: "#006400" }}
                        thumbColor={settings.locationSharing ? "#f4f3f4" : "#f4f3f4"}
                        onValueChange={() => toggleSwitch('locationSharing')}
                        value={settings.locationSharing}
                    />
                </View>

                <TouchableOpacity style={styles.linkItem} onPress={() => handlePress("Default Map App")}>
                    <View style={styles.labelContainer}>
                        <Ionicons name="map-outline" size={22} color="#333" />
                        <Text style={styles.label}>Default Map App</Text>
                    </View>
                    <Text style={{ color: '#666', marginRight: 10 }}>Google Maps</Text>
                    <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                </TouchableOpacity>
            </View>

            {/* Account & Security */}
            <View style={styles.group}>
                <Text style={styles.groupTitle}>Account & Security</Text>

                <TouchableOpacity style={styles.linkItem} onPress={() => handlePress("Change Password")}>
                    <Text style={styles.linkText}>Change Password</Text>
                    <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.linkItem} onPress={() => handlePress("Delete Account")}>
                    <Text style={[styles.linkText, { color: 'red' }]}>Delete Account</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.group}>
                <Text style={styles.groupTitle}>Support</Text>
                <TouchableOpacity style={styles.linkItem} onPress={() => handlePress("Runner Support")}>
                    <Text style={styles.linkText}>Contact Runner Support</Text>
                    <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.linkItem} onPress={() => handlePress("Legal")}>
                    <Text style={styles.linkText}>Terms & Privacy Policy</Text>
                    <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                </TouchableOpacity>
            </View>

            <View style={{ height: 40 }} />
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
        marginBottom: 20, // Reduced slightly for compactness
        backgroundColor: '#FFF',
        borderRadius: 12,
        overflow: 'hidden',
        paddingVertical: 5, // Tighter padding inside groups
    },
    groupTitle: {
        fontSize: 13, // Slightly smaller
        fontWeight: 'bold',
        color: '#888',
        marginLeft: 20,
        marginBottom: 5,
        marginTop: 10,
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
