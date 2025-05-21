
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';


const WelcomeScreen = ({ navigation }: any) => {
  const handleGetStarted = () => {
    // TODO: Navigate to next screen
    if (navigation && navigation.navigate) {
      navigation.navigate('LoginScreen');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.centerContent}>
        <Image
          source={require('../../assets/chameleon.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Welcome to</Text>
        <Text style={styles.titleBold}>Mastertech Chameleon</Text>
        <Text style={styles.subtitle}>
          Experience fast and private trading for you
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>Get started</Text>
      </TouchableOpacity>
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
    fontWeight: '600',
    color: '#111',
    textAlign: 'center',
  },
  titleBold: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#43B049',
    borderRadius: 32,
    paddingVertical: 18,
    paddingHorizontal: 32,
    width: '90%',
    alignSelf: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default WelcomeScreen;