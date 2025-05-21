import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const Button = ({label, onClick}) => {
  return (
    <TouchableOpacity onPress={onClick}>
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};
export default Button;
// This is a simple button component that takes a label and an onClick function as props.