import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter } from 'expo-router';
import LeafletMap from '../components/LeafletMap';
import { useCart } from '../../context/CartContext';

export default function LocationMap() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const isPicking = params.picking === 'true';
    const { setDeliveryAddress } = useCart();

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

    const handleConfirm = () => {
        const address = `Lat: ${selectedLocation.latitude.toFixed(4)}, Lng: ${selectedLocation.longitude.toFixed(4)}`;

        if (isPicking) {
            Alert.alert(
                "Confirmed!",
                "Your location has been successfully pinned. The driver will find you exactly here.",
                [
                    {
                        text: "Great",
                        onPress: () => {
                            setDeliveryAddress(address);
                            router.back();
                        }
                    }
                ]
            );
        } else {
            Alert.alert("Location Confirmed", `Address: ${address}`);
        }
    };

    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;

        setIsSearching(true);
        try {
            // Use OpenStreetMap Nominatim API
            // Important: Must provide a User-Agent as per Usage Policy
            const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&limit=1`, {
                headers: {
                    'User-Agent': 'KasiMasheshaApp/1.0'
                }
            });
            const data = await response.json();

            if (data && data.length > 0) {
                const result = data[0];
                const lat = parseFloat(result.lat);
                const lon = parseFloat(result.lon);

                const newLocation = { latitude: lat, longitude: lon };
                setSelectedLocation(newLocation);
            } else {
                Alert.alert("Location not found", "Please try a different address.");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Could not search for location.");
        } finally {
            setIsSearching(false);
        }
    };

    const handleMapPress = (coordinate: { latitude: number; longitude: number }) => {
        if (isPicking) {
            setSelectedLocation(coordinate);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />

            {/* Search Bar */}
            <View style={styles.searchBar}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder={isPicking ? "Search delivery address..." : "Search location..."}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        onSubmitEditing={handleSearch}
                        returnKeyType="search"
                    />
                    <TouchableOpacity onPress={handleSearch} style={styles.searchButton} disabled={isSearching}>
                        <Text style={styles.searchButtonText}>{isSearching ? '...' : '🔍'}</Text>
                    </TouchableOpacity>
                </View>
                {isPicking && <Text style={styles.hintText}>Or tap on map to pin</Text>}
            </View>

            <View style={styles.mapContainer}>
                <LeafletMap
                    initialRegion={initialRegion}
                    markers={markers}
                    onMapPress={handleMapPress}
                    mapCenter={selectedLocation}
                />
            </View>

            <View style={styles.footer}>
                <Text style={styles.addressLabel}>Selected Address</Text>
                <Text style={styles.addressValue}>Lat: {selectedLocation.latitude.toFixed(4)}, Lng: {selectedLocation.longitude.toFixed(4)}</Text>
                <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                    <Text style={styles.confirmButtonText}>
                        {isPicking ? 'CONFIRM DELIVERY LOCATION' : 'CONFIRM LOCATION'}
                    </Text>
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
        padding: 10,
        borderRadius: 10,
        elevation: 5,
        zIndex: 10,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    searchInput: {
        flex: 1,
        height: 40,
        backgroundColor: '#F0F0F0',
        borderRadius: 8,
        paddingHorizontal: 10,
        color: '#333',
    },
    searchButton: {
        marginLeft: 10,
        padding: 8,
        backgroundColor: '#E8F5E9',
        borderRadius: 8,
    },
    searchButtonText: {
        fontSize: 18,
    },
    hintText: {
        fontSize: 12,
        color: '#757575',
        marginTop: 5,
        textAlign: 'center',
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
