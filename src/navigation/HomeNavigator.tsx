import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import WelcomeScreen from '../screens/WelcomeScreen/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import MasterKeyScreen from '../screens/MasterkeyScreen/MasterKeyScreen';

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabBar() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  );
}

export default function HomeNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="MasterKeyScreen" component={MasterKeyScreen} />
        {/* Add other screens here */}
        <Stack.Screen name="Main" component={BottomTabBar} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
