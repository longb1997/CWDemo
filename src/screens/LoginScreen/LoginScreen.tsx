import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { ScreenContainer } from '../../components/ScreenContainer';

const LoginScreen = () => {
  const navigation = useNavigation();
  const handleEnterSecretPhrase = () => {
    // TODO: Navigate to import/restore screen
    navigation.navigate('InitImporMasterKeyScreen');
  };

  const handleNewAccount = () => {
    // TODO: Navigate to new account creation screen
    navigation.navigate('MasterKeyScreen');
  };

  return (
    <ScreenContainer style={styles.container}>
      <View style={styles.centerContent}>
        <Image
          source={require('../../assets/chameleon.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Set up your Chameleon Wallet</Text>
        <Text style={styles.subtitle}>
          Import an existing wallet or create a new one
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.outlineButton}
          onPress={handleEnterSecretPhrase}>
          <Text style={styles.outlineButtonText}>
            Restore from secret phrase
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNewAccount}>
          <Text style={styles.buttonText}>Create a new account</Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6FFE6',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 40,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 16,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  outlineButton: {
    width: '90%',
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#22B958',
    paddingVertical: 18,
    marginBottom: 16,
    backgroundColor: 'transparent',
    alignSelf: 'center',
  },
  outlineButtonText: {
    color: '#22B958',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#22B958',
    borderRadius: 32,
    paddingVertical: 18,
    width: '90%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default LoginScreen;
