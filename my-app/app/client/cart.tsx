import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { useCart } from '../../context/CartContext';

export default function Cart() {
    const router = useRouter();
    const { cartItems, getTotalAmount, clearCart } = useCart();

    const subtotal = getTotalAmount();
    const deliveryFee = 15;
    const total = subtotal + deliveryFee;

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Your Cart</Text>
                </View>

                <View style={styles.cartItems}>
                    {cartItems.length === 0 ? (
                        <Text style={{ textAlign: 'center', color: '#757575', fontSize: 16 }}>Your cart is empty.</Text>
                    ) : (
                        cartItems.map((item) => (
                            <View key={item.id} style={styles.cartItem}>
                                <Text style={styles.itemQty}>{item.quantity}x</Text>
                                <View style={styles.itemDetails}>
                                    <Text style={styles.itemName}>{item.name}</Text>
                                    <Text style={styles.itemPrice}>R {item.price * item.quantity}.00</Text>
                                </View>
                            </View>
                        ))
                    )}
                </View>

                {cartItems.length > 0 && (
                    <View style={styles.totalSection}>
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Subtotal</Text>
                            <Text style={styles.totalValue}>R {subtotal}.00</Text>
                        </View>
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Delivery Fee</Text>
                            <Text style={styles.totalValue}>R {deliveryFee}.00</Text>
                        </View>
                        <View style={[styles.totalRow, styles.grandTotal]}>
                            <Text style={styles.grandTotalLabel}>Total</Text>
                            <Text style={styles.grandTotalValue}>R {total}.00</Text>
                        </View>

                        <TouchableOpacity onPress={() => router.push('/location/map')} style={{ marginTop: 15 }}>
                            <Text style={{ color: '#006400', fontWeight: 'bold', textAlign: 'center' }}>📍 Set Delivery Location</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {cartItems.length > 0 && (
                    <TouchableOpacity style={styles.checkoutButton} onPress={() => { alert('Order Placed!'); clearCart(); router.push('/history'); }}>
                        <Text style={styles.checkoutButtonText}>CHECKOUT</Text>
                    </TouchableOpacity>
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
    },
    cartItems: {
        marginBottom: 30,
    },
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    itemQty: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#006400', // Dark Green
        marginRight: 15,
        width: 30,
    },
    itemDetails: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemName: {
        fontSize: 16,
        color: '#333',
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    totalSection: {
        backgroundColor: '#F9F9F9',
        padding: 20,
        borderRadius: 15,
        marginBottom: 30,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    totalLabel: {
        color: '#757575',
        fontSize: 16,
    },
    totalValue: {
        color: '#333',
        fontSize: 16,
        fontWeight: '600',
    },
    grandTotal: {
        marginTop: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    grandTotalLabel: {
        color: '#000080', // Navy Blue
        fontSize: 20,
        fontWeight: 'bold',
    },
    grandTotalValue: {
        color: '#000080',
        fontSize: 20,
        fontWeight: 'bold',
    },
    checkoutButton: {
        backgroundColor: '#800000', // Maroon
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 3,
    },
    checkoutButtonText: {
        color: '#FFFFFF', // White
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
});
