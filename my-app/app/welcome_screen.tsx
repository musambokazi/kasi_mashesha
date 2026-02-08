
import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

interface Props {}

const LoginRegister: React.FC<Props> = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = () => {
    if (!email || !password) {
      alert('Please fill in all required fields');
      return;
    }
    if (!isLogin && !name) {
      alert('Please fill in your name');
      return;
    }
    // Handle login or registration logic here
    console.log('Email:', email);
    console.log('Password:', password);
    if (!isLogin) {
      console.log('Name:', name);
    }
  };

  const handleSkip = () => {
    // Handle skip logic here
    console.log('Skip');
  };

  return (
    <View style={styles.container}>
      <Image source={require('/home/m_h_t-musa/Documents/kasi_mashesha/my-app/assets/images/KasiLogo.png')} style={styles.logo} />
      <Text style={styles.title}>{isLogin ? 'Login' : 'Register'}</Text>
      {!isLogin && (
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Email*"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password*"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Register'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.toggleText}>{isLogin ? 'Don\'t have an account? Register' : 'Already have an account? Login'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipButtonText}>Skip</Text>
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
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
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
  toggleText: {
    color: '#007bff',
    marginTop: 20,
  },
  skipButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  skipButtonText: {
    color: '#007bff',
  },
});

export default LoginRegister;