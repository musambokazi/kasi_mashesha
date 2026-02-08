import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import { useCart } from '../../context/CartContext';

export default function Cart() {
    const router = useRouter();
    const { cartItems, getTotalAmount, clearCart, addToCart, removeFromCart } = useCart();

    const subtotal = getTotalAmount();
    const deliveryFee = cartItems.length > 0 ? 15 : 0;
    const total = subtotal + deliveryFee;

    const handleCheckout = () => {
        Alert.alert(
            "Confirm Order",
            `Your total is R ${total}.00. Proceed to checkout?`,
            [
                { text: "Cancel", style: "cancel" },
                { 
                    text: "Confirm", 
                    onPress: () => {
                        alert('Order Placed!');
                        clearCart();
                        router.push('/history');
                    } 
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                
                {/* HEADER WITH CLEAR OPTION */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Your Cart</Text>
                    {cartItems.length > 0 && (
                        <TouchableOpacity onPress={clearCart} style={styles.clearButton}>
                            <Ionicons name="trash-bin-outline" size={20} color="#800000" />
                            <Text style={styles.clearText}>Clear Cart</Text>
                        </TouchableOpacity>
                    )}
                </View>

                <View style={styles.cartItems}>
                    {cartItems.length === 0 ? (
                        <Text style={{ textAlign: 'center', color: '#757575', fontSize: 16, marginTop: 40 }}>
                            Your cart is empty.
                        </Text>
                    ) : (
                        cartItems.map((item) => (
                            <View key={item.id} style={styles.cartItem}>
                                
                                {/* REMOVE + ADD BUTTONS SIDE BY SIDE */}
                                <View style={styles.quantityControls}>
                                    <TouchableOpacity 
                                        onPress={() => item.quantity > 1 && removeFromCart(item.id)}
                                        style={styles.qtyBtn}
                                    >
                                        <Ionicons name="remove-circle-outline" size={28} color={item.quantity > 1 ? "#800000" : "#ccc"} />
                                    </TouchableOpacity>

                                    <TouchableOpacity 
                                        onPress={() => addToCart(item)}
                                        style={styles.qtyBtn}
                                    >
                                        <Ionicons name="add-circle-outline" size={28} color="#006400" />
                                    </TouchableOpacity>

                                    <Text style={styles.itemQty}>{item.quantity}</Text>
                                </View>

                                {/* ITEM DETAILS */}
                                <View style={styles.itemDetails}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.itemName}>{item.name}</Text>
                                        <Text style={styles.unitPrice}>R {item.price}.00 each</Text>
                                    </View>
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
                    <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
                        <Text style={styles.checkoutButtonText}>CHECKOUT (R {total}.00)</Text>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000080',
    },
    clearButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    clearText: {
        color: '#800000',
        marginLeft: 5,
        fontWeight: '600',
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
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    qtyBtn: {
        padding: 2,
    },
    itemQty: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 10,
    },
    itemDetails: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemName: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    unitPrice: {
        fontSize: 12,
        color: '#888',
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
        color: '#000080',
        fontSize: 20,
        fontWeight: 'bold',
    },
    grandTotalValue: {
        color: '#000080',
        fontSize: 20,
        fontWeight: 'bold',
    },
    checkoutButton: {
        backgroundColor: '#800000',
        paddingVertical: 18,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 3,
        marginBottom: 30,
    },
    checkoutButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
});
