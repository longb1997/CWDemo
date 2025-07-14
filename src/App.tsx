import React from 'react';
import HomeNavigator from './navigation/HomeNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <HomeNavigator />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
