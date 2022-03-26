import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {BaseTheme, Button, Text, View} from 'ui';
import PlanCard from 'ui/Home/PlanCard';
import ProfileHeader from 'ui/Profile/ProfileHeader';
import {ScrollView} from 'ui/ScrollView';

const styles = StyleSheet.create({
  paymentCard: {
    borderColor: '#E5E5E5',
    borderWidth: 1,
    backgroundColor: '#FBFBFB',
  },
  planCard: {
    borderColor: '#1A7056',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 16,
    width: 100 + '%',
  },
  cancelSubscription: {
    paddingVertical: 8,
  },
});

export const Subscription = () => {
  const [plan, setPlan] = useState(0); // 0 - none selected, 1 - yearly, 2 - monthly

  return (
    <View flex={1} pb="xl">
      <SafeAreaView>
        <ProfileHeader title="Subscription" />
      </SafeAreaView>
      <ScrollView>
        <Text color="neutral800" fontWeight="bold" mb="s" mt="s" fontSize={16}>
          Your Plan
        </Text>
        <View
          backgroundColor="primary50"
          width="100%"
          borderRadius={8}
          style={styles.paymentCard}>
          <View
            backgroundColor="primary600"
            p="m"
            borderTopLeftRadius={8}
            borderTopRightRadius={8}
            width="100%"
            justifyContent="space-between"
            flexDirection="row">
            <View flexDirection="row" alignItems="center">
              <View py="xs" px="s" backgroundColor="white" borderRadius={3}>
                <Text color="success300" fontWeight="bold">
                  GROW
                </Text>
              </View>
              <Text ml="xs" color="white">
                Monthly
              </Text>
            </View>
            <View flexDirection="row">
              <Text fontSize={24} color="white" fontWeight="bold" mr="xs">
                $12.99
              </Text>
              <Text color="white">/ month</Text>
            </View>
          </View>
          <View
            flexDirection="row"
            mx="m"
            pt="l"
            pb="m"
            justifyContent="space-between"
            borderBottomColor="neutral100"
            borderBottomWidth={1}>
            <Text color="neutral700">Next Payment</Text>
            <Text pr="s">Nov 23, 2022</Text>
          </View>
          <View
            flexDirection="row"
            mx="m"
            pt="l"
            pb="m"
            justifyContent="space-between">
            <Text color="neutral700">Member Since</Text>
            <Text pr="s">Nov 23, 2022</Text>
          </View>
        </View>
        <Text color="neutral800" fontWeight="bold" mb="s" mt="l" fontSize={16}>
          Content Subscription
        </Text>
        <PlanCard
          title="GROW 🌱"
          price="$79.99"
          rootStyles={{
            marginBottom: 26,
            borderColor: '#1A7056',
            borderStyle: 'dashed',
          }}
          period="year"
          active={plan === 1}
          onPress={() => setPlan(1)}
        />
        <PlanCard
          title="GROW"
          price="$12.99"
          period="month"
          rootStyles={{borderColor: BaseTheme.colors.neutral100}}
          active={plan === 2}
          onPress={() => setPlan(2)}
        />
        <Text color="neutral400" mt="xl" textAlign="center">
          Cancel anytime. Tax additional
        </Text>
        <Button
          label="Change Plan"
          onPress={() => console.log('change subscription')}
        />
        <TouchableOpacity
          onPress={() => console.log('cancel subscription')}
          style={styles.cancelSubscription}>
          <Text color="red" fontWeight="bold" textAlign={'center'}>
            Cancel Subscription{' '}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
