import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
//navigation
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SettingStackParamList } from '@/types/navigations/navigationTypes';
//hooks
import useReminer from '@/hooks/useReminder';
//components
import AppLayout from '@/components/Atoms/Layout/AppLayout';
import ScrollViewContainer from '@/components/Atoms/Container/ScrollViewContainer';
import Header from '@/components/Atoms/Header/Header';
import HeaderLeft from '@/components/Atoms/Header/HeaderLeft';
import Margin from '@/components/Atoms/Margin';
//styles
import { FONT_SIZE, LINE_HEIGHT } from '@/styles/font';
import OpenColor from 'open-color';

interface ReminderScreenProps {}

const ReminderScreen = ({}: ReminderScreenProps) => {
  const { loadReminders, removeAllReminder } = useReminer();
  const navigation =
    useNavigation<NativeStackNavigationProp<SettingStackParamList>>();

  useEffect(() => {
    (async () => {
      const notifications = await loadReminders();
      console.log(notifications);
    })();
  }, []);

  return (
    <AppLayout>
      <Header headerLeft={() => <HeaderLeft navigation={navigation} />}>
        <Text style={{ fontSize: FONT_SIZE.BODY, color: OpenColor.black }}>
          알람설정
        </Text>
      </Header>
      <Margin space={16} />
      <ScrollViewContainer>
        <Text
          style={{
            fontSize: FONT_SIZE.CALLOUT,
            lineHeight: LINE_HEIGHT.CALLOUT,
            color: OpenColor.black,
          }}
        >
          전체 알람 해제
        </Text>
        <Margin space={12} />
        <Text
          style={{
            fontSize: FONT_SIZE.CALLOUT,
            lineHeight: LINE_HEIGHT.CALLOUT,
            color: OpenColor.black,
          }}
        >
          {`오류로 인해 불필요한 알람이 생성되었다면 모든 알람을 삭제하고 다시 루틴별로 재설정해 주시기 바랍니다.\n불편을 드려서 죄송합니다.`}
        </Text>
        <Margin space={16} />
        <View>
          <TouchableOpacity onPress={async () => await removeAllReminder()}>
            <Text>전체알람 해제</Text>
          </TouchableOpacity>
        </View>
      </ScrollViewContainer>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

export default ReminderScreen;
