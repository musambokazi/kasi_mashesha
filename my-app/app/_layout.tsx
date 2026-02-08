import { Stack, useRouter } from "expo-router";
import { TouchableOpacity, Text } from "react-native";
import { CartProvider } from "../context/CartContext";
import { OrderProvider } from "../context/OrderContext";

export default function RootLayout() {
  const router = useRouter();

  return (
    <OrderProvider>
      <CartProvider>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: '#FFFFFF', // White
            },
            headerTintColor: '#000080', // Navy Blue
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen name="index" options={{ title: "Welcome", headerShown: false }} />
          <Stack.Screen name="log_in" options={{ title: "Login" }} />
          <Stack.Screen name="register" options={{ title: "Register" }} />
          <Stack.Screen name="client/home" options={{ title: "Kasi Mashesha" }} />
          <Stack.Screen name="client/shop/[id]" options={{ title: "Shop Menu" }} />
          <Stack.Screen name="client/cart" options={{ title: "My Cart" }} />
          <Stack.Screen name="client/track-order/[id]" options={{ title: "Track Order", headerShown: false }} />

          <Stack.Screen name="store/home" options={{ title: "My Shop" }} />
          <Stack.Screen name="store/add-product" options={{ title: "Add Product" }} />
          <Stack.Screen name="store/orders/[id]" options={{ title: "Order Details" }} />

          <Stack.Screen name="runner/home" options={{ title: "Delivery Hub" }} />
          <Stack.Screen name="runner/delivery/[id]" options={{ title: "Active Delivery" }} />

          <Stack.Screen name="profile" options={{ title: "My Profile" }} />
          <Stack.Screen name="history" options={{ title: "Order History" }} />
          <Stack.Screen name="location/map" options={{ title: "Location" }} />
        </Stack>
      </CartProvider>
    </OrderProvider>
  );
}
