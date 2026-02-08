import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useOrders } from '../../../context/OrderContext';

export default function OrderDetails() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { orders, updateOrderStatus } = useOrders();

    const order = orders.find(o => o.id === id);

    if (!order) {
        return <View style={styles.container}><Text style={{ padding: 20 }}>Order not found</Text></View>;
    }

    const handleAccept = () => {
        updateOrderStatus(order.id, 'Preparing');
        router.back();
    };

    const handleReady = () => {
        updateOrderStatus(order.id, 'Ready for Pickup');
        router.back();
    };

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Order #{id}</Text>
                    <Text style={styles.statusBadge}>{order.status.toUpperCase()}</Text>
                </View>

                <View style={styles.customerCard}>
                    <Text style={styles.cardTitle}>Customer</Text>
                    <Text style={styles.customerName}>{order.customerName}</Text>
                    <Text style={styles.customerPhone}>072 123 4567</Text>
                    <Text style={styles.customerAddress}>45 Mandela St, Soweto</Text>
                </View>

                <View style={styles.itemsCard}>
                    <Text style={styles.cardTitle}>Items</Text>
                    {order.items.map((item) => (
                        <View key={item.id} style={styles.itemRow}>
                            <Text style={styles.itemQty}>{item.quantity}x</Text>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemPrice}>R {item.price * item.quantity}.00</Text>
                        </View>
                    ))}
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalValue}>R {order.total}.00</Text>
                    </View>
                </View>

                <View style={styles.actionButtons}>
                    {order.status === 'Pending' && (
                        <>
                            <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
                                <Text style={styles.buttonText}>ACCEPT ORDER</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.rejectButton} onPress={() => router.back()}>
                                <Text style={styles.buttonText}>REJECT</Text>
                            </TouchableOpacity>
                        </>
                    )}

                    {order.status === 'Preparing' && (
                        <TouchableOpacity style={styles.acceptButton} onPress={handleReady}>
                            <Text style={styles.buttonText}>MARK READY FOR PICKUP</Text>
                        </TouchableOpacity>
                    )}
                </View>

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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000080', // Navy Blue
    },
    statusBadge: {
        backgroundColor: '#FFD700', // Gold
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 15,
        fontWeight: 'bold',
        color: '#4B0082',
        overflow: 'hidden',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000080',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
        paddingBottom: 5,
    },
    customerCard: {
        backgroundColor: '#F9F9F9',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    customerName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    customerPhone: {
        color: '#757575',
        marginVertical: 2,
    },
    customerAddress: {
        color: '#555',
    },
    itemsCard: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        marginBottom: 30,
        elevation: 2,
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    itemQty: {
        fontWeight: 'bold',
        color: '#006400', // Dark Green
        marginRight: 10,
        width: 25,
    },
    itemName: {
        flex: 1,
        color: '#333',
    },
    itemPrice: {
        fontWeight: '600',
        color: '#333',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#EEEEEE',
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000080',
    },
    totalValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000080',
    },
    actionButtons: {
        gap: 15,
    },
    acceptButton: {
        backgroundColor: '#006400', // Dark Green
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    rejectButton: {
        backgroundColor: '#800000', // Maroon
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
