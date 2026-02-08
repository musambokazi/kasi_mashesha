import { Text, View } from "react-native";

import { Link } from "expo-router";

// ADD IMAGES HERE: Give them a name so you can refer to them later
const APP_LOGO = require('../assets/KasiLogo.png');

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
      
    </View>
  );
}
export default function MyScreen() {
  
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