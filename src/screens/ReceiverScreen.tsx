import React, { useCallback } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet
} from 'react-native';
import { Header } from '../components/Header';

const ReceiverScreen = ({route}) => {
  const {token} = route.params;
  const onTabPress = useCallback((tab: any) => {
    // Handle tab press
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <Header label={token.label} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6FFE6',
  },
});

export default ReceiverScreen;
