import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useUser } from '../../../context/UserContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function StoreSettings() {
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
            {/* Store Status */}
            <View style={styles.group}>
                <View style={[styles.settingItem, { borderBottomWidth: 0 }]}>
                    <View style={styles.labelContainer}>
                        <Ionicons
                            name={settings.isStoreOpen ? "storefront" : "storefront-outline"}
                            size={24}
                            color={settings.isStoreOpen ? "#006400" : "#666"}
                        />
                        <View style={{ marginLeft: 15 }}>
                            <Text style={styles.label}>Accepting Orders</Text>
                            <Text style={styles.subLabel}>
                                {settings.isStoreOpen ? "Your store is currently OPEN" : "Your store is currently CLOSED"}
                            </Text>
                        </View>
                    </View>
                    <Switch
                        trackColor={{ false: "#767577", true: "#006400" }}
                        thumbColor={settings.isStoreOpen ? "#f4f3f4" : "#f4f3f4"}
                        onValueChange={() => toggleSwitch('isStoreOpen')}
                        value={settings.isStoreOpen}
                    />
                </View>
            </View>

            {/* Menu & Catalog */}
            <View style={styles.group}>
                <Text style={styles.groupTitle}>Menu & Catalog</Text>

                <TouchableOpacity style={styles.linkItem} onPress={() => handlePress("Manage Menu")}>
                    <View style={styles.labelContainer}>
                        <Ionicons name="fast-food-outline" size={22} color="#333" />
                        <Text style={styles.label}>Manage Menu Items</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.linkItem} onPress={() => handlePress("Unavailable Items")}>
                    <View style={styles.labelContainer}>
                        <Ionicons name="pricetag-outline" size={22} color="#333" />
                        <Text style={styles.label}>Mark Items Unavailable</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                </TouchableOpacity>
            </View>

            {/* Business Profile */}
            <View style={styles.group}>
                <Text style={styles.groupTitle}>Business Profile</Text>

                <TouchableOpacity style={styles.linkItem} onPress={() => router.push('/store/profile/edit')}>
                    <View style={styles.labelContainer}>
                        <Ionicons name="business-outline" size={22} color="#333" />
                        <Text style={styles.label}>Store Information</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.linkItem} onPress={() => handlePress("Branding")}>
                    <View style={styles.labelContainer}>
                        <Ionicons name="image-outline" size={22} color="#333" />
                        <Text style={styles.label}>Logo & Banner</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                </TouchableOpacity>
            </View>

            {/* Operations */}
            <View style={styles.group}>
                <Text style={styles.groupTitle}>Operations</Text>

                <View style={styles.settingItem}>
                    <View style={styles.labelContainer}>
                        <Ionicons name="notifications-outline" size={22} color="#333" />
                        <Text style={styles.label}>Order Notifications</Text>
                    </View>
                    <Switch
                        trackColor={{ false: "#767577", true: "#006400" }}
                        thumbColor={settings.notifications ? "#f4f3f4" : "#f4f3f4"}
                        onValueChange={() => toggleSwitch('notifications')}
                        value={settings.notifications}
                    />
                </View>

                <TouchableOpacity style={styles.linkItem} onPress={() => handlePress("Operating Hours")}>
                    <View style={styles.labelContainer}>
                        <Ionicons name="time-outline" size={22} color="#333" />
                        <Text style={styles.label}>Operating Hours</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.linkItem} onPress={() => handlePress("Printer Settings")}>
                    <View style={styles.labelContainer}>
                        <Ionicons name="print-outline" size={22} color="#333" />
                        <Text style={styles.label}>Receipt Printer</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                </TouchableOpacity>
            </View>

            {/* Financials */}
            <View style={styles.group}>
                <Text style={styles.groupTitle}>Financials</Text>

                <TouchableOpacity style={styles.linkItem} onPress={() => handlePress("Payouts")}>
                    <View style={styles.labelContainer}>
                        <Ionicons name="cash-outline" size={22} color="#333" />
                        <Text style={styles.label}>Payouts & Earnings</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.linkItem} onPress={() => handlePress("Banking Details")}>
                    <View style={styles.labelContainer}>
                        <Ionicons name="card-outline" size={22} color="#333" />
                        <Text style={styles.label}>Banking Details</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                </TouchableOpacity>
            </View>

            <View style={styles.group}>
                <Text style={styles.groupTitle}>Support</Text>
                <TouchableOpacity style={styles.linkItem} onPress={() => handlePress("Merchant Support")}>
                    <Text style={styles.linkText}>Contact Merchant Support</Text>
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
        marginBottom: 20,
        backgroundColor: '#FFF',
        borderRadius: 12,
        overflow: 'hidden',
        paddingVertical: 5,
    },
    groupTitle: {
        fontSize: 13,
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
        fontWeight: '500',
    },
    subLabel: {
        fontSize: 12,
        color: '#888',
        marginTop: 2,
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
