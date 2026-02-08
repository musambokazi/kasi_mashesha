import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {}

const Register: React.FC<Props> = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('business');
  const [driverLicense, setDriverLicense] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');

  const handleRegister = () => {
    if (!name || !email || !password) {
      alert('Please fill in all fields');
      return;
    }
    if (role === 'business') {
      if (!businessName || !businessAddress) {
        alert('Please fill in all fields');
        return;
      }
      // Handle business owner registration logic here
      console.log('Business Owner Name:', name);
      console.log('Business Owner Email:', email);
      console.log('Business Owner Password:', password);
      console.log('Business Name:', businessName);
      console.log('Business Address:', businessAddress);
    } else if (role === 'driver') {
      if (!driverLicense || !vehicleNumber) {
        alert('Please fill in all fields');
        return;
      }
      // Handle driver registration logic here
      console.log('Driver Name:', name);
      console.log('Driver Email:', email);
      console.log('Driver Password:', password);
      console.log('Driver License:', driverLicense);
      console.log('Vehicle Number:', vehicleNumber);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
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
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
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
      {role === 'business' && (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Business Name"
            value={businessName}
            onChangeText={(text) => setBusinessName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Business Address"
            value={businessAddress}
            onChangeText={(text) => setBusinessAddress(text)}
          />
        </View>
      )}
      {role === 'driver' && (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Driver License"
            value={driverLicense}
            onChangeText={(text) => setDriverLicense(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Vehicle Number"
            value={vehicleNumber}
            onChangeText={(text) => setVehicleNumber(text)}
          />
        </View>
      )}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ' white'
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
    backgroundColor: 'white', 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 10,
  },
  selectedRole: {
    backgroundColor: '#007bff',
  },
  roleText: {
    color: 'green',    
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

export default Register;

