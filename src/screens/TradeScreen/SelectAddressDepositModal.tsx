import React from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon } from 'react-native-paper';
import { CssView } from '../../components/CssView';

const wallets = [
  {
    id: '1',
    name: 'Wallet 1',
    address: '0x1234567890123456789012345678901234567890',
    value: 100,
  },
  {
    id: '2',
    name: 'Wallet 2',
    address: '0x1234567890123456789012345678901234567890',
    value: 200,
  },
  {
    id: '3',
    name: 'Wallet 3',
    address: '0x1234567890123456789012345678901234567890',
    value: 300,
  },
];

export const SelectAddressDepositModal = ({
  visible,
  onClose,
  onSelectAddress,
  selectedToken,
}: {
  visible: boolean;
  onClose: () => void;
  onSelectAddress: (address: any) => any;
  selectedToken?: any;
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
            <Text style={styles.modalTitle}>Deposit From</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon source="close" size={28} />
            </TouchableOpacity>
          </CssView>
          <FlatList
            data={wallets}
            ItemSeparatorComponent={() => (
              <CssView
                width={'100%'}
                height={StyleSheet.hairlineWidth}
                backgroundColor={'#F5F5F5'}
              />
            )}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.tokenItem}
                onPress={() => {
                  onSelectAddress(item);
                  onClose();
                }}>
                <CssView flexDirection="row" alignItems="center" gap={8} justifyContent='space-between'>
                  <CssView flexDirection='row' alignItems='center' width={'50%'} gap={8}>
                    <Icon source="wallet" size={24} color="#43B049" />
                    <Text style={styles.name}>{item.name}</Text>
                    {/* <Text style={styles.network}>{}</Text> */}
                  </CssView>
                </CssView>
                <Text style={styles.tokenName}>{item.value} {selectedToken?.tokenName || ''}</Text>
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
    fontWeight:'bold'
  },
  network: {
    fontSize: 12,
    color: '#595959',
  },
  tokenName: {
    fontSize: 14,
    color: '#262626',
    fontWeight: 'bold',
  },
});
