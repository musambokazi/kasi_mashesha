import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CustomModalProps {
    visible: boolean;
    title: string;
    message?: string;
    children?: React.ReactNode;
    onConfirm?: () => void;
    onCancel?: () => void;
    confirmText?: string;
    cancelText?: string;
    icon?: keyof typeof Ionicons.glyphMap;
    iconColor?: string;
    type?: 'default' | 'success' | 'danger';
}

export default function CustomModal({
    visible,
    title,
    message,
    children,
    onConfirm,
    onCancel,
    confirmText = "Confirm",
    cancelText = "Cancel",
    icon,
    iconColor,
    type = 'default'
}: CustomModalProps) {
    if (!visible) return null;

    const isSuccess = type === 'success';
    const displayIcon = icon || (isSuccess ? "checkmark-circle" : "information-circle");
    const displayIconColor = iconColor || (isSuccess ? "#006400" : "#000080");

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onCancel}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    {/* Header Icon */}
                    <View style={styles.iconContainer}>
                        <Ionicons name={displayIcon} size={60} color={displayIconColor} />
                    </View>

                    {/* Content */}
                    <Text style={styles.title}>{title}</Text>
                    {message && <Text style={styles.message}>{message}</Text>}
                    {children}

                    {/* Actions */}
                    <View style={styles.buttonContainer}>
                        {onCancel && (
                            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel}>
                                <Text style={styles.cancelButtonText}>{cancelText}</Text>
                            </TouchableOpacity>
                        )}
                        {onConfirm && (
                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    isSuccess ? styles.successButton : styles.confirmButton,
                                    !onCancel && { flex: 1 } // Full width if single button
                                ]}
                                onPress={onConfirm}
                            >
                                <Text style={styles.buttonText}>{confirmText}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 25,
        width: '100%',
        maxWidth: 340,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    iconContainer: {
        marginBottom: 15,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
    },
    message: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 25,
        lineHeight: 22,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 15,
        width: '100%',
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 1,
    },
    cancelButton: {
        backgroundColor: '#F5F5F5',
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    confirmButton: {
        backgroundColor: '#000080', // Navy
    },
    successButton: {
        backgroundColor: '#006400', // Green
    },
    cancelButtonText: {
        color: '#757575',
        fontSize: 16,
        fontWeight: '600',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
