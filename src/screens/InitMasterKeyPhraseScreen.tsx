import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import QrCodeGenerate from '../components/QrCodeGenerate';
import ClipboardService from '../utils/ClipboardService';
import {generateNewMnemonic} from '../services/wallet/mnemonicService';
import {Header} from '../components/Header';
import {Button} from 'react-native-paper';

const styles = StyleSheet.create({
  desc: {
    lineHeight: 24,
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginHorizontal: 8,
  },
  qrCodeContainer: {
    marginTop: 24,
    alignItems: 'center',
    width: 157,
    alignSelf: 'center',
  },
  qrCodeContent: {
    margin: 5,
    borderRadius: 5,
    backgroundColor: '#FFF',
  },
  qrCodeText: {
    fontSize: 16,
    marginBottom: 8,
    marginTop: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  words: {
    marginTop: 24,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  word: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    textAlign: 'center',
    marginBottom: 10,
    marginHorizontal: 6,
    backgroundColor: '#FFF',
    color: '#BFBFBF',
    fontSize: 18,
  },
  button: {
    marginTop: 24,
    backgroundColor: '#22B958',
    borderRadius: 32,
    paddingVertical: 18,
    paddingHorizontal: 32,
    width: '90%',
    alignSelf: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

const InitMasterKeyPhraseScreen = ({route}) => {
  const navigation = useNavigation();
  const mnemonic = generateNewMnemonic();

  const handleNext = () => {
    navigation.navigate('InitVerifyPassphraseScreen', {data: {mnemonic}});
  };

  const handleCopy = () => {
    ClipboardService.set(mnemonic, {copiedMessage: 'Phrase was copied.'});
  };
  return (
    <View style={{flex: 1, backgroundColor: '#E6FFE6'}}>
      <Header label="Master key phrase" />
      <ScrollView
        contentContainerStyle={{paddingHorizontal: 16, marginTop: 16}}>
        <Text style={styles.desc}>
          Save these words in the correct order. Never share this phrase with
          anyone else.
        </Text>
        <View style={styles.words}>
          {mnemonic.split(' ').map((word, index) => (
            <Text key={`${word}-${index}`} style={[styles.word]}>
              <Text style={[styles.word]}>{index + 1} </Text>
              <Text style={{color: '#141414', fontWeight: 'bold'}}>{word}</Text>
            </Text>
          ))}
        </View>
        <View style={styles.qrCodeContainer}>
          <TouchableOpacity onPress={handleCopy}>
            <QrCodeGenerate value={mnemonic} size={157} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderColor: '#22B958',
              borderWidth: 2,
              padding: 10,
              borderRadius: 9999,
              marginTop: 12,
              width: '100%',
            }}
            onPress={handleCopy}>
            <Text
              style={{
                color: '#22B958',
                textAlign: 'center',
                fontWeight: '600',
              }}>
              Copy
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => handleNext()}>
          <Text style={styles.buttonText}>I've saved my phrase</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default InitMasterKeyPhraseScreen;
