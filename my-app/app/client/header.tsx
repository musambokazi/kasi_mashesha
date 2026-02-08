import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function Header({ name = 'User', imageUri }: { name?: string; imageUri?: string }) {
  const router = useRouter();
  const [image, setImage] = useState<string | undefined>(imageUri);

  const getInitials = () => {
    const parts = name.trim().split(' ').filter(Boolean);
    return parts.map(p => p[0]).join('').toUpperCase() || 'U';
  };

  const pickImage = async () => {
    if (Platform.OS === 'web') {
      Alert.alert('Not supported', 'Image upload works only on mobile devices.');
      return;
    }

    try {
      const ImagePicker = await import('expo-image-picker');
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) return Alert.alert('Permission needed', 'Allow access to photos.');

      const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
      if (!result.canceled && result.assets?.length) {
        setImage(result.assets[0].uri);
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Unable to pick image.');
    }
  };

  return (
    <View style={styles.header}>
      <Text style={styles.title}>App Title</Text>

      <TouchableOpacity onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.avatar} />
        ) : (
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{getInitials()}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 70,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: { fontSize: 20, fontWeight: 'bold', color: '#000080' },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#000080',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarText: { color: '#fff', fontWeight: 'bold' },
});
