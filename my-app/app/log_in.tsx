import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {}

const Login: React.FC<Props> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleLogin = () => {
    if (!email || !password || !role) {
      alert('Please fill in all fields');
      return;
    }
    // Handle login logic here
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Role:', role);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />
      <View style={styles.roleContainer}>
        <TouchableOpacity
          style={[styles.roleButton, role === 'business' && styles.selectedRole]}
          onPress={() => setRole('business')}
        >
          <Text style={styles.roleText}>Business Owner</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.roleButton, role === 'driver' && styles.selectedRole]}
          onPress={() => setRole('driver')}
        >
          <Text style={styles.roleText}>Driver</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: 300,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  roleContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  roleButton: {
    width: 140,
    height: 40,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 10,
  },
  selectedRole: {
    backgroundColor: '#007bff',
  },
  roleText: {
    color: '#fff',
    fontSize: 16,
  },
  button: {
    width: 300,
    height: 40,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});


