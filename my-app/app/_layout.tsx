import { Stack } from "expo-router";
import { stackRouterOverride } from "expo-router/build/layouts/StackClient";
import { StackScreen } from "react-native-screens";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{title:"Home"}}/>
      <Stack.Screen name="register" options={{title:"Register"}}/>
    </Stack>
    
  )
}
