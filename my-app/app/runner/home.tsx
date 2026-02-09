import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useOrders } from '../../context/OrderContext';

export default function RunnerHome() {
    const router = useRouter();
    const { getOrdersByRole } = useOrders();

    // Get orders that are Ready for Pickup or already assigned to this runner
    const availableDeliveries = getOrdersByRole('runner');

    // Calculate simulated earnings (mock)
    const todayEarnings = 450;
    const completedTrips = 12;

    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            {/* Header / Dashboard Summary */}
            <View style={styles.dashboardHeader}>
                <View>
                    <Text style={styles.greeting}>Hello, Runner</Text>
                    <Text style={styles.date}>{new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short' })}</Text>
                </View>
                <TouchableOpacity style={styles.profileIcon} onPress={() => router.push('/runner/profile')}>
                    <Text style={styles.profileText}>R</Text>
                </TouchableOpacity>
            </View>

            {/* Earnings Card */}
            <View style={styles.earningsCard}>
                <View style={styles.earningsInfo}>
                    <Text style={styles.earningsLabel}>Today's Earnings</Text>
                    <Text style={styles.earningsValue}>R {todayEarnings}.00</Text>
                </View>
                <View style={styles.tripInfo}>
                    <Text style={styles.tripCount}>{completedTrips}</Text>
                    <Text style={styles.tripLabel}>Trips</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>New Requests ({availableDeliveries.length})</Text>
                </View>

                {availableDeliveries.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyTitle}>No deliveries yet</Text>
                        <Text style={styles.emptySubtitle}>Stay tuned! New orders will appear here.</Text>
                    </View>
                ) : (
                    availableDeliveries.map((order) => (
                        <View key={order.id} style={styles.deliveryCard}>
                            <View style={styles.deliveryHeader}>
                                <View style={styles.badgeContainer}>
                                    <Text style={styles.badgeText}>NEW REQUEST</Text>
                                </View>
                                <Text style={styles.deliveryEarn}>R 25.00</Text>
                            </View>

                            <View style={styles.routeContainer}>
                                <View style={styles.routePoint}>
                                    <View style={[styles.dot, styles.pickupDot]} />
                                    <View style={styles.addressContainer}>
                                        <Text style={styles.routeLabel}>PICK UP</Text>
                                        <Text style={styles.restaurantName}>{order.shopName}</Text>
                                        <Text style={styles.distanceText}>2.5 km away</Text>
                                    </View>
                                </View>
                                <View style={styles.routeLine} />
                                <View style={styles.routePoint}>
                                    <View style={[styles.dot, styles.dropoffDot]} />
                                    <View style={styles.addressContainer}>
                                        <Text style={styles.routeLabel}>DROP OFF</Text>
                                        <Text style={styles.customerName}>{order.customerName}</Text>
                                        <Text style={styles.distanceText}>4.2 km trip</Text>
                                    </View>
                                </View>
                            </View>

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
                )}

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    dashboardHeader: {
        backgroundColor: '#006400', // Dark Green
        paddingTop: 60,
        paddingBottom: 80,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    date: {
        color: 'rgba(255, 255, 255, 0.8)',
        marginTop: 5,
        fontSize: 14,
    },
    profileIcon: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    profileText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 20,
    },
    earningsCard: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        marginTop: -40,
        borderRadius: 15,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    earningsInfo: {
        flex: 1,
    },
    earningsLabel: {
        color: '#757575',
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    earningsValue: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 5,
    },
    tripInfo: {
        alignItems: 'center',
        borderLeftWidth: 1,
        borderLeftColor: '#EEEEEE',
        paddingLeft: 20,
    },
    tripCount: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#006400',
    },
    tripLabel: {
        color: '#757575',
        fontSize: 12,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    sectionHeader: {
        marginBottom: 15,
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    emptyState: {
        alignItems: 'center',
        padding: 40,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 20,
    },
    emptySubtitle: {
        color: '#757575',
        textAlign: 'center',
        marginTop: 10,
    },
    deliveryCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        elevation: 2,
    },
    deliveryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    badgeContainer: {
        backgroundColor: '#E8F5E9',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    badgeText: {
        color: '#006400',
        fontWeight: 'bold',
        fontSize: 10,
    },
    deliveryEarn: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    routeContainer: {
        marginBottom: 20,
    },
    routePoint: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginTop: 5,
        marginRight: 15,
    },
    pickupDot: {
        backgroundColor: '#333',
    },
    dropoffDot: {
        backgroundColor: '#006400',
    },
    routeLine: {
        width: 2,
        height: 30,
        backgroundColor: '#E0E0E0',
        marginLeft: 5,
        marginVertical: 5,
    },
    addressContainer: {
        flex: 1,
    },
    routeLabel: {
        fontSize: 10,
        color: '#999',
        fontWeight: 'bold',
        marginBottom: 2,
    },
    restaurantName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    customerName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    distanceText: {
        color: '#757575',
        fontSize: 12,
        marginTop: 2,
    },
    acceptButton: {
        backgroundColor: '#000080', // Navy Blue
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    acceptButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: 1,
    },
});
