import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon} from 'react-native-paper';
import {CssView} from '../../components/CssView';

export const SetAmountDepositModal = ({
  visible,
  onClose,
  onConfirm,
  selectedToken,
  walletInfo,
}: {
  visible: boolean;
  onClose: () => void;
  onConfirm: (amount: string) => void;
  selectedToken?: any;
  walletInfo?: any;
}) => {
  const [amount, setAmount] = useState('0.0');

  const handleConfirm = () => {
    onConfirm(amount);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Header */}
          <CssView
            flexDirection="row"
            alignItems="center"
            width={'100%'}
            justifyContent="space-between"
            marginBottom={20}>
            <TouchableOpacity onPress={onClose}>
              <Icon source="chevron-left" size={28} color="#111" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Amount</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon source="close" size={28} color="#111" />
            </TouchableOpacity>
          </CssView>

          <CssView width={'100%'} backgroundColor="#FFF" borderRadius={10} padding={20}>
            {/* Deposit From */}
            <CssView marginBottom={20}>
              <Text style={styles.sectionLabel}>Deposit from</Text>
              <Text style={styles.walletName}>
                {walletInfo?.name || 'wallet1 - Account 1'}
              </Text>
            </CssView>

            {/* Balance */}
            <CssView marginBottom={30}>
              <Text style={styles.sectionLabel}>Balance</Text>
              <Text style={styles.balanceText}>
                {selectedToken?.balance || '2'} {selectedToken?.tokenName || 'pNEO'}
              </Text>
            </CssView>

            {/* Amount Input */}
            <CssView marginBottom={20} alignItems="center">
              <TextInput
                style={styles.amountInput}
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                placeholder="0.0"
                placeholderTextColor="#C4C4C4"
              />
            </CssView>

            {/* Use PRV */}
            <CssView marginBottom={20} alignItems="center">
              <TouchableOpacity style={styles.usePrvButton}>
                <Text style={styles.usePrvText}>Use PRV</Text>
              </TouchableOpacity>
            </CssView>

            {/* Transaction Fee */}
            <CssView marginBottom={30} alignItems="center">
              <Text style={styles.feeText}>
                &lt; Transaction fee will be calculated here &gt;
              </Text>
            </CssView>

            {/* Continue Button */}
            <TouchableOpacity style={styles.continueButton} onPress={handleConfirm}>
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </CssView>
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
    width: '90%',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  sectionLabel: {
    fontSize: 14,
    color: '#000',
    marginBottom: 5,
  },
  walletName: {
    fontSize: 16,
    color: '#262626',
    fontWeight: '500',
  },
  balanceText: {
    fontSize: 16,
    color: '#262626',
    fontWeight: '500',
  },
  amountInput: {
    fontSize: 48,
    color: '#262626',
    textAlign: 'center',
    minWidth: 100,
    fontWeight: '300',
  },
  usePrvButton: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  usePrvText: {
    fontSize: 14,
    color: '#595959',
  },
  feeText: {
    fontSize: 12,
    color: '#8E8E8E',
    fontStyle: 'italic',
  },
  continueButton: {
    backgroundColor: 'rgba(34, 185, 88, 1)',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
});
