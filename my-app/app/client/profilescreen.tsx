import React, { useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, SafeAreaView, Platform, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState('Thabo Mokoena');

  const pickImage = async () => {
    try {
      if (Platform.OS !== 'web') {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
          Alert.alert('Permission needed', 'Allow access to photos');
          return;
        }
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.canceled && result.assets?.length) {
        setImage(result.assets[0].uri);
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Unable to pick image in this environment');
    }
  };

  const getInitials = () => {
    const parts = name.trim().split(' ').filter(Boolean);
    return parts.map(p => p[0]).join('').toUpperCase() || 'U';
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ===== TOP-RIGHT AVATAR ===== */}
      <View style={styles.topRightAvatarWrapper}>
        <TouchableOpacity onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.topRightAvatar} />
          ) : (
            <View style={styles.topRightAvatar}>
              <Text style={styles.topRightAvatarText}>{getInitials()}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>My Profile</Text>

        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>No profile picture yet</Text>
          </View>
        )}

        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Choose Profile Picture</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#000080', marginBottom: 20 },
  image: { width: 150, height: 150, borderRadius: 75, marginBottom: 20 },
  placeholder: { width: 150, height: 150, borderRadius: 75, backgroundColor: '#E0E0E0', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  placeholderText: { color: '#757575' },
  button: { backgroundColor: '#006400', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  topRightAvatarWrapper: { position: 'absolute', top: 50, right: 20, zIndex: 10 },
  topRightAvatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#000080', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' },
  topRightAvatarText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
});
