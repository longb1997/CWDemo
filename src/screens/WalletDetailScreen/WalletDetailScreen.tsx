import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, Icon } from 'react-native-paper';
import { CssView } from '../../components/CssView';
import { Header } from '../../components/Header';

const tabs = [
  {label: 'Send', icon: require('../../assets/Send.png')},
  {label: 'Receive', icon: require('../../assets/Receive.png')},
  // {label: 'Shield', icon: require('../../assets/Shield.png')},
];

const WalletDetailScreen = ({route}) => {
  const navigation = useNavigation();
  const {token} = route.params;
  console.log('Token:', token);
  const onTabPress = useCallback((tab: any) => {
    // Handle tab press
    console.log('Tab pressed:', tab);
    if (tab === 'Receive') {
      navigation.navigate('ReceiverScreen', { token });
    } else if (tab === 'Send') {
      // navigation.navigate('SendScreen', { token });
    }
  }, [navigation, token]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <Header label={token.label}/>
        <View style={styles.tabsRow}>
          {tabs.map((tab, idx) => (
            <TouchableOpacity
              key={tab.label}
              style={[styles.tabItem]}
              onPress={() => onTabPress(tab.label)}
              activeOpacity={0.8}>
              <Icon size={44} source={tab.icon} />
              <Text style={[styles.tabLabel]}>{tab.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <CssView alignItems="center">
          <Icon source={require('../../assets/ShieldLogo.png')} size={300} />
        </CssView>
        <CssView
          borderRadius={16}
          padding={16}
          margin={16}
          backgroundColor={'rgba(255, 255, 255, 0.5)'}
          borderWidth={1}
          borderColor={'rgba(255, 255, 255, 0.7)'}>
          <Text
            style={{
              color: '#595959',
              fontSize: 16,
              textAlign: 'center',
              marginHorizontal: 30,
            }}>
            Shield a public coin to start transacting privately
          </Text>
        </CssView>
        <Button
          mode="contained"
          style={styles.issueBtn}
          labelStyle={styles.issueBtnLabel}
          onPress={() => {}}>
          Shield your crypto
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6FFE6',
  },
  tabsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 8,
    marginTop: 8,
    marginBottom: 16,
  },
  tabItem: {
    flex: 1,
    height: 97,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.7)',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 18,
    padding: 10,
    marginHorizontal: 4,
  },
  tabItemActive: {
    height: 97,
    borderWidth: 3,
    borderColor: '#A7F3D0',
    backgroundColor: '#fff',
    shadowColor: '#43B049',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  tabIcon: {
    backgroundColor: '#E6FFE6',
    marginBottom: 4,
  },
  tabIconActive: {
    backgroundColor: '#E6FFE6',
  },
  tabLabel: {
    paddingTop: 4,
    fontSize: 14,
    color: '#888',
    fontWeight: '600',
  },
  tabLabelActive: {
    color: '#43B049',
    fontWeight: 'bold',
  },
  issueBtn: {
    backgroundColor: '#43B049',
    borderRadius: 32,
    paddingVertical: 8,
    width: '90%',
    alignSelf: 'center',
    marginBottom: 24,
    marginTop: 16,
  },
  issueBtnLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default WalletDetailScreen;
