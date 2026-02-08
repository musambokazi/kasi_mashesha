import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useOrders } from '../context/OrderContext';


export default function History() {
    const router = useRouter();
    const { getOrdersByRole } = useOrders();
    const orders = getOrdersByRole('client');

    const handleOrderPress = (order: any) => {
        if (order.status !== 'Delivered' && order.status !== 'Cancelled') {
            router.push(`/client/track-order/${order.id}`);
        } else {
            // Can go to details or re-order
            router.push(`/store/orders/${order.id}`);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Order History</Text>
                </View>

                {orders.map((order) => (
                    <TouchableOpacity
                        key={order.id}
                        style={styles.orderCard}
                        onPress={() => handleOrderPress(order)}
                    >
                        <View style={styles.orderHeader}>
                            <Text style={styles.shopName}>{order.shopName}</Text>
                            <Text style={[
                                styles.statusBadge,
                                order.status === 'Delivered' ? styles.statusDelivered :
                                    (order.status === 'Cancelled' ? styles.statusCancelled : styles.statusProgress)
                            ]}>
                                {order.status}
                            </Text>
                        </View>
                        <View style={styles.orderDetails}>
                            <Text style={styles.orderDate}>{order.date}</Text>
                            <Text style={styles.orderTotal}>R {order.total}.00</Text>
                        </View>
                        <Text style={styles.orderId}>Order #{order.id}</Text>
                    </TouchableOpacity>
                ))}

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
    },
    orderCard: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        marginBottom: 15,
        elevation: 2,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    shopName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    statusBadge: {
        fontSize: 12,
        fontWeight: 'bold',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
        overflow: 'hidden',
    },
    statusDelivered: {
        backgroundColor: '#E8F5E9',
        color: '#006400',
    },
    statusProgress: {
        backgroundColor: '#FFF8E1',
        color: '#F57F17',
    },
    statusCancelled: {
        backgroundColor: '#FFEBEE',
        color: '#C62828',
    },
    orderDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    orderDate: {
        color: '#757575',
    },
    orderTotal: {
        fontWeight: 'bold',
        color: '#000080',
    },
    orderId: {
        fontSize: 12,
        color: '#9E9E9E',
    },
});
