import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-paper';
import {CssView} from './CssView';

export const Header = ({label}: {label: string}) => {
  const navigation = useNavigation();
  return (
    <CssView flexDirection="row" alignItems="center" margin={16}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon source="chevron-left" size={32} color="#000" />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          textAlign: 'center',
          alignSelf: 'center',
          flex: 1,
          color: '#000000',
        }}>
        {label}
      </Text>
    </CssView>
  );
};
