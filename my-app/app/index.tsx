import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      {/* Background Gradient or Image could go here. For now, using a solid royal color */}
      <View style={styles.background}>
        <View style={styles.contentContainer}>
          <Image
            source={require('../assets/images/KasiLogo.png')} // Kasi Logo
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Kasi Mashesha</Text>
          <Text style={styles.subtitle}>Royalty delivery for the people.</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.loginButton]}
              onPress={() => router.push('/log_in')}
            >
              <Text style={styles.loginButtonText}>LOGIN</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.signupButton]}
              onPress={() => router.push('/register')}
            >
              <Text style={styles.signupButtonText}>SIGN UP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // White
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'transparent',
  },
  contentContainer: {
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#000080', // Navy Blue
    textTransform: 'uppercase',
    marginBottom: 10,
    textAlign: 'center',
    letterSpacing: 2,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  subtitle: {
    fontSize: 18,
    color: '#000000', // Black
    marginBottom: 50,
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: '500',
  },
  buttonContainer: {
    width: '100%',
    gap: 20,
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  loginButton: {
    backgroundColor: '#006400', // Dark Green
    borderWidth: 2,
    borderColor: '#006400',
  },
  loginButtonText: {
    color: '#FFFFFF', // White
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  signupButton: {
    backgroundColor: '#800000', // Dark Maroon
    borderWidth: 2,
    borderColor: '#800000',
  },
  signupButtonText: {
    color: '#FFFFFF', // White
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});