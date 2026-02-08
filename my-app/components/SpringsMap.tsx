import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

// Springs, Gauteng Coordinates
const SPRINGS_REGION = {
    latitude: -26.2500,
    longitude: 28.4000,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
};

interface SpringsMapProps {
    showUserLocation?: boolean;
    markers?: Array<{
        id: string;
        latitude: number;
        longitude: number;
        title: string;
        description?: string;
        image?: any; // For custom markers
    }>;
}

export default function SpringsMap({ showUserLocation = false, markers = [] }: SpringsMapProps) {
    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={SPRINGS_REGION}
                showsUserLocation={showUserLocation}
            >
                {/* Base Location Marker - Springs */}
                <Marker
                    coordinate={{ latitude: -26.2500, longitude: 28.4000 }}
                    title="Kasi Mashesha HQ"
                    description="Springs, Gauteng"
                    pinColor="navy"
                />

                {/* Dynamic Markers */}
                {markers.map((marker) => (
                    <Marker
                        key={marker.id}
                        coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                        title={marker.title}
                        description={marker.description}
                    >
                        {marker.image && marker.image}
                    </Marker>
                ))}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
    },
});
