import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import {
  Avatar,
  Button,
  Card,
  IconButton,
  TouchableRipple,
} from 'react-native-paper';
import {CommonCard} from '../../components/CommonCard';
import {useAuth} from '../../context/AuthContext';

const user = {
  name: 'Eleanor Pena',
  avatar: require('../../assets/avatar.png'), // Replace with your avatar asset
};

const actions = [
  {label: 'Buy CHML', icon: 'cash-plus', color: '#8BC34A'},
  {label: 'Mint', icon: 'lightbulb-on-outline', color: '#FFE082'},
  {label: 'Trade', icon: 'swap-horizontal', color: '#81D4FA'},
  {label: 'Shield', icon: 'shield-check', color: '#B39DDB'},
  {label: 'Send', icon: 'arrow-top-right', color: '#FF8A80'},
  {label: 'Receive', icon: 'arrow-bottom-left', color: '#A5D6A7'},
  {label: 'pApp', icon: 'dots-horizontal', color: '#80DEEA'},
  {label: 'Power', icon: 'flash', color: '#B388FF'},
  {label: 'Provider', icon: 'shield-check', color: '#B39DDB'},
  {label: 'Faucet', icon: 'arrow-top-right', color: '#FF8A80'},
  {label: 'Forum', icon: 'arrow-bottom-left', color: '#A5D6A7'},
  {label: 'Explorer', icon: 'dots-horizontal', color: '#80DEEA'},
  {label: 'Keychain', icon: 'flash', color: '#B388FF'},
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

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const HomeScreen = ({navigation}: any) => {
  const {logout} = useAuth();
  const [showAllActions, setShowAllActions] = useState(false);

  const displayedActions = showAllActions ? actions : actions.slice(0, 8);

  const toggleActions = () => {
    // Configure layout animation
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        300, // duration
        LayoutAnimation.Types.easeInEaseOut,
        LayoutAnimation.Properties.opacity
      )
    );
    setShowAllActions(!showAllActions);
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
                iconColor="#111"
                style={styles.bellIcon}
              />
              <View style={styles.badge} />
            </View>
          </View>
        </View>
        <View style={styles.accountCardCustom}>
          <View style={styles.accountCardHeader}>
            <Text style={styles.accountTitleCustom}>My Account</Text>
            <View style={styles.accountCurrencyRow}>
              <Text style={styles.accountCurrency}>USD</Text>
              <IconButton
                icon="chevron-down"
                size={20}
                iconColor="#111"
                style={styles.accountCurrencyIcon}
              />
            </View>
          </View>
          <View style={styles.accountCardBody}>
            <View style={{flex: 1}}>
              <Text style={styles.accountBalanceCustom}>$10,055.00</Text>
              <View style={styles.accountGrowthRowCustom}>
                <View style={styles.accountGrowthBadge}>
                  <Text style={styles.accountGrowthText}>+3.75%</Text>
                </View>
                <Text style={styles.accountGrowthLabelCustom}> This week</Text>
              </View>
            </View>
            {/* <TouchableOpacity
              style={styles.stakingBtnCustom}
              onPress={() => {}}>
              <View style={styles.stakingBtnContent}>
                <IconButton icon="wallet" size={24} iconColor="#FFF" />
                <Text style={styles.stakingBtnText}>Staking</Text>
              </View>
            </TouchableOpacity> */}
          </View>
        </View>
        <Card style={styles.actionCard}>
          <View style={styles.actionGrid}>
            {displayedActions.map((action, idx) => (
              <TouchableRipple
                key={action.label}
                style={styles.actionItem}
                onPress={() => {}}
                borderless>
                <View style={{alignItems: 'center'}}>
                  <Avatar.Icon
                    size={48}
                    icon={action.icon}
                    style={{backgroundColor: action.color + '33'}}
                    color={action.color}
                  />
                  <Text style={styles.actionLabel}>{action.label}</Text>
                </View>
              </TouchableRipple>
            ))}
          </View>
          {actions.length > 8 && (
            <TouchableOpacity 
              style={styles.toggleButton} 
              onPress={toggleActions}>
              <Text style={styles.toggleButtonText}>
                {showAllActions ? "Less" : "More"}
              </Text>
              <IconButton
                icon={showAllActions ? "chevron-up" : "chevron-down"}
                size={16}
                iconColor="#43B049"
                style={styles.toggleIcon}
              />
            </TouchableOpacity>
          )}
        </Card>
        <View style={styles.activityHeaderRow}>
          <Text style={styles.activityHeader}>Recent Activity</Text>
          <Button
            mode="text"
            labelStyle={styles.viewAllBtnLabel}
            onPress={() => {}}>
            View all
          </Button>
        </View>
        {activities.map((activity, idx) => (
          <CommonCard key={idx}>
            <View style={styles.activityRow}>
              <View style={{flex: 1, marginLeft: 12, gap: 8}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Avatar.Image
                    size={24}
                    source={require('../../assets/usdt.png')}
                    style={{backgroundColor: '#fff', marginRight: 8}}
                  />
                  <Text style={styles.activityType}>{activity.type}</Text>
                </View>
                <Text style={styles.activityId}>ID {activity.id}</Text>
                <Text style={styles.activityAmount}>{activity.amount}</Text>
              </View>
              <View style={{alignItems: 'flex-end', gap: 8}}>
                <Text style={styles.activityAccount}>{activity.account}</Text>
                <Text style={styles.activityDate}>{activity.date}</Text>
                <View
                  style={[
                    styles.statusBadge,
                    {backgroundColor: activity.statusColor},
                  ]}>
                  <Text
                    style={[
                      styles.statusBadgeText,
                      {color: activity.statusTextColor},
                    ]}>
                    {activity.status}
                  </Text>
                </View>
              </View>
            </View>
          </CommonCard>
        ))}
        <View style={{height: 80}} />
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
    paddingTop: 12,
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
  accountCardCustom: {
    marginHorizontal: 12,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255, 0.5)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255, 0.75)',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  accountCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  accountTitleCustom: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111',
  },
  accountCurrencyRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountCurrency: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111',
  },
  accountCurrencyIcon: {
    margin: 0,
    backgroundColor: 'transparent',
  },
  accountCardBody: {
    flexDirection: 'row',
  },
  accountBalanceCustom: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 8,
  },
  accountGrowthRowCustom: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountGrowthBadge: {
    backgroundColor: '#23BD5E33',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 2,
    marginRight: 8,
  },
  accountGrowthText: {
    color: '#23BD5E',
    fontSize: 12,
  },
  accountGrowthLabelCustom: {
    color: '#444',
    fontSize: 12,
    fontWeight: '500',
  },
  stakingBtnCustom: {
    gap: 4,
    backgroundColor: '#22B958',
    borderRadius: 32,
    alignSelf: 'center',
    justifyContent: 'center',
    height: 37,
  },
  stakingBtnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  stakingBtnIcon: {
    margin: 0,
    marginRight: 2,
  },
  stakingBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  actionCard: {
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 20,
    padding: 20,
    backgroundColor: '#F8FFFB',
    elevation: 2,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionItem: {
    width: '23%',
    marginBottom: 18,
    alignItems: 'center',
  },
  actionLabel: {
    fontSize: 14,
    color: '#111',
    fontWeight: '600',
    marginTop: 6,
    textAlign: 'center',
  },
  activityHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 28,
    marginBottom: 8,
  },
  activityHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
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
  logoutButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginLeft: 8,
  },
  logoutText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    alignSelf: 'center',
  },
  toggleIcon: {
    margin: 0,
  },
  toggleButtonText: {
    color: '#43B049',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
