import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useOrders } from '../../context/OrderContext';

export default function RunnerHome() {
    const router = useRouter();
    const { getOrdersByRole } = useOrders();
    const [isOnline, setIsOnline] = useState(false);

    // Get orders that are Ready for Pickup or already assigned to this runner (if we had auth)
    const availableDeliveries = getOrdersByRole('runner');

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Delivery Hub</Text>
                    <Text style={styles.headerSubtitle}>Ready to move?</Text>
                </View>

                <View style={styles.statusCard}>
                    <Text style={styles.statusText}>{isOnline ? 'YOU ARE ONLINE' : 'YOU ARE OFFLINE'}</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#006400" }} // Dark Green
                        thumbColor={isOnline ? "#FFD700" : "#f4f3f4"} // Gold
                        onValueChange={() => setIsOnline(!isOnline)}
                        value={isOnline}
                    />
                </View>

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Available Deliveries</Text>
                </View>

                {isOnline ? (
                    availableDeliveries.length === 0 ? (
                        <Text style={{ textAlign: 'center', marginTop: 20, color: '#757575' }}>No deliveries available.</Text>
                    ) : (
                        availableDeliveries.map((order) => (
                            <View key={order.id} style={styles.deliveryCard}>
                                <View style={styles.deliveryHeader}>
                                    <Text style={styles.restaurantName}>{order.shopName}</Text>
                                    <Text style={styles.deliveryDistance}>2.5 km</Text>
                                </View>
                                <Text style={styles.deliveryAddress}>To: {order.customerName}</Text>
                                <Text style={styles.deliveryEarn}>Earn: R 25.00</Text>
                                <TouchableOpacity
                                    style={styles.acceptButton}
                                    onPress={() => router.push(`/runner/delivery/${order.id}`)}
                                >
                                    <Text style={styles.acceptButtonText}>
                                        {order.status === 'On the way' ? 'CONTINUE DELIVERY' : 'ACCEPT DELIVERY'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ))
                    )
                ) : (
                    <View style={styles.offlineState}>
                        <Text style={styles.offlineText}>Go online to see delivery requests.</Text>
                    </View>
                )}

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
    statusCard: {
        backgroundColor: '#F9F9F9',
        padding: 20,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    statusText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
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
    deliveryCard: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#000080', // Navy Blue
        elevation: 3,
        marginBottom: 15,
    },
    deliveryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    restaurantName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    deliveryDistance: {
        color: '#757575',
    },
    deliveryAddress: {
        fontSize: 16,
        color: '#555',
        marginBottom: 10,
    },
    deliveryEarn: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#006400', // Dark Green
        marginBottom: 15,
    },
    acceptButton: {
        backgroundColor: '#000080', // Navy Blue
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    acceptButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    offlineState: {
        padding: 40,
        alignItems: 'center',
    },
    offlineText: {
        color: '#999',
        fontStyle: 'italic',
    },
});
