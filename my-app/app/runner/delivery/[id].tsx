import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import LeafletMap from '../../components/LeafletMap';
import { useOrders } from '../../../context/OrderContext';

export default function DeliveryDetails() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { orders, assignDriver, updateOrderStatus } = useOrders();

    const order = orders.find(o => o.id === id);

    if (!order) {
        return <View style={styles.container}><Text style={{ padding: 20 }}>Order not found</Text></View>;
    }

    const handleAction = () => {
        if (order.status === 'Ready for Pickup') {
            assignDriver(order.id, 'driver-1'); // Assume current user is driver-1
        } else if (order.status === 'On the way') {
            updateOrderStatus(order.id, 'Delivered');
            alert('Delivery Completed!');
            router.back();
        }
    };

    const actionText = order.status === 'Ready for Pickup' ? 'PICKUP ORDER' : 'COMPLETE DELIVERY';
    const status = order.status;

    // Mock Coordinates
    const shopLocation = { latitude: -26.2550, longitude: 28.4050 };
    const customerLocation = { latitude: -26.2300, longitude: 28.3800 };

    const initialRegion = {
        latitude: -26.2425,
        longitude: 28.3925,
        zoom: 12
    };

    const markers = [
        {
            latitude: shopLocation.latitude,
            longitude: shopLocation.longitude,
            title: order.shopName,
            icon: 'shop'
        },
        {
            latitude: customerLocation.latitude,
            longitude: customerLocation.longitude,
            title: order.customerName,
            icon: 'user'
        }
    ];

    const routeCoordinates = [shopLocation, customerLocation];

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />

            {/* Map View Integration */}
            <View style={styles.mapContainer}>
                <LeafletMap
                    initialRegion={initialRegion}
                    markers={markers}
                    routeCoordinates={routeCoordinates}
                />

                <View style={styles.mapOverlay}>
                    <Text style={styles.earningBadge}>Earn R 25.00</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Delivery #{id}</Text>
                    <Text style={styles.statusText}>{status}</Text>
                </View>

                <View style={styles.stepContainer}>
                    <View style={[styles.stepLine, status !== 'Ready for Pickup' && styles.stepLineActive]} />
                    <Text style={[styles.stepText, styles.stepTextActive]}>Accepted</Text>
                    <Text style={[styles.stepText, status !== 'Ready for Pickup' && styles.stepTextActive]}>Pick Up</Text>
                    <Text style={[styles.stepText, status === 'Delivered' && styles.stepTextActive]}>Drop Off</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardLabel}>PICK UP AT</Text>
                    <Text style={styles.locationName}>{order.shopName}</Text>
                    <Text style={styles.locationAddress}>12 Tambo St, Zone 4</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardLabel}>DELIVER TO</Text>
                    <Text style={styles.locationName}>{order.customerName}</Text>
                    <Text style={styles.locationAddress}>45 Mandela St, Soweto</Text>
                    <Text style={styles.contactInfo}>072 123 4567</Text>
                </View>

                <TouchableOpacity style={styles.actionButton} onPress={handleAction}>
                    <Text style={styles.actionButtonText}>{actionText}</Text>
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
    mapContainer: {
        height: 250,
        width: '100%',
        position: 'relative',
    },
    mapOverlay: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: 'rgba(255,255,255,0.9)',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 8,
    },
    scrollContent: {
        padding: 20,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        marginTop: -20,
        backgroundColor: '#FFFFFF',
        flex: 1,
    },
    header: {
        marginTop: 10,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000080', // Navy Blue
    },
    statusText: {
        color: '#757575',
        fontWeight: '600',
    },
    earningBadge: {
        color: '#006400', // Dark Green
        fontWeight: 'bold',
        fontSize: 14,
    },
    stepContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
        position: 'relative',
        paddingHorizontal: 10,
    },
    stepLine: {
        position: 'absolute',
        top: 10,
        left: 40,
        right: 40,
        height: 2,
        backgroundColor: '#E0E0E0',
        zIndex: -1,
    },
    stepLineActive: {
        backgroundColor: '#006400',
    },
    stepText: {
        color: '#757575',
        backgroundColor: '#FFF',
        paddingHorizontal: 5,
        fontSize: 12,
    },
    stepTextActive: {
        color: '#006400',
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: '#F9F9F9',
        padding: 20,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        marginBottom: 20,
    },
    cardLabel: {
        fontSize: 12,
        color: '#757575',
        fontWeight: 'bold',
        marginBottom: 5,
        letterSpacing: 1,
    },
    locationName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000080',
        marginBottom: 5,
    },
    locationAddress: {
        fontSize: 14,
        color: '#333',
    },
    contactInfo: {
        fontSize: 14,
        color: '#006400',
        marginTop: 5,
        fontWeight: '600',
    },
    actionButton: {
        backgroundColor: '#000080', // Navy Blue
        paddingVertical: 18,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 30,
        elevation: 5,
    },
    actionButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: 1,
    },
});
