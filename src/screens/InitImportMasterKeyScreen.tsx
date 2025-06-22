import { useNavigation } from '@react-navigation/native';
import React, { memo, useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import BtnScanQrCode from '../components/Button/BtnScanQrCode';
import { CssView } from '../components/CssView';
import { Header } from '../components/Header';

// Mock data
const MOCK_MASTER_KEYS = [
  {
    id: '1',
    name: 'Master Key 1',
    mnemonic:
      'gravity machine north sort system female filter attitude volume fold club stay',
  },
  {
    id: '2',
    name: 'Master Key 2',
    mnemonic:
      'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about',
  },
];

const MOCK_ROUTES = {
  MasterKeys: 'MasterKeysScreen',
  Tutorial: 'TutorialScreen',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6FFE6',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#222',
    borderWidth: 1,
    borderColor: '#eee',
    height: 64,
  },
  btn: {
    marginTop: 15,
  },
  error: {
    color: 'orange',
    marginTop: 15,
    fontSize: 14,
  },
  button: {
    backgroundColor: '#22B958',
    borderRadius: 32,
    paddingVertical: 18,
    marginHorizontal: 16,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111',
    textAlign: 'center',
    marginBottom: 24,
  },
  scanButton: {
    backgroundColor: '#43B049',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});

const InitImportMasterKeyScreen = memo(() => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [phrase, setPhrase] = useState('');
  const [error, setError] = useState('');
  const [importing, setImporting] = useState(false);

  // Mock validation functions
  const validateName = (trimmedName: string) => {
    if (trimmedName.length < 1) {
      throw new Error('Master key name is required');
    }
    // Check if name already exists in mock data
    const nameExists = MOCK_MASTER_KEYS.some(
      key => key.name.toLowerCase() === trimmedName.toLowerCase(),
    );
    if (nameExists) {
      throw new Error('Master key name already exists');
    }
  };

  const validateMnemonic = (trimmedPhrase: string) => {
    const words = trimmedPhrase.split(' ').filter(word => word.length > 0);
    if (words.length !== 12) {
      throw new Error('Recovery phrase must contain exactly 12 words');
    }
  };

  const handleNext = async () => {
    try {
      const trimmedPhrase = phrase.trim();
      const trimmedName = name.trim();

      if (!trimmedName) {
        setError('Master key name is required');
        return;
      }

      if (!trimmedPhrase) {
        setError('Recovery phrase is required');
        return;
      }

      setImporting(true);
      setError('');

      // Mock validation
      validateName(trimmedName);
      validateMnemonic(trimmedPhrase);

      // Simulate import delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock success - show alert and navigate
      Alert.alert('Success', 'Master key imported successfully!', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('TutorialScreen');
          },
        },
      ]);
    } catch (e: any) {
      setError(e?.message || 'Failed to import master key');
    } finally {
      setImporting(false);
    }
  };

  const handleScanQR = () => {
    // Mock QR scan - just set a sample phrase
    Alert.alert(
      'QR Code Scanner',
      'This is a mock QR scanner. Setting sample recovery phrase.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Use Sample',
          onPress: () => {
            setPhrase(
              'gravity machine north sort system female filter attitude volume fold club stay',
            );
          },
        },
      ],
    );
  };

  useEffect(() => {
    setError('');
  }, [phrase, name]);

  const isFormValid = name.trim().length > 0 && phrase.trim().length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <Header label="Import master key" />

      <CssView marginBottom={16} marginHorizontal={16}>
        <TextInput
          style={styles.input}
          placeholder="Master key name"
          placeholderTextColor="#bbb"
          value={name}
          onChangeText={setName}
        />
        {!!error && <Text style={styles.error}>{error}</Text>}
      </CssView>

      <View style={{ position: 'relative', marginHorizontal: 16 }}>
        <TextInput
          style={[styles.input, { marginBottom: 16 }]}
          placeholder="Recovery phrase (12 words)"
          placeholderTextColor="#bbb"
          value={phrase}
          onChangeText={setPhrase}
          multiline
          autoCapitalize="none"
          autoCorrect={false}
        />
        <BtnScanQrCode
          style={{ position: 'absolute', right: 16, top: 16 }}
          onPress={handleScanQR}
        />
      </View>
      <TouchableOpacity
        style={[
          styles.button,
          (!isFormValid || importing) && styles.buttonDisabled,
        ]}
        onPress={handleNext}>
        <Text style={styles.buttonText}>
          {importing ? 'Importing...' : 'Import'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
});

export default InitImportMasterKeyScreen;
