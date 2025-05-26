import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useCallback, useMemo} from 'react';
import {Avatar, Icon} from 'react-native-paper';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import MasterKeyScreen from '../screens/MasterkeyScreen/MasterKeyScreen';
import TradeScreen from '../screens/TradeScreen/TradeScreen';
import WalletScreen from '../screens/WalletScreen/WalletScreen';
import WelcomeScreen from '../screens/WelcomeScreen/WelcomeScreen';
import WalletDetailScreen from '../screens/WalletDetailScreen/WalletDetailScreen';
import ReceiverScreen from '../screens/ReceiverScreen';
import SendScreen from '../screens/SendScreen';
import {CustomTabBar} from '../components/CustomTabBar';
import SplashScreen from 'react-native-splash-screen';
import InitMasterKeyPhraseScreen from '../screens/InitMasterKeyPhraseScreen';
import InitVerifyPassphraseScreen from '../screens/InitVerifyPassphraseScreen';
import TutorialScreen from '../screens/TutorialScreen';
import {AuthProvider, useAuth} from '../context/AuthContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabBar() {
  const renderCustomTabBar = useCallback(props => {
    return <CustomTabBar {...props} />;
  }, []);

  const options = useMemo(() => {
    return {
      Home: {
        title: 'Home',
        tabBarIcon: ({focused}: {focused: boolean}) => (
          <Icon
            size={24}
            source={require('../assets/home-2.png')}
            color={focused ? '#22B958' : '#888'}
          />
        ),
      },
      Wallet: {
        title: 'Wallet',
        tabBarIcon: ({focused}: {focused: boolean}) => (
          <Icon
            size={24}
            source={require('../assets/wallet-3.png')}
            color={focused ? '#22B958' : '#888'}
          />
        ),
      },
      Trade: {
        title: 'Trade',
        tabBarIcon: ({focused}: {focused: boolean}) => (
          <Icon
            size={24}
            source={require('../assets/candle.png')}
            color={focused ? '#22B958' : '#888'}
          />
        ),
      },
    };
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={renderCustomTabBar}>
      <Tab.Screen
        options={options.Home}
        name="HomeScreen"
        component={HomeScreen}
      />
      <Tab.Screen
        options={options.Wallet}
        name="WalletScreen"
        component={WalletScreen}
      />
      <Tab.Screen
        options={options.Trade}
        name="TradeScreen"
        component={TradeScreen}
      />
    </Tab.Navigator>
  );
}

// AuthRoute - Navigation for non-authenticated users
function AuthRoute() {
  return (
    <Stack.Navigator
      initialRouteName="WelcomeScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="MasterKeyScreen" component={MasterKeyScreen} />
      <Stack.Screen
        name="InitMasterKeyPhraseScreen"
        component={InitMasterKeyPhraseScreen}
      />
      <Stack.Screen
        name="InitVerifyPassphraseScreen"
        component={InitVerifyPassphraseScreen}
      />
      <Stack.Screen name="TutorialScreen" component={TutorialScreen} />
    </Stack.Navigator>
  );
}

// MainRoute - Navigation for authenticated users
function MainRoute() {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Main"
        component={BottomTabBar}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="WalletDetailScreen"
        component={WalletDetailScreen}
      />
      <Stack.Screen
        name="ReceiverScreen"
        component={ReceiverScreen}
      />
      <Stack.Screen
        name="SendScreen"
        component={SendScreen}
      />
    </Stack.Navigator>
  );
}

// Navigation Router - Conditionally renders routes based on auth status
function NavigationRouter() {
  const {isLogin} = useAuth();
  
  return isLogin ? <MainRoute /> : <AuthRoute />;
}

export default function HomeNavigator() {
  return (
    <AuthProvider>
      <NavigationContainer onReady={() => SplashScreen.hide()}>
        <NavigationRouter />
      </NavigationContainer>
    </AuthProvider>
  );
}
