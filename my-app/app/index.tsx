import { Text, View } from "react-native";

import { Link } from "expo-router";
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

// ADD IMAGES HERE: Give them a name so you can refer to them later
const APP_LOGO = require('../assets/images/KasiLogo.png');

export  function MyScreen() {
  
  // ADD FUNCTIONALITY HERE: Define your click action
  const onPressLogo = () => {
    console.log("Logo was tapped!");
  };

  return (
    <View style={styles.container}>
      {/* ADD THE IMAGE HERE: Inside the return() block */}
      <TouchableOpacity onPress={onPressLogo}>
        <Image source={APP_LOGO} style={styles.logo} />
      </TouchableOpacity>
    </View>
  );
}

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Link href={"/register"}>Register</Link>
      <Link href={"/log_in"}>Log in</Link>
      <Link href={'/welcome_screen'}>WelcomeScreen</Link>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b5e20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    // ADD STYLING HERE
    width: 120,
    height: 120,
    borderRadius: 60, // Circles are always half the width/height
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)', 
  },
});