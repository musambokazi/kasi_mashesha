import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCart } from '../../../context/CartContext';

export default function ShopDetails() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { addToCart, cartItems } = useCart();

    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const products = [
        { id: 1, name: 'Quarter Kota', price: 25, desc: 'Polony, Cheese, Chips, Atchar' },
        { id: 2, name: 'Full House Kota', price: 45, desc: 'Beef Patty, Egg, Cheese, Russian, Chips' },
        { id: 3, name: 'Cold Drink (330ml)', price: 12, desc: 'Coke / Fanta / Sprite' },
    ];

    const handleAddToCart = (item: any) => {
        addToCart({ ...item, quantity: 1 });
    };

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.headerTitle}>Vusi's Kota Joint</Text>
                        <Text style={styles.headerSubtitle}>Best Kotas in Town</Text>
                    </View>
                    <TouchableOpacity style={styles.cartButton} onPress={() => router.push('/client/cart')}>
                        <Text style={styles.cartButtonText}>Cart ({cartCount})</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.menuContainer}>
                    <Text style={styles.sectionTitle}>Menu</Text>
                    {products.map((item) => (
                        <View key={item.id} style={styles.productCard}>
                            <View style={styles.productInfo}>
                                <Text style={styles.productName}>{item.name}</Text>
                                <Text style={styles.productDesc}>{item.desc}</Text>
                                <Text style={styles.productPrice}>R {item.price}.00</Text>
                            </View>
                            <TouchableOpacity style={styles.addButton} onPress={() => handleAddToCart(item)}>
                                <Text style={styles.addButtonText}>ADD</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
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
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000080', // Navy Blue
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#757575',
    },
    cartButton: {
        backgroundColor: '#800000', // Maroon
        padding: 10,
        borderRadius: 8,
    },
    cartButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    menuContainer: {
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000080', // Navy Blue
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
        paddingBottom: 5,
    },
    productCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    productInfo: {
        flex: 1,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    productDesc: {
        color: '#757575',
        fontSize: 14,
        marginVertical: 4,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#006400', // Dark Green
    },
    addButton: {
        backgroundColor: '#006400', // Dark Green
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 6,
    },
    addButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 12,
    },
});
