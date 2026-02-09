import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

interface Marker {
    latitude: number;
    longitude: number;
    title?: string;
    icon?: string; // 'shop', 'user', 'car' or default
}

interface LatLng {
    latitude: number;
    longitude: number;
}

interface LeafletMapProps {
    initialRegion: {
        latitude: number;
        longitude: number;
        zoom?: number;
    };
    markers?: Marker[];
    routeCoordinates?: LatLng[];
}

export default function LeafletMap({ initialRegion, markers = [], routeCoordinates = [] }: LeafletMapProps) {
    const webViewRef = useRef<WebView>(null);

    // Initial Map HTML
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin=""/>
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
        <style>
            body { margin: 0; padding: 0; }
            #map { height: 100vh; width: 100vw; }
        </style>
    </head>
    <body>
        <div id="map"></div>
        <script>
            var map = L.map('map').setView([${initialRegion.latitude}, ${initialRegion.longitude}], ${initialRegion.zoom || 13});

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© OpenStreetMap'
            }).addTo(map);

            var markers = [];
            var routeLine = null;

            // Icons
            var LeafIcon = L.Icon.extend({
                options: {
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
                    shadowSize: [41, 41]
                }
            });

            // Default Blue Icon
            var defaultIcon = new L.Icon({
                iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
                shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41]
            });

            // Custom colored icons (using filters/hue-rotate would be complex, simplified sourcing or just emoji markers might be better for now, keeping simple default)

            function updateMap(data) {
                // Clear existing
                markers.forEach(m => map.removeLayer(m));
                markers = [];
                if (routeLine) map.removeLayer(routeLine);

                // Add Markers
                if (data.markers) {
                    data.markers.forEach(m => {
                        var marker = L.marker([m.latitude, m.longitude], {icon: defaultIcon}).addTo(map);
                        if (m.title) marker.bindPopup(m.title); // Simple popup
                        markers.push(marker);
                    });
                }

                // Add Route
                if (data.routeCoordinates && data.routeCoordinates.length > 0) {
                    var latlngs = data.routeCoordinates.map(c => [c.latitude, c.longitude]);
                    routeLine = L.polyline(latlngs, {color: 'blue'}).addTo(map);
                    map.fitBounds(routeLine.getBounds(), {padding: [50, 50]});
                }
            }

            // Listen for RN messages
            document.addEventListener("message", function(event) {
                updateMap(JSON.parse(event.data));
            });
            
            // Allow window.postMessage for iOS
            window.addEventListener("message", function(event) {
                 updateMap(JSON.parse(event.data));
            });

        </script>
    </body>
    </html>
    `;

    // Update map when props change
    useEffect(() => {
        if (webViewRef.current) {
            const data = {
                markers,
                routeCoordinates
            };
            webViewRef.current.postMessage(JSON.stringify(data));
            webViewRef.current.injectJavaScript(`updateMap(${JSON.stringify(data)})`);
        }
    }, [markers, routeCoordinates]);

    return (
        <View style={styles.container}>
            <WebView
                ref={webViewRef}
                originWhitelist={['*']}
                source={{ html: htmlContent }}
                style={styles.map}
                startInLoadingState={true}
                renderLoading={() => <ActivityIndicator size="large" color="#000080" style={StyleSheet.absoluteFill} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    map: {
        flex: 1,
    },
});
