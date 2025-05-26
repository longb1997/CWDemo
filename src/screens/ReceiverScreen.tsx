import React, { useCallback, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { CommonCard } from '../components/CommonCard';
import { Header } from '../components/Header';
import QrCodeGenerate from '../components/QrCodeGenerate';
import ClipboardService from '../utils/ClipboardService';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M16 12.9V17.1C16 20.6 14.6 22 11.1 22H6.9C3.4 22 2 20.6 2 17.1V12.9C2 9.4 3.4 8 6.9 8H11.1C14.6 8 16 9.4 16 12.9Z" fill="#292D32"/>
<path d="M17.1 2H12.9C9.81693 2 8.37099 3.09409 8.06975 5.73901C8.00673 6.29235 8.465 6.75 9.02191 6.75H11.1C15.3 6.75 17.25 8.7 17.25 12.9V14.9781C17.25 15.535 17.7077 15.9933 18.261 15.9303C20.9059 15.629 22 14.1831 22 11.1V6.9C22 3.4 20.6 2 17.1 2Z" fill="#292D32"/>
</svg>
`;

interface ReceiverScreenProps {
  route: {
    params: {
      token: {
        label: string;
        symbol: string;
      };
    };
  };
}

const ReceiverScreen = ({route}: ReceiverScreenProps) => {
  const {token} = route.params;
  const [amount, setAmount] = useState('');

  // Mock wallet address - in a real app this would come from your wallet service
  const walletAddress = '0x1234567890abcdef1234567890abcdef12345678';

  const generateQRValue = useCallback(() => {
    if (amount && parseFloat(amount) > 0) {
      return `${walletAddress}?amount=${amount}&token=${token.symbol}`;
    }
    return walletAddress;
  }, [walletAddress, amount, token.symbol]);

  const handleCopyAddress = useCallback(() => {
    ClipboardService.set(walletAddress, {
      copiedMessage: 'Wallet address copied!',
    });
  }, [walletAddress]);

  const handleCopyQRContent = useCallback(() => {
    const qrValue = generateQRValue();
    ClipboardService.set(qrValue, {
      copiedMessage: 'Payment info copied!',
    });
  }, [generateQRValue]);

  const handleShare = useCallback(async () => {
    try {
      const message = amount
        ? `Send ${amount} ${token.symbol} to:\n${walletAddress}`
        : `Send ${token.symbol} to:\n${walletAddress}`;

      await Share.share({
        message,
        title: `Receive ${token.symbol}`,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share payment information');
    }
  }, [amount, token, walletAddress]);

  const clearAmount = useCallback(() => {
    setAmount('');
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Header label={`Receive ${token.label}`} />

        <View style={styles.content}>
          {/* QR Code Section */}
          <CommonCard>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                marginBottom: 20,
                textAlign: 'center',
                color: '#595959',
              }}>
              This is your Chameleon multi-currency wallet address. Use it to
              receive privacy coins from another Chameleon wallet.
            </Text>
            <View style={styles.qrSection}>
              <QrCodeGenerate
                value={generateQRValue()}
                size={200}
                style={styles.qrCode}
              />
            </View>
            <TouchableOpacity
              style={{
                marginTop: 16,
                backgroundColor: '#F5F5F5',
                borderRadius: 16,
              }}
              onPress={handleCopyAddress}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  padding: 16,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 14,
                    height: 42,
                    width: '80%',
                  }}>
                  0x37e9627a91dd13e453246856d58797ad6583d762
                </Text>
                <View
                  style={{
                    backgroundColor: '#FFF',
                    overflow: 'hidden',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 8,
                    marginLeft: 8,
                    borderRadius: 8,
                  }}>
                  <SvgXml xml={xml} width={24} height={24} />
                </View>
              </View>
            </TouchableOpacity>
          </CommonCard>
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
  qrSection: {
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  qrCode: {
    marginBottom: 16,
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
  copyButtonText: {
    marginLeft: 8,
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
  },
  amountSection: {
    alignItems: 'stretch',
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f9f9f9',
  },
  amountInput: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    padding: 4,
  },
  amountHint: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  addressSection: {
    alignItems: 'stretch',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  addressText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    fontFamily: 'monospace',
  },
  copyIconButton: {
    marginLeft: 12,
    padding: 4,
  },
  addressHint: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  actionButtons: {
    marginTop: 24,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default ReceiverScreen;
