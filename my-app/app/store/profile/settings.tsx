import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useUser } from '../../../context/UserContext';
import { Ionicons } from '@expo/vector-icons';

export default function StoreSettings() {
    const { settings, updateSettings } = useUser();

    const toggleSwitch = (key: keyof typeof settings) => {
        updateSettings({ [key]: !settings[key] });
    };

    const handlePress = (item: string) => {
        Alert.alert(item, "Settings update unavailable in demo mode.");
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.group}>
                <Text style={styles.groupTitle}>Business Preferences</Text>

                <View style={styles.settingItem}>
                    <View style={styles.labelContainer}>
                        <Ionicons name="notifications-outline" size={22} color="#333" />
                        <Text style={styles.label}>Order Notifications</Text>
                    </View>
                    <Switch
                        trackColor={{ false: "#767577", true: "#800000" }}
                        thumbColor={settings.notifications ? "#f4f3f4" : "#f4f3f4"}
                        onValueChange={() => toggleSwitch('notifications')}
                        value={settings.notifications}
                    />
                </View>

                <View style={styles.settingItem}>
                    <View style={styles.labelContainer}>
                        <Ionicons name="location-outline" size={22} color="#333" />
                        <Text style={styles.label}>Show Store Location</Text>
                    </View>
                    <Switch
                        trackColor={{ false: "#767577", true: "#800000" }}
                        thumbColor={settings.locationSharing ? "#f4f3f4" : "#f4f3f4"}
                        onValueChange={() => toggleSwitch('locationSharing')}
                        value={settings.locationSharing}
                    />
                </View>
            </View>

            <View style={styles.group}>
                <Text style={styles.groupTitle}>Operations</Text>

                <TouchableOpacity style={styles.linkItem} onPress={() => handlePress("Operating Hours")}>
                    <View style={styles.labelContainer}>
                        <Ionicons name="time-outline" size={22} color="#333" />
                        <Text style={styles.label}>Operating Hours</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.linkItem} onPress={() => handlePress("Receipt Printing")}>
                    <View style={styles.labelContainer}>
                        <Ionicons name="print-outline" size={22} color="#333" />
                        <Text style={styles.label}>Printer Settings</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                </TouchableOpacity>
            </View>

            <View style={styles.group}>
                <Text style={styles.groupTitle}>Admin & Legal</Text>

                <TouchableOpacity style={styles.linkItem} onPress={() => handlePress("Banking Details")}>
                    <Text style={styles.linkText}>Banking Details</Text>
                    <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.linkItem} onPress={() => handlePress("Tax Information")}>
                    <Text style={styles.linkText}>Tax Information</Text>
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
