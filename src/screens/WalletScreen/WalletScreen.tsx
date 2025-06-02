import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  Avatar,
  IconButton,
  Button,
  TouchableRipple,
  Icon,
} from 'react-native-paper';
import {CssView} from '../../components/CssView';

const user = {
  name: 'Eleanor Pena',
  avatar: require('../../assets/avatar.png'), // Replace with your avatar asset
};

const coins = [
  {
    icon: require('../../assets/chameleon.png'),
    label: 'CHML',
    sub: 'Chameleon',
    value: '0.1 CHML',
    color: '#222',
    iconBg: '#111',
  },
  {
    icon: require('../../assets/eth.png'),
    label: 'Privacy ETH',
    sub: 'Ethereum',
    value: '0 pETH',
    color: '#5A6AFF',
    iconBg: '#E6E9FF',
  },
  {
    icon: require('../../assets/btc.png'),
    label: 'Privacy BTC',
    sub: 'Bitcoin',
    value: '0.01 pBTC',
    color: '#F7931A',
    iconBg: '#FFF3E0',
  },
  {
    icon: require('../../assets/usdt.png'),
    label: 'Privacy USDT',
    sub: 'ERC200',
    value: '0 pUSDT',
    color: '#26A17B',
    iconBg: '#E0F7F1',
  },
];

const WalletScreen = ({navigation}: any) => {
  const handlePress = (token: any) => {
    // Handle the press event here
    console.log('Coin pressed');
    navigation.navigate('WalletDetailScreen', {
      token,
    });
  };
  const handleAddCoin = () => {
    // Handle the add coin event here
    console.log('Add coin pressed');
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.headerBg}>
          <View style={styles.headerRow}>
            <Avatar.Image size={30} source={user.avatar} />
            <Text style={styles.userName}>{user.name}</Text>
            <View style={styles.bellWrapper}>
              <IconButton
                icon="bell-outline"
                size={28}
                color="#111"
                style={styles.bellIcon}
              />
              <View style={styles.badge} />
            </View>
          </View>
        </View>
        <View style={{marginTop: 16}}>
          {coins.map((coin, idx) => (
            <TouchableOpacity
              onPress={() => handlePress(coin)}
              key={coin.label}
              style={styles.coinCard}>
              <View style={styles.coinLeft}>
                <CssView borderRadius={22} overflow="hidden" marginRight={12}>
                  <Icon
                    size={32}
                    source={coin.icon}
                  />
                </CssView>
                <View>
                  <Text style={styles.coinLabel}>{coin.label}</Text>
                  <Text style={styles.coinSub}>{coin.sub}</Text>
                </View>
              </View>
              <Text style={styles.coinValue}>{coin.value}</Text>
            </TouchableOpacity>
          ))}
          <TouchableRipple
            style={styles.addCoinCard}
            onPress={handleAddCoin}
            borderless>
            <View style={styles.addCoinRow}>
              <Avatar.Icon
                size={32}
                icon="plus"
                style={styles.addCoinIcon}
                color="#43B049"
              />
              <Text style={styles.addCoinText}>Add a coin your list</Text>
            </View>
          </TouchableRipple>
        </View>
        <View style={{flex: 1}} />
        <Button
          mode="contained"
          style={styles.issueBtn}
          labelStyle={styles.issueBtnLabel}
          onPress={() => {}}>
          Issue your own privacy coin
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
  headerBg: {
    paddingHorizontal: 16,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
    marginLeft: 16,
  },
  bellWrapper: {
    marginLeft: 16,
  },
  bellIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 24,
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FF5252',
    borderWidth: 2,
    borderColor: '#fff',
  },
  coinCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.7)',
    borderRadius: 22,
    padding: 16,
    marginHorizontal: 12,
    marginBottom: 14,
  },
  coinLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
  },
  coinSub: {
    fontSize: 12,
    color: '#444',
    fontWeight: '500',
    marginTop: 2,
  },
  coinValue: {
    fontSize: 16,
    color: '#43B049',
    fontWeight: 'bold',
  },
  addCoinCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.7)',
    padding: 12,
    borderRadius: 16,
    marginHorizontal: 12,
    justifyContent: 'center',
  },
  addCoinRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  addCoinIcon: {
    backgroundColor: '#E6FFE6',
    marginRight: 10,
  },
  addCoinText: {
    fontSize: 16,
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

export default WalletScreen;
