import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const LoginScreen = ({ navigation }: any) => {
  const handleEnterSecretPhrase = () => {
    // TODO: Navigate to import/restore screen
    if (navigation && navigation.navigate) {
      navigation.navigate('MasterKeyScreen');
    }
  };

  const handleNewAccount = () => {
    // TODO: Navigate to new account creation screen
    if (navigation && navigation.navigate) {
      navigation.navigate('NewAccount');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.centerContent}>
        <Image
          source={require('../../assets/chameleon.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Set up account</Text>
        <Text style={styles.subtitle}>
          Import an existing account or create a new one
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.outlineButton} onPress={handleEnterSecretPhrase}>
          <Text style={styles.outlineButtonText}>Enter secret phrase</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNewAccount}>
          <Text style={styles.buttonText}>New Account</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 32,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
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
    borderColor: '#43B049',
    paddingVertical: 18,
    marginBottom: 16,
    backgroundColor: 'transparent',
    alignSelf: 'center',
  },
  outlineButtonText: {
    color: '#43B049',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#43B049',
    borderRadius: 32,
    paddingVertical: 18,
    width: '90%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default LoginScreen;
