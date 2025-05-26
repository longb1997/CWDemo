import _ from 'lodash';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import {Header} from '../components/Header';
import {useNavigation} from '@react-navigation/native';

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
  wordStyle: {},
  selectedText: {
    color: '#FFF',
  },
  userWords: {
    marginTop: 20,
  },
  error: {
    marginTop: 10,
    fontSize: 14,
    color: 'orange',
  },
});

const InitVerifyPassphraseScreen = ({route}) => {
  const navigation = useNavigation();
  const data = route.params?.data;
  const [wordsIndex, setWordsIndex] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [creating, setCreating] = useState(false);

  const displayWords = useMemo(() => {
    if (data) {
      const words = data.mnemonic.split(' ');
      return _.shuffle(words);
    }
    return data;
  }, [data]);

  const userWords = useMemo(
    () => wordsIndex.map(index => displayWords[index]).join(' '),
    [wordsIndex, displayWords],
  );

  const validateWords = () => {
    if (userWords !== data.mnemonic) {
      Toast.show('Invalid passphrase, please try again.');
    }
  };

  const handleNext = async () => {
    try {
      if (!__DEV__) {
        validateWords();
      }
      setCreating(true);
      setTimeout(() => {
        handleCreate(data);
      }, 1000);
    } catch (e: any) {
      setError(e?.message || '');
      setCreating(false);
    }
  };

  const handleCreate = useCallback(
    _.debounce(async data => {
      try {
        navigation.navigate('TutorialScreen');
      } catch (e: any) {
        setError(e?.message || '');
      } finally {
        setCreating(false);
      }
    }, 1000),
    [],
  );

  const handleToggleWord = (index: any) => {
    let newWordsIndex;
    if (wordsIndex.includes(index)) {
      newWordsIndex = _.remove(wordsIndex, item => item !== index);
    } else {
      newWordsIndex = [...wordsIndex, index];
    }
    setWordsIndex(newWordsIndex);
  };

  useEffect(() => {
    setError('');
  }, [userWords]);

  return (
    <View style={{flex: 1, backgroundColor: '#E6FFE6'}}>
      <Header label="Verify passphrase" />
      <ScrollView
        contentContainerStyle={{paddingHorizontal: 16, marginTop: 16}}>
        <Text style={styles.desc}>
          Tap on these words in the correct order.
        </Text>
        <View style={styles.words}>
          {displayWords.map((word: any, index: number) => (
            <TouchableOpacity
              key={`${word}-${index}`}
              style={[
                styles.word,
                wordsIndex.includes(index) && {
                  backgroundColor: 'green',
                },
              ]}
              onPress={() => handleToggleWord(index)}>
              <Text
                key={word}
                style={[
                  wordsIndex.includes(index) && styles.selectedText,
                  styles.wordStyle,
                ]}>
                {word}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={[styles.desc, styles.userWords]}>{userWords}</Text>
        {!!error && <Text style={styles.error}>{error}</Text>}
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={handleNext}
        disabled={creating}>
        {creating ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Create master key</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default InitVerifyPassphraseScreen;
