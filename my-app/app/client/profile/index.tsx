import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '../../../context/UserContext';

export default function ClientProfileMenu() {
    const router = useRouter();
    const { userData, logout } = useUser();

    const menuItems = [
        {
            id: 'edit',
            title: 'Edit Profile',
            subtitle: 'Update your personal details',
            icon: 'person-outline',
            route: '/client/profile/edit',
        },
        {
            id: 'settings',
            title: 'Settings',
            subtitle: 'Notifications, Password, Theme',
            icon: 'settings-outline',
            route: '/client/profile/settings',
        },
        {
            id: 'support',
            title: 'Help & Support',
            subtitle: 'FAQ, Contact Us',
            icon: 'help-circle-outline',
            route: '/client/profile/support',
        },
    ];

    const handleLogout = () => {
        logout();
        router.replace('/log_in');
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Header Profile Summary */}
                <View style={styles.header}>
                    <View style={styles.avatarContainer}>
                        <Text style={styles.avatarText}>{userData.name.charAt(0)}</Text>
                    </View>
                    <Text style={styles.name}>{userData.name}</Text>
                    <Text style={styles.email}>{userData.email}</Text>
                </View>

                {/* Menu Items */}
                <View style={styles.menuContainer}>
                    {menuItems.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.menuItem}
                            onPress={() => router.push(item.route)}
                        >
                            <View style={styles.iconContainer}>
                                <Ionicons name={item.icon as any} size={24} color="#000080" />
                            </View>
                            <View style={styles.menuTextContainer}>
                                <Text style={styles.menuTitle}>{item.title}</Text>
                                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Logout Button */}
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
        backgroundColor: '#000080',
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
    email: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
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
        backgroundColor: '#F0F0F5',
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
