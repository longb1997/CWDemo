import React, {ReactNode} from 'react';
import {StyleSheet} from 'react-native';
import {Card} from 'react-native-paper';

export const CommonCard = ({children}: {children: ReactNode | ReactNode[]}) => {
  return <Card style={styles.activityCard}>{children}</Card>;
};

const styles = StyleSheet.create({
  activityCard: {
    marginHorizontal: 16,
    marginBottom: 14,
    borderRadius: 16,
    padding: 16,
    backgroundColor: '#fff',
    elevation: 1,
  },
});
