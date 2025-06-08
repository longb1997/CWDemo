import React, {memo, useCallback, useState} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Container from '../components/Container';
import {Header} from '../components/Header';
import {Video} from '../components/Video';
import {useAuth} from '../context/AuthContext';
import { ScreenContainer } from '../components/ScreenContainer';

const TutorialScreen = memo(() => {
  const [displayIndex, setDisplayIndex] = useState(0);
  const {login} = useAuth();

  const onPressExpand = useCallback(
    (index: number) => setDisplayIndex(index),
    [],
  );

  // Custom placeholder for video
  const renderVideo = React.useCallback(
    (item: any, index: number) => (
      <Video
        key={item.video}
        {...item}
        index={index}
        displayIndex={displayIndex}
        onPressExpand={onPressExpand}
      />
    ),
    [displayIndex, onPressExpand],
  );

  const onGoBack = useCallback(() => {
    // Trigger login and user will be redirected to main screen
    login();
  }, [login]);

  // Mock data for videos
  const videos = [
    {
      video: 'video1',
      title: 'Get started with Chameleon.',
      sub: 'Learn how to quickly create a new wallet and get started.',
      thumbnail: 'https://placehold.co/120x80/43B049/fff?text=Wallet',
    },
    {
      video: 'video2',
      title: 'How to Make a Swap',
      sub: 'Step-by-step guide to swapping tokens securely.',
      thumbnail: 'https://placehold.co/120x80/43B049/fff?text=Swap',
    },
    {
      video: 'video3',
      title: 'How to Add Liquidity',
      sub: 'Provide liquidity and earn rewards in a few simple steps.',
      thumbnail: 'https://placehold.co/120x80/43B049/fff?text=Liquidity',
    },
  ];

  return (
    <ScreenContainer>
      <Header label="Tutorial" />
      <ScrollView
        style={[
          {
            borderTopRightRadius: 26,
            borderTopLeftRadius: 26,
          },
          {paddingHorizontal: 0},
        ]}>
        {videos.map(renderVideo)}
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={onGoBack}>
        <Text style={styles.buttonText}>Let's go</Text>
      </TouchableOpacity>
    </ScreenContainer>
  );
});

export default TutorialScreen;

const styles = StyleSheet.create({
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
