import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput, FlatList, Keyboard, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter } from 'expo-router';
import LeafletMap from '../components/LeafletMap';
import { useCart } from '../../context/CartContext';
import CustomModal from '../components/CustomModal';

interface Suggestion {
    place_id: number;
    display_name: string;
    lat: string;
    lon: string;
}

export default function LocationMap() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const isPicking = params.picking === 'true';
    const { setDeliveryAddress, setTip, cartItems } = useCart();

    // Calculate subtotal for percentage calculation
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    // Tipping states
    const [selectedTipPercentage, setSelectedTipPercentage] = useState<number>(0);
    const [isCustomTip, setIsCustomTip] = useState(false);
    const [customTip, setCustomTip] = useState('');

    // Preset percentages
    const presetPercentages = [0, 5, 10, 15, 20];

    const [modalVisible, setModalVisible] = useState(false);
    const [successModalVisible, setSuccessModalVisible] = useState(false);

    const [selectedLocation, setSelectedLocation] = useState({
        latitude: -26.2343, // Soweto coordinates
        longitude: 27.8546,
    });
    const [selectedAddress, setSelectedAddress] = useState<string>("Locating...");

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

    // Reverse Geocoding Function
    const reverseGeocode = async (lat: number, lon: number) => {
        setSelectedAddress("Fetching address...");
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`, {
                headers: { 'User-Agent': 'KasiMasheshaApp/1.0' }
            });
            const data = await response.json();
            if (data && data.display_name) {
                // Formatting address to be shorter if needed, or use full
                const cleanAddress = data.display_name.split(',').slice(0, 3).join(',');
                setSelectedAddress(cleanAddress);
            } else {
                setSelectedAddress("Unknown Location");
            }
        } catch (error) {
            console.error("Reverse geocode error:", error);
            setSelectedAddress("Address not found");
        }
    };

    // Initial Reverse Geocode
    useEffect(() => {
        reverseGeocode(selectedLocation.latitude, selectedLocation.longitude);
    }, []);

    const handleConfirmPress = () => {
        setModalVisible(true);
    };

    const handleConfirmAction = () => {
        setModalVisible(false);
        const addressToSave = selectedAddress || `Lat: ${selectedLocation.latitude.toFixed(4)}, Lng: ${selectedLocation.longitude.toFixed(4)}`;

        if (isPicking) {
            setSuccessModalVisible(true);
        } else {
            Alert.alert("Location Confirmed", `Address: ${addressToSave}`);
        }
    };

    const handleSuccessClose = () => {
        setSuccessModalVisible(false);
        const addressToSave = selectedAddress || `Lat: ${selectedLocation.latitude.toFixed(4)}, Lng: ${selectedLocation.longitude.toFixed(4)}`;
        setDeliveryAddress(addressToSave);

        // Set the tip
        const finalTip = isCustomTip
            ? (parseFloat(customTip) || 0)
            : (subtotal * selectedTipPercentage / 100);
        setTip(finalTip);

        router.back();
    };

    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    // Debounce search
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchQuery.length > 2 && showSuggestions) {
                fetchSuggestions(searchQuery);
            } else if (searchQuery.length === 0) {
                setSuggestions([]);
            }
        }, 1000);
        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery, showSuggestions]);

    const fetchSuggestions = async (query: string) => {
        setIsSearching(true);
        try {
            // Added countrycodes=za for South Africa restriction
            const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=5&countrycodes=za`, {
                headers: { 'User-Agent': 'KasiMasheshaApp/1.0' }
            });
            const data = await response.json();
            setSuggestions(data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setIsSearching(false);
        }
    };

    const handleSelectSuggestion = (item: Suggestion) => {
        const lat = parseFloat(item.lat);
        const lon = parseFloat(item.lon);

        setSelectedLocation({ latitude: lat, longitude: lon });
        setSearchQuery(item.display_name);
        setSelectedAddress(item.display_name); // Use suggestion name directly
        setSuggestions([]);
        setShowSuggestions(false);
        Keyboard.dismiss();
    };

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;
        setShowSuggestions(false);

        setIsSearching(true);
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&limit=1&countrycodes=za`, {
                headers: { 'User-Agent': 'KasiMasheshaApp/1.0' }
            });
            const data = await response.json();

            if (data && data.length > 0) {
                const result = data[0];
                const lat = parseFloat(result.lat);
                const lon = parseFloat(result.lon);
                setSelectedLocation({ latitude: lat, longitude: lon });
                setSelectedAddress(result.display_name);
            } else {
                Alert.alert("Location not found", "Please try a different address in South Africa.");
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
            reverseGeocode(coordinate.latitude, coordinate.longitude);
            Keyboard.dismiss();
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />

            <CustomModal
                visible={modalVisible}
                title="Confirm Location"
                message={`Address:\n${selectedAddress}`}
                onConfirm={handleConfirmAction}
                onCancel={() => setModalVisible(false)}
                confirmText="Confirm Location"
                icon="location"
            />

            <CustomModal
                visible={successModalVisible}
                title="Location Pinned!"
                message="The driver will find you exactly here."
                onConfirm={handleSuccessClose}
                confirmText="Great"
                type="success"
            />

            {/* Unified Search Container */}
            <View style={styles.searchContainer}>
                <View style={styles.searchWrapper}>
                    <View style={styles.inputRow}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder={isPicking ? "Search delivery address..." : "Search location..."}
                            value={searchQuery}
                            onChangeText={(text) => {
                                setSearchQuery(text);
                                setShowSuggestions(true);
                            }}
                            onSubmitEditing={handleSearch}
                            returnKeyType="search"
                        />
                        <TouchableOpacity onPress={handleSearch} style={styles.searchButton} disabled={isSearching}>
                            {isSearching ? <ActivityIndicator size="small" color="#000" /> : <Text style={styles.searchIcon}>🔍</Text>}
                        </TouchableOpacity>
                    </View>

                    {/* Suggestions List inside the same wrapper */}
                    {showSuggestions && suggestions.length > 0 && (
                        <View style={styles.suggestionsList}>
                            <FlatList
                                data={suggestions}
                                keyExtractor={(item) => item.place_id.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.suggestionItem}
                                        onPress={() => handleSelectSuggestion(item)}
                                    >
                                        <Text style={styles.suggestionText} numberOfLines={2}>{item.display_name}</Text>
                                    </TouchableOpacity>
                                )}
                                keyboardShouldPersistTaps="handled"
                                ItemSeparatorComponent={() => <View style={styles.separator} />}
                            />
                        </View>
                    )}
                </View>
            </View>

            {isPicking && <Text style={styles.hintText}>Or tap on map to pin</Text>}

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
                <Text style={styles.addressValue} numberOfLines={2}>{selectedAddress}</Text>

                {isPicking && (
                    <View style={styles.tippingContainer}>
                        <Text style={styles.tippingTitle}>Add a Tip for Driver</Text>
                        <View style={styles.tipOptionsRow}>
                            {presetPercentages.map((percentage) => {
                                const tipAmount = (subtotal * percentage) / 100;
                                return (
                                    <TouchableOpacity
                                        key={percentage}
                                        style={[
                                            styles.tipButton,
                                            !isCustomTip && selectedTipPercentage === percentage && styles.tipButtonSelected
                                        ]}
                                        onPress={() => {
                                            setIsCustomTip(false);
                                            setSelectedTipPercentage(percentage);
                                            setCustomTip('');
                                        }}
                                    >
                                        <Text style={[
                                            styles.tipButtonText,
                                            !isCustomTip && selectedTipPercentage === percentage && styles.tipButtonTextSelected
                                        ]}>
                                            {percentage === 0 ? 'None' : `${percentage}% (R${tipAmount.toFixed(0)})`}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            })}
                            <TouchableOpacity
                                style={[styles.tipButton, isCustomTip && styles.tipButtonSelected]}
                                onPress={() => {
                                    setIsCustomTip(true);
                                    setSelectedTipPercentage(0);
                                }}
                            >
                                <Text style={[styles.tipButtonText, isCustomTip && styles.tipButtonTextSelected]}>Custom</Text>
                            </TouchableOpacity>
                        </View>

                        {isCustomTip && (
                            <View style={styles.customTipContainer}>
                                <Text style={styles.currencyPrefix}>R</Text>
                                <TextInput
                                    style={styles.customTipInput}
                                    placeholder="0.00"
                                    keyboardType="numeric"
                                    value={customTip}
                                    onChangeText={setCustomTip}
                                />
                            </View>
                        )}

                        <Text style={styles.summaryText}>
                            Tip Amount: R{isCustomTip
                                ? (parseFloat(customTip) || 0).toFixed(2)
                                : ((subtotal * selectedTipPercentage) / 100).toFixed(2)}
                        </Text>
                    </View>
                )}

                <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmPress}>
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
        marginBottom: 180,
    },
    searchContainer: {
        position: 'absolute',
        top: 50,
        left: 20,
        right: 20,
        zIndex: 10,
    },
    searchWrapper: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        overflow: 'hidden', // Ensures everything stays inside rounded corners
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
    },
    searchInput: {
        flex: 1,
        height: 45,
        backgroundColor: 'transparent',
        paddingHorizontal: 15,
        fontSize: 16,
        color: '#333',
    },
    searchButton: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchIcon: {
        fontSize: 18,
    },
    suggestionsList: {
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        maxHeight: 200,
    },
    suggestionItem: {
        paddingVertical: 12,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
    },
    suggestionText: {
        fontSize: 14,
        color: '#333',
    },
    separator: {
        height: 1,
        backgroundColor: '#F0F0F0',
    },
    hintText: {
        position: 'absolute',
        top: 110, // Below search bar
        width: '100%',
        fontSize: 12,
        color: '#555',
        textAlign: 'center',
        zIndex: 5,
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingVertical: 4,
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
        minHeight: 40, // Ensure space even while loading
    },
    confirmButton: {
        backgroundColor: '#006400',
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
