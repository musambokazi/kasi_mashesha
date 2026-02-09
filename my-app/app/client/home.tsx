import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function ClientHome() {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <View style={styles.headerTop}>
                        <View>
                            <Text style={styles.headerTitle}>Kasi Shops</Text>
                            <Text style={styles.headerSubtitle}>Order from your local favorities</Text>
                        </View>
                        <TouchableOpacity style={styles.profileButton} onPress={() => router.push('/client/profile')}>
                            <Text style={styles.profileButtonText}>Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Mock Content */}
                <TouchableOpacity onPress={() => router.push('/client/shop/1')}>
                    <View style={styles.shopCard}>
                        <View style={styles.shopImagePlaceholder} />
                        <View style={styles.shopInfo}>
                            <Text style={styles.shopName}>Mama Rose's Spaza</Text>
                            <Text style={styles.shopDetails}>Groceries • 0.5km away</Text>
                            <TouchableOpacity style={styles.orderButton} onPress={() => router.push('/client/shop/1')}>
                                <Text style={styles.orderButtonText}>ORDER NOW</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>

                <View style={styles.shopCard}>
                    <View style={styles.shopImagePlaceholder} />
                    <View style={styles.shopInfo}>
                        <Text style={styles.shopName}>Vusi's Kota Joint</Text>
                        <Text style={styles.shopDetails}>Fast Food • 1.2km away</Text>
                        <TouchableOpacity style={styles.orderButton}>
                            <Text style={styles.orderButtonText}>ORDER NOW</Text>
                        </TouchableOpacity>
                    </View>
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
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    profileButton: {
        backgroundColor: '#000080',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
    profileButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 12,
    },
    shopCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        overflow: 'hidden',
    },
    shopImagePlaceholder: {
        height: 150,
        backgroundColor: '#F5F5F5', // Placeholder grey
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },
    shopInfo: {
        padding: 15,
    },
    shopName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000080', // Navy Blue
        marginBottom: 5,
    },
    shopDetails: {
        fontSize: 14,
        color: '#757575',
        marginBottom: 15,
    },
    orderButton: {
        backgroundColor: '#006400', // Dark Green
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    orderButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 14,
    },
});
