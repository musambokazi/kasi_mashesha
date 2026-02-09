import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import LeafletMap from '../../components/LeafletMap';

const { width } = Dimensions.get('window');

// Springs Coordinates
const SPRINGS_COORDS = {
    latitude: -26.2500,
    longitude: 28.4000,
    zoom: 13
};

export default function TrackOrder() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [status, setStatus] = useState('Preparing');
    const [progress, setProgress] = useState(0.2);
    const [eta, setEta] = useState(15);

    // Mock Driver Location (Starting near Springs)
    const [driverLoc, setDriverLoc] = useState({ latitude: -26.2550, longitude: 28.4050 });

    useEffect(() => {
        // Simulate Status Updates && Driver Movement
        const statuses = ['Preparing', 'Picked Up', 'On the way', 'Arriving', 'Delivered'];
        let currentStep = 0;

        const interval = setInterval(() => {
            if (currentStep < statuses.length - 1) {
                currentStep++;
                setStatus(statuses[currentStep]);
                setProgress((currentStep + 1) / statuses.length);
                setEta(prev => Math.max(0, prev - 4));

                // Move driver slightly towards "User" (Mock User at -26.2400, 28.3900)
                setDriverLoc(prev => ({
                    latitude: prev.latitude + 0.0030,
                    longitude: prev.longitude - 0.0030,
                }));

            } else {
                clearInterval(interval);
            }
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    const markers = [
        {
            latitude: -26.2550,
            longitude: 28.4050,
            title: "Vusi's Kota Joint (Shop)",
            icon: 'shop'
        },
        {
            latitude: -26.2300,
            longitude: 28.3800,
            title: "My Home",
            icon: 'user'
        },
        {
            latitude: driverLoc.latitude,
            longitude: driverLoc.longitude,
            title: "Sipho (Runner)",
            icon: 'car'
        }
    ];

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />

            {/* Real Map with Springs Focus */}
            <View style={styles.mapArea}>
                <LeafletMap
                    initialRegion={SPRINGS_COORDS}
                    markers={markers}
                />
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
        marginBottom: 320, // Reserve space for bottom sheet
    },
    bottomSheet: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: 20,
        elevation: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        height: 320,
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
