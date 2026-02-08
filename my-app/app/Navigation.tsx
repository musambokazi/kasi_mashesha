import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './log_in';
import Register from './register';
import WelcomeScreen from './welcome_screen'

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}