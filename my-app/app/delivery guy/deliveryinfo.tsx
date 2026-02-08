import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView 
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

// TypeScript Interfaces
interface Location {
  latitude: number;
  longitude: number;
}

const DeliveryManagementScreen = () => {
  // 1. STATE MANAGEMENT
  const [driverLocation] = useState<Location>({ latitude: -26.2041, longitude: 28.0473 }); // Example: Joburg
  const [dropOffLocation] = useState<Location>({ latitude: -26.2091, longitude: 28.0500 });
  const [driverNotes, setDriverNotes] = useState<string>('');
  const [isFinalizing, setIsFinalizing] = useState<boolean>(false);

  // 2. THE "ASK BEFORE FINALIZING" LOGIC
  const handleFinalizePress = () => {
    if (!driverNotes.trim()) {
      Alert.alert("Missing Info", "Please add a delivery note for the driver first.");
      return;
    }

    Alert.alert(
      "Confirm Delivery",
      "Are you sure you want to finalize this drop-off location and send instructions?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Finalize", 
          onPress: () => submitDeliveryDetails(),
          style: "default" 
        }
      ]
    );
  };

  // 3. DATA SUBMISSION
  const submitDeliveryDetails = async () => {
    setIsFinalizing(true);
    try {
      // Logic to send driverNotes and dropOffLocation to your backend
      console.log("Submitting:", { driverNotes, dropOffLocation });
      
      // Simulate API delay
      setTimeout(() => {
        Alert.alert("Success", "Delivery is set! The driver has been notified.");
        setIsFinalizing(false);
      }, 1500);
    } catch (error) {
      Alert.alert("Error", "Failed to save delivery details.");
      setIsFinalizing(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      {/* MAP SECTION */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            ...dropOffLocation,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker coordinate={driverLocation} title="Driver" pinColor="blue" />
          <Marker coordinate={dropOffLocation} title="Drop-off" />
          <Polyline 
            coordinates={[driverLocation, dropOffLocation]} 
            strokeWidth={3} 
            strokeColor="green" 
          />
        </MapView>
      </View>

      {/* INPUT & ACTION SECTION */}
      <ScrollView style={styles.detailsContainer}>
        <Text style={styles.header}>Delivery Details</Text>
        
        <Text style={styles.label}>Drop-off Instructions</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Gate code 1234, please don't ring the bell..."
          multiline
          numberOfLines={4}
          value={driverNotes}
          onChangeText={setDriverNotes}
          editable={!isFinalizing}
        />

        <TouchableOpacity 
          style={[styles.button, isFinalizing && styles.buttonDisabled]} 
          onPress={handleFinalizePress}
          disabled={isFinalizing}
        >
          <Text style={styles.buttonText}>
            {isFinalizing ? "Processing..." : "Finalize Delivery"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  mapContainer: { height: '50%', width: '100%' },
  map: { ...StyleSheet.absoluteFillObject },
  detailsContainer: { padding: 20 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  label: { fontSize: 14, color: '#666', marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    height: 100,
    textAlignVertical: 'top',
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF8C00', // Mr D Orange
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonDisabled: { backgroundColor: '#ccc' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
});

export default DeliveryManagementScreen;