import React, {useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Checkbox} from 'react-native-paper';
import Container from '../../components/Container';
import {Header} from '../../components/Header';
import {useNavigation} from '@react-navigation/native';
import { ScreenContainer } from '../../components/ScreenContainer';
// import { Ionicons } from '@expo/vector-icons';

const MasterKeyScreen = () => {
  const navigation = useNavigation();
  const [keyName, setKeyName] = useState('');
  const [accepted, setAccepted] = useState(true);

  const handleReady = () => {
    if (accepted) {
      // TODO: Navigate to next screen
      navigation.navigate('InitMasterKeyPhraseScreen');
    }
  };

  return (
    <ScreenContainer style={styles.container}>
      <Header label="Master key name" />
      <Container>
        <TextInput
          style={styles.input}
          placeholder="Master key name"
          placeholderTextColor="#bbb"
          value={keyName}
          onChangeText={setKeyName}
        />
        <Text style={styles.infoText}>
          The next screen will show you a 12-word recovery phrase. This phrase
          is the <Text style={{fontWeight: 'bold'}}>only way</Text> to restore
          your wallet.
        </Text>
        <Text style={styles.infoText}>
          Write it down and store it safely. Anyone with access to the recovery
          phrase can control your funds.
        </Text>
        <Pressable
          onPress={() => setAccepted(!accepted)}
          style={styles.checkboxRow}>
          <Checkbox.Android
            status={accepted ? 'checked' : 'unchecked'}
            onPress={() => setAccepted(!accepted)}
            color="#43B049"
          />
          <Text style={styles.checkboxLabel}>
            I understand that losing this phrase means losing access to my
            wallet.
          </Text>
        </Pressable>
        <TouchableOpacity
          style={[styles.button, !accepted && {opacity: 0.5}]}
          onPress={handleReady}
          disabled={!accepted}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </Container>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6FFE6',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111',
    textAlign: 'center',
    flex: 1,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#222',
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#eee',
    height: 56,
  },
  infoText: {
    fontSize: 18,
    color: '#111',
    fontWeight: '400',
    marginBottom: 32,
  },
  checkboxRow: {
    flexDirection: 'row',
    marginTop: 48,
  },
  checkbox: {
    width: 32,
    height: 32,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#43B049',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  checkboxLabel: {
    fontSize: 18,
    color: '#111',
    fontWeight: '600',
    flex: 1,
  },
  button: {
    backgroundColor: '#43B049',
    borderRadius: 32,
    paddingVertical: 18,
    width: '100%',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 30,
    right: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default MasterKeyScreen;
