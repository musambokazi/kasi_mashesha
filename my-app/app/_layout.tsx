import { Stack, useRouter } from "expo-router";
import { TouchableOpacity, Text } from "react-native";
import { CartProvider } from "../context/CartContext";
import { OrderProvider } from "../context/OrderContext";
import { UserProvider } from "../context/UserContext";

export default function RootLayout() {
  const router = useRouter();

  return (
    <UserProvider>
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
            {/* ... Screens ... */}
            <Stack.Screen name="index" options={{ title: "Welcome", headerShown: false }} />
            <Stack.Screen name="log_in" options={{ title: "Login", headerShown: false }} />
            <Stack.Screen name="register" options={{ title: "Register", headerShown: false }} />
            <Stack.Screen name="client/home" options={{ title: "Kasi Mashesha" }} />
            <Stack.Screen name="client/shop/[id]" options={{ title: "Shop Menu" }} />
            <Stack.Screen name="client/cart" options={{ title: "My Cart" }} />
            <Stack.Screen name="client/track-order/[id]" options={{ title: "Track Order", headerShown: false }} />

            <Stack.Screen name="store/home" options={{ title: "My Shop" }} />
            <Stack.Screen name="store/add-product" options={{ title: "Add Product" }} />
            <Stack.Screen name="store/orders/[id]" options={{ title: "Order Details" }} />

            <Stack.Screen name="runner/home" options={{ title: "Delivery Hub" }} />
            <Stack.Screen name="runner/delivery/[id]" options={{ title: "Active Delivery" }} />



            <Stack.Screen name="client/profile/index" options={{ title: "My Profile" }} />
            <Stack.Screen name="client/profile/edit" options={{ title: "Edit Profile" }} />
            <Stack.Screen name="client/profile/settings" options={{ title: "Settings" }} />
            <Stack.Screen name="client/profile/support" options={{ title: "Help & Support" }} />

            <Stack.Screen name="runner/profile/index" options={{ title: "Runner Profile" }} />
            <Stack.Screen name="runner/profile/edit" options={{ title: "Edit Profile" }} />
            <Stack.Screen name="runner/profile/earnings" options={{ title: "Earnings" }} />
            <Stack.Screen name="runner/profile/settings" options={{ title: "Settings" }} />

            <Stack.Screen name="store/profile/index" options={{ title: "Store Profile" }} />
            <Stack.Screen name="store/profile/edit" options={{ title: "Edit Store" }} />
            <Stack.Screen name="store/profile/settings" options={{ title: "Store Settings" }} />

            <Stack.Screen name="history" options={{ title: "Order History" }} />
            <Stack.Screen name="location/map" options={{ title: "Location" }} />
          </Stack>
        </CartProvider>
      </OrderProvider>
    </UserProvider>
  );
}
