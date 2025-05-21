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
// import { Ionicons } from '@expo/vector-icons';

const MasterKeyScreen = ({navigation}: any) => {
  const [keyName, setKeyName] = useState('');
  const [accepted, setAccepted] = useState(true);

  const handleReady = () => {
    if (accepted) {
      // TODO: Navigate to next screen
      if (navigation && navigation.navigate) {
        navigation.navigate('ShowSeed');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Master key name</Text>
        <View style={{width: 32}} />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Master key name"
        placeholderTextColor="#bbb"
        value={keyName}
        onChangeText={setKeyName}
      />
      <Text style={styles.infoText}>
        The next screen will contain 12 special words that will allow you to
        recover your funds.
      </Text>
      <Text style={styles.infoText}>
        Be prepared to record them in a safe place. If anyone gains access to
        them, they will gain access to your funds.
      </Text>
      <Pressable onPress={() => setAccepted(!accepted)} style={styles.checkboxRow}>
        <Checkbox.Android
          status={accepted ? 'checked' : 'unchecked'}
          onPress={() => setAccepted(!accepted)}
          color='#43B049'
        />
        <Text style={styles.checkboxLabel}>
          I accept that if I lose these words,{'\n'}I will lose access to my
          funds.
        </Text>
      </Pressable>
      <TouchableOpacity
        style={[styles.button, !accepted && {opacity: 0.5}]}
        onPress={handleReady}
        disabled={!accepted}>
        <Text style={styles.buttonText}>Ready</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6FFE6',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 30,
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
    paddingVertical: 14,
    fontSize: 20,
    color: '#222',
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#eee',
  },
  infoText: {
    fontSize: 20,
    color: '#111',
    fontWeight: '600',
    marginBottom: 12,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 24,
    marginBottom: 32,
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
    left: 20,
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
