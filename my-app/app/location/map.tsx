import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import LeafletMap from '../components/LeafletMap';

export default function LocationMap() {
    const [selectedLocation, setSelectedLocation] = useState({
        latitude: -26.2343, // Soweto coordinates
        longitude: 27.8546,
    });

    const initialRegion = {
        latitude: -26.2343,
        longitude: 27.8546,
        zoom: 13
    };

    const markers = [
        {
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude,
            title: "Selected Location",
        }
    ];

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />

            {/* Search Bar Mock */}
            <View style={styles.searchBar}>
                <Text style={styles.searchText}>45 Mandela St, Soweto</Text>
            </View>

            <View style={styles.mapContainer}>
                <LeafletMap
                    initialRegion={initialRegion}
                    markers={markers}
                />
            </View>

            <View style={styles.footer}>
                <Text style={styles.addressLabel}>Selected Address</Text>
                <Text style={styles.addressValue}>Lat: {selectedLocation.latitude.toFixed(4)}, Lng: {selectedLocation.longitude.toFixed(4)}</Text>
                <TouchableOpacity style={styles.confirmButton} onPress={() => Alert.alert("Location Confirmed")}>
                    <Text style={styles.confirmButtonText}>CONFIRM LOCATION</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    mapContainer: {
        flex: 1,
        marginBottom: 180, // Space for footer
    },
    searchBar: {
        position: 'absolute',
        top: 50,
        left: 20,
        right: 20,
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 10,
        elevation: 5,
        zIndex: 10,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    searchText: {
        color: '#333',
        fontWeight: '600',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 180,
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        elevation: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    addressLabel: {
        color: '#757575',
        fontSize: 14,
        marginBottom: 5,
    },
    addressValue: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    confirmButton: {
        backgroundColor: '#006400', // Dark Green
        paddingVertical: 18,
        borderRadius: 12,
        alignItems: 'center',
    },
    confirmButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: 1,
    },
});
