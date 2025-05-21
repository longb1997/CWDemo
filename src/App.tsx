import React from 'react';
import HomeNavigator from './navigation/HomeNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <HomeNavigator />
    </SafeAreaProvider>
  );
}
