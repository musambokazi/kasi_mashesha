import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useUser } from '../../../context/UserContext';
import { Ionicons } from '@expo/vector-icons';

export default function RunnerSettings() {
    const { settings, updateSettings } = useUser();

    const toggleSwitch = (key: keyof typeof settings) => {
        updateSettings({ [key]: !settings[key] });
    };

    const handlePress = (item: string) => {
        Alert.alert(item, "You can update this in the next release.");
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.group}>
                <Text style={styles.groupTitle}>App Preferences</Text>

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
            </View>

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
                    <Text style={{ color: '#666', marginRight: 10 }}>Weekly</Text>
                    <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                </TouchableOpacity>
            </View>

            <View style={styles.group}>
                <Text style={styles.groupTitle}>Navigation</Text>

                <TouchableOpacity style={styles.linkItem} onPress={() => handlePress("Default Map App")}>
                    <View style={styles.labelContainer}>
                        <Ionicons name="map-outline" size={22} color="#333" />
                        <Text style={styles.label}>Default Map App</Text>
                    </View>
                    <Text style={{ color: '#666', marginRight: 10 }}>Google Maps</Text>
                    <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                </TouchableOpacity>
            </View>

            <View style={styles.group}>
                <Text style={styles.groupTitle}>Support</Text>
                <TouchableOpacity style={styles.linkItem} onPress={() => handlePress("Runner Support")}>
                    <Text style={styles.linkText}>Contact Runner Support</Text>
                    <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                </TouchableOpacity>
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
});
