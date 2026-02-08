import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function StoreHome() {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>My Spaza</Text>
                    <Text style={styles.headerSubtitle}>Manage your stock and orders</Text>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>12</Text>
                        <Text style={styles.statLabel}>Pending Orders</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>45</Text>
                        <Text style={styles.statLabel}>Items in Stock</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/store/add-product')}>
                    <Text style={styles.actionButtonText}>+ ADD NEW PRODUCT</Text>
                </TouchableOpacity>

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Recent Orders</Text>
                </View>

                {/* Mock Order */}
                <TouchableOpacity onPress={() => router.push('/store/orders/1023')}>
                    <View style={styles.orderCard}>
                        <Text style={styles.orderId}>Order #1023</Text>
                        <Text style={styles.orderStatus}>Pending</Text>
                        <Text style={styles.orderTotal}>R 250.00</Text>
                    </View>
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
    scrollContent: {
        padding: 20,
    },
    header: {
        marginTop: 20,
        marginBottom: 30,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000080', // Navy Blue
        marginBottom: 5,
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#757575',
    },
    statsContainer: {
        flexDirection: 'row',
        gap: 15,
        marginBottom: 30,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#F9F9F9',
        padding: 20,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#006400', // Dark Green
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#006400', // Dark Green
    },
    statLabel: {
        fontSize: 14,
        color: '#757575',
        marginTop: 5,
    },
    actionButton: {
        backgroundColor: '#800000', // Maroon
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 30,
        elevation: 3,
    },
    actionButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: 1,
    },
    sectionHeader: {
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
        paddingBottom: 10,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000080', // Navy Blue
    },
    orderCard: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    orderId: {
        fontWeight: 'bold',
        color: '#333',
    },
    orderStatus: {
        color: '#FFD700', // Gold/Yellow
        fontWeight: 'bold',
    },
    orderTotal: {
        fontWeight: 'bold',
        color: '#006400', // Dark Green
    },
});
