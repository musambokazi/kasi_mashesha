import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, Animated } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

export default function TrackOrder() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [status, setStatus] = useState('Preparing'); // Preparing, Picked Up, On the way, Arriving
    const [progress, setProgress] = useState(0.2);
    const [eta, setEta] = useState(15);

    // Animation for car movement
    const [carPosition] = useState(new Animated.Value(0));

    useEffect(() => {
        // Simulate Status Updates
        const statusIdx = 0;
        const statuses = ['Preparing', 'Picked Up', 'On the way', 'Arriving', 'Delivered'];

        let currentStep = 0;

        const interval = setInterval(() => {
            if (currentStep < statuses.length - 1) {
                currentStep++;
                setStatus(statuses[currentStep]);
                setProgress((currentStep + 1) / statuses.length);
                setEta(prev => Math.max(0, prev - 4));

                // Move car
                Animated.timing(carPosition, {
                    toValue: currentStep * 50, // Move 50 units per step
                    duration: 2000,
                    useNativeDriver: true,
                }).start();

            } else {
                clearInterval(interval);
            }
        }, 4000); // Update every 4 seconds for demo

        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />

            {/* Map Area Mock */}
            <View style={styles.mapArea}>
                <View style={styles.gridLineVertical} />
                <View style={styles.gridLineHorizontal} />

                {/* Route Line */}
                <View style={styles.routeLine} />

                {/* Shop Location */}
                <View style={[styles.pin, styles.shopPin]}>
                    <Text style={styles.pinText}>🏪</Text>
                </View>

                {/* User Location */}
                <View style={[styles.pin, styles.userPin]}>
                    <Text style={styles.pinText}>🏠</Text>
                </View>

                {/* Moving Car */}
                <Animated.View style={[styles.carMarker, { transform: [{ translateY: carPosition }, { translateX: carPosition }] }]}>
                    <Text style={{ fontSize: 24 }}>🚗</Text>
                </Animated.View>
            </View>

            {/* Driver Card & Status */}
            <View style={styles.bottomSheet}>
                <View style={styles.handle} />

                <View style={styles.statusHeader}>
                    <View>
                        <Text style={styles.etaText}>{status === 'Delivered' ? 'Arrived!' : `${eta} mins`}</Text>
                        <Text style={styles.statusText}>{status} order...</Text>
                    </View>
                    <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
                    </View>
                </View>

                <View style={styles.driverCard}>
                    <View style={styles.driverInfo}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>S</Text>
                        </View>
                        <View>
                            <Text style={styles.driverName}>Sipho</Text>
                            <Text style={styles.driverVehicle}>Honda PCX • Silver</Text>
                            <Text style={styles.driverRating}>⭐ 4.9 (124 deliveries)</Text>
                        </View>
                    </View>
                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.callButton}>
                            <Text style={styles.iconText}>📞</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.messageButton}>
                            <Text style={styles.iconText}>💬</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
                    <Text style={styles.cancelButtonText}>{status === 'Delivered' ? 'RATE DELIVERY' : 'CANCEL ORDER'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E3F2FD',
    },
    mapArea: {
        flex: 1,
        paddingTop: 50,
    },
    gridLineVertical: {
        position: 'absolute',
        width: 2,
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        left: '50%',
    },
    gridLineHorizontal: {
        position: 'absolute',
        height: 2,
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        top: '40%',
    },
    routeLine: {
        position: 'absolute',
        top: 120,
        left: 80,
        width: 200,
        height: 200,
        borderLeftWidth: 4,
        borderBottomWidth: 4,
        borderColor: '#000080', // Navy Blue Route
        borderRadius: 20,
        transform: [{ rotate: '45deg' }],
        opacity: 0.3,
    },
    pin: {
        position: 'absolute',
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#FFF',
        elevation: 5,
    },
    shopPin: {
        top: 100,
        left: 50,
    },
    userPin: {
        top: 350,
        right: 50,
    },
    pinText: {
        fontSize: 20,
    },
    carMarker: {
        position: 'absolute',
        top: 100,
        left: 50,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    bottomSheet: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: 20,
        elevation: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        minHeight: 320,
    },
    handle: {
        width: 40,
        height: 4,
        backgroundColor: '#E0E0E0',
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: 20,
    },
    statusHeader: {
        marginBottom: 25,
    },
    etaText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    statusText: {
        fontSize: 16,
        color: '#757575',
        marginBottom: 10,
    },
    progressBar: {
        height: 4,
        backgroundColor: '#F0F0F0',
        borderRadius: 2,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#006400', // Dark Green
    },
    driverCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
        backgroundColor: '#F9F9F9',
        padding: 15,
        borderRadius: 15,
    },
    driverInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#000080',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    avatarText: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
    driverName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    driverVehicle: {
        color: '#757575',
        fontSize: 14,
    },
    driverRating: {
        color: '#F57F17',
        fontSize: 12,
        marginTop: 2,
        fontWeight: 'bold',
    },
    actions: {
        flexDirection: 'row',
        gap: 10,
    },
    callButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E8F5E9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    messageButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E3F2FD',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconText: {
        fontSize: 18,
    },
    cancelButton: {
        width: '100%',
        paddingVertical: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#333',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
