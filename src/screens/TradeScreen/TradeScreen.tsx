import React, { useCallback, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
  Modal,
  Dimensions,
} from 'react-native';
import { Avatar, Button, Icon, IconButton } from 'react-native-paper';
import { CommonCard } from '../../components/CommonCard';
import { CssView } from '../../components/CssView';
import { SelectTokenModal } from './SelectTokenModal';
import { ScreenContainer } from '../../components/ScreenContainer';
import { SelectAddressDepositModal } from './SelectAddressDepositModal';
import { SetAmountDepositModal } from './SetAmountDepositModal';

const user = {
  name: 'Eleanor Pena',
  avatar: require('../../assets/avatar.png'), // Replace with your avatar asset
};

const tabs = [
  { label: 'Deposit', icon: 'arrow-down-bold-circle-outline' },
  { label: 'Trade', icon: 'swap-horizontal' },
  { label: 'Add Liquidity', icon: 'wallet-plus-outline' },
];

// Mock tokens data (should match SelectTokenModal)
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
    priceToUsdt: 500,
  },
  {
    id: '3',
    name: 'Privacy Tether',
    network: 'ERC20',
    tokenName: 'pUSDT',
    icon: require('../../assets/usdt.png'),
    balance: 1200,
    priceToUsdt: 1,
  },
  {
    id: '4',
    name: 'Privacy BNB',
    network: 'BSC20',
    tokenName: 'pBNB',
    icon: require('../../assets/bnb.png'),
    balance: 1200,
    priceToUsdt: 4.65,
  },
  {
    id: '5',
    name: 'Privacy Tron',
    network: 'TRC20',
    tokenName: 'pTRX',
    icon: require('../../assets/tron.png'),
    balance: 1200,
    priceToUsdt: 0.11,
  },
];

const activities = [
  {
    type: 'Deposit',
    id: '66710...4756e',
    amount: '+ 12 000.00 USD',
    status: 'Reject',
    statusColor: '#DF26381A',
    statusTextColor: '#D32F2F',
    account: 'Account 1',
    date: '15 Mar, 9:00',
    icon: 'currency-usd',
    iconColor: '#43B049',
  },
  {
    type: 'Withdrawal',
    id: '66710...4756e',
    amount: '- 10 000.00 USD',
    status: 'Process',
    statusColor: '#F2B6091A',
    statusTextColor: '#F2B609',
    account: 'Account 2',
    date: '15 Mar, 9:00',
    icon: 'currency-usd',
    iconColor: '#43B049',
  },
  {
    type: 'Withdrawal',
    id: '66710...4756e',
    amount: '- 10 000.00 USD',
    status: 'Success',
    statusColor: '#09A5521A',
    statusTextColor: '#09A552',
    account: 'Account 2',
    date: '15 Mar, 9:00',
    icon: 'currency-usd',
    iconColor: '#43B049',
  },
];

const TradeScreen = ({ navigation }: any) => {
  const [showSelectTokenModal, setShowSelectTokenModal] = React.useState(false);
  const [showSelectAddressDepositModal, setShowSelectAddressDepositModal] =
    React.useState(false);
  const [showSetAmountDepositModal, setShowSetAmountDepositModal] =
    React.useState(false);
  const [showOptionsModal, setShowOptionsModal] = React.useState(false);
  // Default: BTC -> USDT
  const [fromToken, setFromToken] = useState(tokens[0]);
  const [toToken, setToToken] = useState(tokens[2]);

  // Mock input amount
  const [fromAmount, setFromAmount] = useState(0);
  const [toAmount, setToAmount] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(0);

  // Store selected address for deposit
  const [selectedDepositAddress, setSelectedDepositAddress] = useState<any>(null);

  const onSwapPositionToken = useCallback(() => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  }, [fromToken, toToken, fromAmount, toAmount]);

  // Track which token is being selected ('from' or 'to')
  const [selectingTokenType, setSelectingTokenType] = useState<'from' | 'to'>(
    'from',
  );

  // Show modal for selecting 'from' token
  const showSelectFromTokenModal = () => {
    setSelectingTokenType('from');
    setShowSelectTokenModal(true);
  };

  // Show modal for selecting 'to' token
  const showSelectToTokenModal = () => {
    setSelectingTokenType('to');
    setShowSelectTokenModal(true);
  };

  // Select token for 'from' or 'to'
  const handleSelectToken = (token: any) => {
    if (selectingTokenType === 'from') {
      setFromToken(token);
    } else {
      setToToken(token);
    }
  };

  const handleSelectAddress = (address: any) => {
    console.log(address);
    setSelectedDepositAddress(address);
    setShowSelectAddressDepositModal(false);
    setShowSetAmountDepositModal(true);
  };

  const handleConfirmAmount = (amount: string) => {
    console.log('Deposit amount:', amount, 'to address:', selectedDepositAddress);
    // Here you would handle the deposit logic
    Alert.alert(
      'Deposit Initiated',
      `Depositing ${amount} to ${selectedDepositAddress?.name || 'selected address'}`,
      [{ text: 'OK' }],
    );
  };

  const handleRemoveLiquidity = () => {
    setShowOptionsModal(false);
    // Handle remove liquidity logic here
    Alert.alert('Remove Liquidity', 'Remove liquidity functionality would be implemented here');
  };

  const handleWithdrawFunds = () => {
    setShowOptionsModal(false);
    // Handle withdraw funds logic here
    Alert.alert('Withdraw Funds', 'Withdraw funds functionality would be implemented here');
  };

  // Calculate exchange rate and toAmount
  React.useEffect(() => {
    // If either token is missing, skip
    if (!fromToken || !toToken) return;
    // Use priceToUsdt for both tokens
    const fromPrice = fromToken.priceToUsdt || 1;
    const toPrice = toToken.priceToUsdt || 1;
    // Exchange rate: 1 fromToken = ? toToken
    const rate = fromPrice / toPrice;
    setExchangeRate(rate);
    setToAmount(Number((Number(fromAmount || '0') * rate).toFixed(6)));
  }, [fromToken, toToken, fromAmount]);

  // Swap function (mock)
  const swap = () => {
    // For demo, just log the swap
    console.log(
      `Swapping ${fromAmount} ${fromToken.tokenName} to ${toAmount} ${toToken.tokenName} at rate ${exchangeRate}`,
    );
    Alert.alert(
      'Swap Successful',
      `You have swapped ${fromAmount} ${fromToken.tokenName} to ${toAmount} ${toToken.tokenName}`,
      [{ text: 'OK', onPress: () => setFromAmount(0) }],
    );
    // Here you could update balances, show a toast, etc.
  };
  // Track active tab
  const [activeTab, setActiveTab] = useState(1); // 0: Deposit, 1: Trade, 2: Add Liquidity]

  const isAddLiquidity = activeTab === 2;

  return (
    <ScreenContainer style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.headerBg}>
          <View style={styles.headerRow}>
            <Avatar.Image size={30} source={user.avatar} />
            <Text style={styles.userName}>{user.name}</Text>
            <View style={styles.bellWrapper}>
              <IconButton
                icon="bell-outline"
                size={28}
                iconColor="#111"
                style={styles.bellIcon}
              />
              <View style={styles.badge} />
            </View>
            <IconButton
              icon="dots-vertical"
              size={28}
              iconColor="#111"
              style={styles.bellIcon}
              onPress={() => setShowOptionsModal(true)}
            />
          </View>
        </View>
        <View style={styles.tabsRow}>
          {tabs.map((tab, idx) => (
            <TouchableOpacity
              key={tab.label}
              style={[
                styles.tabItem,
                activeTab === idx && styles.tabItemActive,
              ]}
              onPress={() => {
                if (idx === 0) {
                  setShowSelectAddressDepositModal(true);
                } else {
                  setActiveTab(idx);
                }
              }}
              activeOpacity={0.8}>
              <Avatar.Icon
                size={44}
                icon={tab.icon}
                style={[
                  styles.tabIcon,
                  activeTab === idx && styles.tabIconActive,
                ]}
                color={activeTab === idx ? '#43B049' : '#888'}
              />
              <Text
                style={[
                  styles.tabLabel,
                  activeTab === idx && styles.tabLabelActive,
                ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.tradeCard}>
          <View style={styles.tradeItem}>
            <CssView
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between">
              <Text style={styles.tradeLabel}>{isAddLiquidity ? 'Deposit' : 'From'}</Text>
            </CssView>
            <CssView
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between">
              <TextInput
                style={[styles.tradeValue, { minWidth: 60 }]}
                value={fromAmount.toString()}
                keyboardType="numeric"
                onChangeText={text => {
                  setFromAmount(Number(text) || 0);
                }}
                placeholder="0.00"
                returnKeyType="done"
              />
              <TouchableOpacity
                style={styles.tradeCoinBox}
                onPress={showSelectFromTokenModal}>
                <Icon size={24} source={fromToken.icon} />
                <Text style={styles.tradeCoinText}>{fromToken.tokenName}</Text>
              </TouchableOpacity>
            </CssView>
            <CssView
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between">
              <Text style={styles.tradeSubValue}>
                ≈${(fromAmount * (fromToken.priceToUsdt || 1)).toFixed(2)}
              </Text>
              <View style={styles.tradeBalanceBox}>
                <Text style={styles.tradeBalanceLabel}>
                  Balance: {fromToken.balance}
                </Text>
              </View>
            </CssView>
          </View>
          <TouchableOpacity
            onPress={onSwapPositionToken}
            style={styles.tradeSwitchRow}>
            <Avatar.Icon
              size={40}
              icon="swap-vertical"
              style={styles.tradeSwitchIcon}
              color="#FFF"
            />
          </TouchableOpacity>
          <View style={[styles.tradeItem, { marginTop: 8 }]}>
            <View style={styles.tradeRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.tradeLabel}>{isAddLiquidity ? 'Deposit' : 'To'}</Text>
                <TextInput
                  style={[styles.tradeValue, { minWidth: 60 }]}
                  value={toAmount.toString()}
                  keyboardType="numeric"
                  onChangeText={text => {
                    setToAmount(Number(text) || 0);
                  }}
                  placeholder="0.00"
                  returnKeyType="done"
                />
              </View>
              <TouchableOpacity
                style={styles.tradeCoinBox}
                onPress={showSelectToTokenModal}>
                <Icon size={24} source={toToken.icon} />
                <Text style={styles.tradeCoinText}>{toToken.tokenName}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.tradeItem, { marginTop: 8 }]}>
            <View style={styles.tradeInfoRow}>
              <Text style={styles.tradeInfoLabel}>Exchange Rate</Text>
              <Text style={styles.tradeInfoValue}>
                1 {fromToken.tokenName} = {exchangeRate.toFixed(6)}{' '}
                {toToken.tokenName}
              </Text>
            </View>
            <View style={styles.tradePoolBox}>
              <Text style={styles.tradePoolLabel}>Pool Size</Text>
              <Text style={styles.tradePoolValue}>
                1.5696 BTC + 9,695.5681 USDT
              </Text>
            </View>
          </View>
          <Button
            mode="contained"
            style={styles.tradeBtn}
            labelStyle={styles.tradeBtnLabel}
            onPress={swap}>
            {isAddLiquidity ? 'Add Liquidity' : 'Trade'}
          </Button>
        </View>
        <CssView
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between">
          <Text style={styles.activityHeader}>Recent Activity</Text>
          <Button
            mode="text"
            labelStyle={styles.viewAllBtnLabel}
            style={styles.viewAllBtn}
            onPress={() => { }}>
            View all
          </Button>
        </CssView>
        {activities.map((activity, idx) => (
          <CommonCard key={idx}>
            <View style={styles.activityRow}>
              <View style={{ flex: 1, marginLeft: 12, gap: 8 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Avatar.Image
                    size={24}
                    source={require('../../assets/usdt.png')}
                    style={{ backgroundColor: '#fff', marginRight: 8 }}
                  />
                  <Text style={styles.activityType}>{activity.type}</Text>
                </View>
                <Text style={styles.activityId}>ID {activity.id}</Text>
                <Text style={styles.activityAmount}>{activity.amount}</Text>
              </View>
              <View style={{ alignItems: 'flex-end', gap: 8 }}>
                <Text style={styles.activityAccount}>{activity.account}</Text>
                <Text style={styles.activityDate}>{activity.date}</Text>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: activity.statusColor },
                  ]}>
                  <Text
                    style={[
                      styles.statusBadgeText,
                      { color: activity.statusTextColor },
                    ]}>
                    {activity.status}
                  </Text>
                </View>
              </View>
            </View>
          </CommonCard>
        ))}
      </ScrollView>
      <SelectTokenModal
        visible={showSelectTokenModal}
        onSelectToken={handleSelectToken}
        onClose={() => setShowSelectTokenModal(false)}
      />
      <SelectAddressDepositModal
        visible={showSelectAddressDepositModal}
        onSelectAddress={handleSelectAddress}
        onClose={() => setShowSelectAddressDepositModal(false)}
        selectedToken={fromToken}
      />
      <SetAmountDepositModal
        visible={showSetAmountDepositModal}
        onClose={() => setShowSetAmountDepositModal(false)}
        onConfirm={handleConfirmAmount}
        selectedToken={fromToken}
        walletInfo={selectedDepositAddress}
      />
      
      {/* Bottom Sheet Modal for Options */}
      <Modal
        visible={showOptionsModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowOptionsModal(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowOptionsModal(false)}>
          <View style={styles.bottomSheet}>
            <View style={styles.bottomSheetHandle} />
            <Text style={styles.bottomSheetTitle}>Options</Text>
            
            <TouchableOpacity
              style={styles.bottomSheetOption}
              onPress={handleRemoveLiquidity}>
              <Icon source="minus-circle-outline" size={24} color="#111" />
              <View style={styles.bottomSheetOptionTextContainer}>
                <Text style={styles.bottomSheetOptionText}>Remove Liquidity</Text>
                <Text style={styles.bottomSheetOptionSubtitle}>Remove your liquidity from the post</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.bottomSheetOption}
              onPress={handleWithdrawFunds}>
              <Icon source="cash-minus" size={24} color="#111" />
              <View style={styles.bottomSheetOptionTextContainer}>
                <Text style={styles.bottomSheetOptionText}>Withdraw Funds</Text>
                <Text style={styles.bottomSheetOptionSubtitle}>Withdraw funds from your pDEX account to another account</Text>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </ScreenContainer>
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
    borderColor: '#F8FFFB',
    alignItems: 'center',
    backgroundColor: '#F8FFFB',
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
    shadowOffset: { width: 0, height: 4 },
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
    fontSize: 14,
    color: '#888',
    fontWeight: '600',
  },
  tabLabelActive: {
    color: '#43B049',
    fontWeight: 'bold',
  },
  tradeCard: {
    marginHorizontal: 12,

    marginBottom: 18,
  },
  tradeItem: {
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255, 0.5)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255, 0.75)',
    padding: 18,
  },
  tradeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tradeLabel: {
    fontSize: 18,
    color: '#111',
    fontWeight: '600',
    marginBottom: 2,
  },
  tradeValue: {
    fontSize: 24,
    color: '#111',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  tradeSubValue: {
    fontSize: 14,
    color: '#888',
    marginBottom: 2,
  },
  tradeCoinBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(34, 185, 88, 1)',
    gap: 4,
  },
  tradeCoinIcon: {
    backgroundColor: 'transparent',
    marginRight: 4,
  },
  tradeCoinText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
    marginRight: 2,
  },
  tradeCoinCheck: {
    fontSize: 16,
    color: '#43B049',
    fontWeight: 'bold',
  },
  tradeBalanceBox: {
    alignItems: 'flex-end',
    marginLeft: 8,
  },
  tradeBalanceLabel: {
    fontSize: 12,
    color: '#888',
  },
  tradeBalanceValue: {
    fontSize: 14,
    color: '#111',
    fontWeight: 'bold',
  },
  tradeSwitchRow: {
    alignItems: 'center',
    marginVertical: 8,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 116,
    zIndex: 999,
  },
  tradeSwitchIcon: {
    backgroundColor: 'rgba(34, 185, 88, 1)',
    borderWidth: 6,
    borderColor: '#FFF',
  },
  tradeInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 4,
  },
  tradeInfoLabel: {
    fontSize: 14,
    color: '#888',
    fontWeight: '600',
  },
  tradeInfoValue: {
    fontSize: 14,
    color: '#111',
    fontWeight: 'bold',
  },
  tradePoolBox: {
    backgroundColor: 'rgba(245, 245, 245, 1)',
    borderRadius: 14,
    padding: 12,
    marginTop: 4,
    marginBottom: 12,
  },
  tradePoolLabel: {
    fontSize: 14,
    color: '#888',
    fontWeight: '600',
    marginBottom: 2,
  },
  tradePoolValue: {
    fontSize: 16,
    color: '#111',
    fontWeight: 'bold',
  },
  tradeBtn: {
    backgroundColor: 'rgba(34, 185, 88, 1)',
    borderRadius: 99,
    paddingVertical: 8,
    width: '100%',
    alignSelf: 'center',
    marginTop: 16,
  },
  tradeBtnLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  activityHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 16,
  },
  viewAllBtn: {
    backgroundColor: 'transparent',
    marginRight: 16,
  },
  viewAllBtnLabel: {
    color: '#43B049',
    fontWeight: 'bold',
    fontSize: 14,
  },
  activityCard: {
    marginHorizontal: 16,
    marginBottom: 14,
    borderRadius: 16,
    padding: 16,
    backgroundColor: '#fff',
    elevation: 1,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityType: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111',
  },
  activityId: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
  activityAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#262626',
    marginBottom: 2,
  },
  activityAccount: {
    fontSize: 14,
    color: '#888',
    fontWeight: '600',
    marginBottom: 2,
  },
  activityDate: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
  statusBadge: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  statusBadgeText: {
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 10,
    paddingBottom: 30,
    paddingHorizontal: 20,
    minHeight: 200,
  },
  bottomSheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#ddd',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 20,
    textAlign: 'center',
  },
  bottomSheetOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: '#F8FFFB',
  },
  bottomSheetOptionTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  bottomSheetOptionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
    marginBottom: 2,
  },
  bottomSheetOptionSubtitle: {
    fontSize: 13,
    color: '#888',
    lineHeight: 18,
  },
});

export default TradeScreen;
