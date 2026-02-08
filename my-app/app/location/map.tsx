import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Placeholder for a Map View. 
// In a real CLI environment without native module linking tailored for maps, 
// we use a visual mock to prevent build errors while demonstrating functionality.

export default function LocationMap() {
    return (
        <View style={styles.container}>
            <StatusBar style="dark" />

            {/* Search Bar Mock */}
            <View style={styles.searchBar}>
                <Text style={styles.searchText}>45 Mandela St, Soweto</Text>
            </View>

            {/* Map Area Mock */}
            <View style={styles.mapArea}>
                <View style={styles.gridLineVertical} />
                <View style={styles.gridLineHorizontal} />

                {/* User Location Pin */}
                <View style={styles.userPin}>
                    <View style={styles.pinHead} />
                    <View style={styles.pinPoint} />
                </View>

                {/* Shop Location Pin */}
                <View style={[styles.shopPin, { top: 150, left: 100 }]}>
                    <View style={[styles.pinHead, { backgroundColor: '#800000' }]} />
                    <View style={[styles.pinPoint, { borderTopColor: '#800000' }]} />
                </View>

                <Text style={styles.mapLabel}>MAP VIEW MODE</Text>
            </View>

            <View style={styles.footer}>
                <Text style={styles.addressLabel}>Selected Address</Text>
                <Text style={styles.addressValue}>45 Mandela St, Soweto</Text>
                <TouchableOpacity style={styles.confirmButton}>
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
    mapArea: {
        flex: 1,
        backgroundColor: '#E3F2FD', // Light Blue map water/bg color
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    gridLineVertical: {
        position: 'absolute',
        width: 20,
        height: '100%',
        borderRightWidth: 40,
        borderRightColor: 'rgba(255, 255, 255, 0.5)',
        left: '40%',
    },
    gridLineHorizontal: {
        position: 'absolute',
        height: 20,
        width: '100%',
        borderBottomWidth: 30,
        borderBottomColor: 'rgba(255, 255, 255, 0.5)',
        top: '30%',
    },
    mapLabel: {
        position: 'absolute',
        bottom: 200,
        color: 'rgba(0,0,0,0.1)',
        fontSize: 40,
        fontWeight: 'bold',
    },
    userPin: {
        alignItems: 'center',
        marginBottom: 40, // Offset to center on point
    },
    shopPin: {
        position: 'absolute',
        alignItems: 'center',
    },
    pinHead: {
        width: 40,
        height: 40,
        backgroundColor: '#000080', // Navy Blue
        borderRadius: 20,
        borderWidth: 3,
        borderColor: '#FFFFFF',
        elevation: 4,
    },
    pinPoint: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderBottomWidth: 0,
        borderTopWidth: 14,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: '#000080',
        marginTop: -2,
    },
    footer: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        elevation: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        paddingBottom: 40,
    },
    addressLabel: {
        color: '#757575',
        fontSize: 14,
        marginBottom: 5,
    },
    addressValue: {
        color: '#333',
        fontSize: 20,
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
