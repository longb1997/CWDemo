import React, { useCallback, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Header } from '../components/Header';
import { CommonCard } from '../components/CommonCard';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface SendScreenProps {
  route: {
    params: {
      token: {
        label: string;
        symbol: string;
      };
    };
  };
}

const SendScreen = ({ route }: SendScreenProps) => {
  const { token } = route.params;
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');

  const handleSend = useCallback(() => {
    if (!recipientAddress.trim()) {
      Alert.alert('Error', 'Please enter recipient address');
      return;
    }
    if (!amount.trim() || parseFloat(amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    Alert.alert(
      'Confirm Transaction',
      `Send ${amount} ${token.symbol} to:\n${recipientAddress.substring(0, 20)}...?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Send', 
          onPress: () => {
            // Here you would implement the actual send logic
            Alert.alert('Success', 'Transaction sent successfully!');
            // Reset form
            setRecipientAddress('');
            setAmount('');
            setMemo('');
          } 
        },
      ]
    );
  }, [recipientAddress, amount, token]);

  const handleScanQR = useCallback(() => {
    // Implement QR code scanning
    Alert.alert('QR Scanner', 'QR code scanning would be implemented here');
  }, []);

  const clearField = useCallback((field: string) => {
    switch (field) {
      case 'address':
        setRecipientAddress('');
        break;
      case 'amount':
        setAmount('');
        break;
      case 'memo':
        setMemo('');
        break;
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Header label={`Send ${token.label}`} />
        
        <View style={styles.content}>
          {/* Recipient Address Section */}
          <CommonCard>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recipient Address</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter wallet address"
                  placeholderTextColor="#999"
                  value={recipientAddress}
                  onChangeText={setRecipientAddress}
                  multiline
                />
                <View style={styles.inputActions}>
                  {recipientAddress ? (
                    <TouchableOpacity 
                      onPress={() => clearField('address')} 
                      style={styles.actionButton}>
                      <Icon name="clear" size={20} color="#999" />
                    </TouchableOpacity>
                  ) : null}
                  <TouchableOpacity 
                    onPress={handleScanQR} 
                    style={styles.actionButton}>
                    <Icon name="qr-code-scanner" size={20} color="#007AFF" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </CommonCard>

          {/* Amount Section */}
          <CommonCard>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Amount</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  placeholder={`Enter ${token.symbol} amount`}
                  placeholderTextColor="#999"
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="numeric"
                />
                {amount ? (
                  <TouchableOpacity 
                    onPress={() => clearField('amount')} 
                    style={styles.actionButton}>
                    <Icon name="clear" size={20} color="#999" />
                  </TouchableOpacity>
                ) : null}
              </View>
              <Text style={styles.hint}>
                Available balance: 0.00 {token.symbol}
              </Text>
            </View>
          </CommonCard>

          {/* Memo Section */}
          <CommonCard>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Memo (Optional)</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Add a note (optional)"
                  placeholderTextColor="#999"
                  value={memo}
                  onChangeText={setMemo}
                  multiline
                />
                {memo ? (
                  <TouchableOpacity 
                    onPress={() => clearField('memo')} 
                    style={styles.actionButton}>
                    <Icon name="clear" size={20} color="#999" />
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
          </CommonCard>

          {/* Send Button */}
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={[
                styles.sendButton,
                (!recipientAddress.trim() || !amount.trim()) && styles.sendButtonDisabled
              ]} 
              onPress={handleSend}
              disabled={!recipientAddress.trim() || !amount.trim()}>
              <Icon name="send" size={20} color="#fff" />
              <Text style={styles.sendButtonText}>Send {token.symbol}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6FFE6',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    padding: 16,
  },
  section: {
    alignItems: 'stretch',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f9f9f9',
    minHeight: 50,
  },
  textInput: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: '#333',
    textAlignVertical: 'top',
  },
  inputActions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  actionButton: {
    padding: 4,
    marginLeft: 8,
  },
  hint: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
  },
  actionButtons: {
    marginTop: 24,
  },
  sendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sendButtonDisabled: {
    backgroundColor: '#ccc',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default SendScreen;
