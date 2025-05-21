import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text, View} from 'react-native';
import WelcomeScreen from '../screens/WelcomeScreen/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import MasterKeyScreen from '../screens/MasterkeyScreen/MasterKeyScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import {Avatar} from 'react-native-paper';
import WalletScreen from '../screens/WalletScreen/WalletScreen';
import TradeScreen from '../screens/TradeScreen/TradeScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabBar() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <Avatar.Icon
              size={24}
              icon="home"
              color={focused ? '#000' : '#888'}
              style={{backgroundColor: 'transparent'}}
            />
          ),
        }}
        name="HomeScreen"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <Avatar.Icon
              size={24}
              icon="wallet"
              color={focused ? '#000' : '#888'}
              style={{backgroundColor: 'transparent'}}
            />
          ),
        }}
        name="WalletScreen"
        component={WalletScreen}
      />
       <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <Avatar.Icon
              size={24}
              icon="wallet"
              color={focused ? '#000' : '#888'}
              style={{backgroundColor: 'transparent'}}
            />
          ),
        }}
        name="TradeScreen"
        component={TradeScreen}
      />
    </Tab.Navigator>
  );
}

export default function HomeNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="MasterKeyScreen" component={MasterKeyScreen} />
        {/* Add other screens here */}
        <Stack.Screen
          name="Main"
          component={BottomTabBar}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
