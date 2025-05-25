import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';
import { Icon } from 'react-native-paper';
import { CssView } from '../components/CssView';


const ReceiverScreen = ({route}) => {
  const navigation = useNavigation();
  const {token} = route.params;
  const onTabPress = useCallback((tab: any) => {
    // Handle tab press
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <CssView flexDirection="row" alignItems="center" margin={8}>
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
            }}>
            {token.label}
          </Text>
        </CssView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6FFE6',
  },
});

export default ReceiverScreen;
