import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from 'react-native';
import { Avatar, IconButton, Button, TouchableRipple, Card } from 'react-native-paper';

const tabs = [
  { label: 'Deposit', icon: 'arrow-down-bold-circle-outline' },
  { label: 'Trade', icon: 'swap-horizontal', active: true },
  { label: 'Add Liquidity', icon: 'wallet-plus-outline' },
];

const activities = [
  {
    type: 'Deposit',
    id: '66710...4756e',
    amount: '+ 12 000.00 USD',
    status: 'Reject',
    statusColor: '#FFCDD2',
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
    statusColor: '#FFF9C4',
    statusTextColor: '#FBC02D',
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
    statusColor: '#C8E6C9',
    statusTextColor: '#43B049',
    account: 'Account 2',
    date: '15 Mar, 9:00',
    icon: 'currency-usd',
    iconColor: '#43B049',
  },
];

const TradeScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.headerBg}>
          <View style={styles.headerRow}>
            <IconButton icon="chevron-left" size={32} color="#111" onPress={() => navigation && navigation.goBack && navigation.goBack()} />
            <Text style={styles.headerTitle}>Trade</Text>
            <View style={{ width: 32 }} />
          </View>
        </View>
        <View style={styles.tabsRow}>
          {tabs.map((tab, idx) => (
            <View key={tab.label} style={[styles.tabItem, tab.active && styles.tabItemActive]}>
              <Avatar.Icon size={44} icon={tab.icon} style={[styles.tabIcon, tab.active && styles.tabIconActive]} color={tab.active ? '#43B049' : '#888'} />
              <Text style={[styles.tabLabel, tab.active && styles.tabLabelActive]}>{tab.label}</Text>
            </View>
          ))}
        </View>
        <View style={styles.tradeCard}>
          <View style={styles.tradeRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.tradeLabel}>From</Text>
              <Text style={styles.tradeValue}>0.0052</Text>
              <Text style={styles.tradeSubValue}>≈$1000.6</Text>
            </View>
            <View style={styles.tradeCoinBox}>
              <Avatar.Icon size={32} icon="bitcoin" style={styles.tradeCoinIcon} color="#F7931A" />
              <Text style={styles.tradeCoinText}>pBTC</Text>
              <Text style={styles.tradeCoinCheck}>✔️</Text>
            </View>
            <View style={styles.tradeBalanceBox}>
              <Text style={styles.tradeBalanceLabel}>Balance:</Text>
              <Text style={styles.tradeBalanceValue}>0.01</Text>
            </View>
          </View>
          <View style={styles.tradeSwitchRow}>
            <Avatar.Icon size={36} icon="swap-vertical" style={styles.tradeSwitchIcon} color="#43B049" />
          </View>
          <View style={styles.tradeRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.tradeLabel}>To</Text>
              <Text style={styles.tradeValue}>100.05</Text>
            </View>
            <View style={styles.tradeCoinBox}>
              <Avatar.Icon size={32} icon="currency-usd" style={styles.tradeCoinIcon} color="#26A17B" />
              <Text style={styles.tradeCoinText}>pUSDT</Text>
              <Text style={styles.tradeCoinCheck}>✔️</Text>
            </View>
          </View>
          <View style={styles.tradeInfoRow}>
            <Text style={styles.tradeInfoLabel}>Exchange Rate</Text>
            <Text style={styles.tradeInfoValue}>1 USDT = 0,215 BNB</Text>
          </View>
          <View style={styles.tradePoolBox}>
            <Text style={styles.tradePoolLabel}>Pool Size</Text>
            <Text style={styles.tradePoolValue}>1.5696 pBTC + 9,695.5681 pUSDT</Text>
          </View>
          <Button mode="contained" style={styles.tradeBtn} labelStyle={styles.tradeBtnLabel} onPress={() => {}}>
            Trade
          </Button>
        </View>
        <Text style={styles.activityHeader}>Recent Activity</Text>
        <Button mode="text" labelStyle={styles.viewAllBtnLabel} style={styles.viewAllBtn} onPress={() => {}}>
          View all
        </Button>
        {activities.map((activity, idx) => (
          <Card key={idx} style={styles.activityCard}>
            <View style={styles.activityRow}>
              <Avatar.Icon size={36} icon={activity.icon} style={{ backgroundColor: '#fff' }} color={activity.iconColor} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.activityType}>{activity.type}</Text>
                <Text style={styles.activityId}>ID {activity.id}</Text>
                <Text style={styles.activityAmount}>{activity.amount}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.activityAccount}>{activity.account}</Text>
                <Text style={styles.activityDate}>{activity.date}</Text>
                <View style={[styles.statusBadge, { backgroundColor: activity.statusColor }]}> 
                  <Text style={[styles.statusBadgeText, { color: activity.statusTextColor }]}>{activity.status}</Text>
                </View>
              </View>
            </View>
          </Card>
        ))}
        <View style={{ height: 80 }} />
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111',
    textAlign: 'center',
    flex: 1,
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
    alignItems: 'center',
    backgroundColor: '#F8FFFB',
    borderRadius: 18,
    padding: 10,
    marginHorizontal: 4,
    borderWidth: 0,
  },
  tabItemActive: {
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
    fontSize: 16,
    color: '#888',
    fontWeight: '600',
  },
  tabLabelActive: {
    color: '#43B049',
    fontWeight: 'bold',
  },
  tradeCard: {
    marginHorizontal: 12,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderWidth: 2,
    borderColor: '#A7F3D0',
    padding: 18,
    marginBottom: 18,
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
    marginLeft: 8,
    marginRight: 8,
    borderWidth: 2,
    borderColor: '#A7F3D0',
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
  },
  tradeSwitchIcon: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#A7F3D0',
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
    backgroundColor: '#F8FFFB',
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
    backgroundColor: '#43B049',
    borderRadius: 32,
    paddingVertical: 14,
    width: '100%',
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 4,
  },
  tradeBtnLabel: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  activityHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
    marginLeft: 16,
    marginTop: 8,
    marginBottom: 0,
  },
  viewAllBtn: {
    position: 'absolute',
    right: 16,
    top: 8,
    zIndex: 1,
    backgroundColor: 'transparent',
    elevation: 0,
  },
  viewAllBtnLabel: {
    color: '#43B049',
    fontWeight: 'bold',
    fontSize: 16,
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
  },
  activityId: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
  activityAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
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
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default TradeScreen;
