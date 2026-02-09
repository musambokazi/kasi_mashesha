import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RunnerProfileMenu() {
    const router = useRouter();
    const userName = "Sipho Dlamini";

    const menuItems = [
        {
            id: 'edit',
            title: 'Edit Profile',
            subtitle: 'Vehicle details & Personal info',
            icon: 'bicycle-outline',
            route: '/runner/profile/edit',
        },
        {
            id: 'earnings',
            title: 'Earnings',
            subtitle: 'View payout history',
            icon: 'cash-outline',
            route: '/runner/profile/earnings',
        },
        {
            id: 'settings',
            title: 'Settings',
            subtitle: 'App preferences',
            icon: 'settings-outline',
            route: '/runner/profile/settings',
        },
    ];

    const handleLogout = () => {
        router.replace('/log_in');
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>

                <View style={styles.header}>
                    <View style={styles.avatarContainer}>
                        <Text style={styles.avatarText}>{userName.charAt(0)}</Text>
                    </View>
                    <Text style={styles.name}>{userName}</Text>
                    <Text style={styles.role}>Verified Runner</Text>
                </View>

                <View style={styles.menuContainer}>
                    {menuItems.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.menuItem}
                            onPress={() => router.push(item.route)}
                        >
                            <View style={styles.iconContainer}>
                                <Ionicons name={item.icon as any} size={24} color="#006400" />
                            </View>
                            <View style={styles.menuTextContainer}>
                                <Text style={styles.menuTitle}>{item.title}</Text>
                                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Ionicons name="log-out-outline" size={24} color="#800000" style={styles.logoutIcon} />
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F2F2F7' },
    scrollContent: { padding: 20 },
    header: {
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 20,
    },
    avatarContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#006400',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        elevation: 5,
    },
    avatarText: {
        color: '#FFF',
        fontSize: 32,
        fontWeight: 'bold',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
    role: {
        fontSize: 14,
        color: '#006400',
        marginTop: 5,
        fontWeight: 'bold',
    },
    menuContainer: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 20,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5EA',
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E8F5E9',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    menuTextContainer: {
        flex: 1,
    },
    menuTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    menuSubtitle: {
        fontSize: 12,
        color: '#8E8E93',
        marginTop: 2,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
        paddingVertical: 15,
        borderRadius: 12,
    },
    logoutIcon: {
        marginRight: 10,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#800000',
    },
});
