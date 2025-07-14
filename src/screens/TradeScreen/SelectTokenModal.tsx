import React from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon} from 'react-native-paper';
import {CssView} from '../../components/CssView';

const tokens = [
  {
    id: '1',
    name: 'Privacy Bitcoin',
    network: 'Bitcoin',
    tokenName: 'pBTC',
    icon: require('../../assets/btc.png'),
    balance: 0.01,
    priceToUsdt: 1000,
  },
  {
    id: '2',
    name: 'Privacy Ethereum',
    network: 'ERC20',
    tokenName: 'pETH',
    icon: require('../../assets/eth.png'),
    balance: 1,
    priceToUsdt: 500
  },
  {
    id: '3',
    name: 'Privacy Tether',
    network: 'ERC20',
    tokenName: 'pUSDT',
    icon: require('../../assets/usdt.png'),
    balance: 1200,
  },
  {
    id: '4',
    name: 'Privacy BNB',
    network: 'BSC20',
    tokenName: 'pBNB',
    icon: require('../../assets/bnb.png'),
    balance: 1200,
  },
  {
    id: '5',
    name: 'Privacy Tron',
    network: 'TRC20',
    tokenName: 'pTRX',
    icon: require('../../assets/tron.png'),
    balance: 1200,
  },
];

export const SelectTokenModal = ({
  visible,
  onClose,
  onSelectToken,
}: {
  visible: boolean;
  onClose: () => void;
  onSelectToken: (token: any) => any;
}) => {
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <CssView
            flexDirection="row"
            alignItems="center"
            width={'100%'}
            justifyContent="space-between">
            <Text style={styles.modalTitle}>Select a Token</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon source="close" size={28} />
            </TouchableOpacity>
          </CssView>
          <FlatList
            data={tokens}
            ItemSeparatorComponent={() => (
              <CssView
                width={'100%'}
                height={StyleSheet.hairlineWidth}
                backgroundColor={'#F5F5F5'}
              />
            )}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.tokenItem}
                onPress={() => {
                  onSelectToken(item);
                  onClose();
                }}>
                <CssView flexDirection="row" alignItems="center" gap={8}>
                  <Icon source={item.icon} size={30} />
                  <CssView>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.network}>{item.network}</Text>
                  </CssView>
                </CssView>
                <Text style={styles.tokenName}>{item.tokenName}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  tokenItem: {
    paddingVertical: 16,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 14,
    color: '#262626',
  },
  network: {
    fontSize: 12,
    color: '#595959',
  },
  tokenName: {
    fontSize: 14,
    color: '#262626',
  },
});
