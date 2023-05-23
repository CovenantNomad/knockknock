import React, { useContext, useEffect, useState } from 'react';
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
import SectionTitleText from '@/components/Atoms/Typography/SectionTitle';
import AuthContext from '@/stores/AuthContext';
import AuthProvider from '@/stores/AuthProvider';
import { getRoutinesWithNotification } from '@/api/routine';
import { useMutation, useQueryClient } from 'react-query';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import Button from '@/components/Atoms/Button';

interface ReminderScreenProps {}

const ReminderScreen = ({}: ReminderScreenProps) => {
  const queryClient = useQueryClient();
  const { userInfo } = useContext(AuthContext);
  const { removeAllReminder, loadReminders } = useReminer();
  const navigation =
    useNavigation<NativeStackNavigationProp<SettingStackParamList>>();

  const { mutateAsync } = useMutation(getRoutinesWithNotification, {
    onSettled(data, error, variables) {
      queryClient.invalidateQueries({ queryKey: ['getRoutinesByDay'] });
      queryClient.invalidateQueries({ queryKey: ['getRoutines'] });
    },
  });

  const onClickHandler = async () => {
    if (userInfo) {
      const result = await mutateAsync(userInfo.uid)
      if (result) {
        await removeAllReminder()
        Toast.show({
          type: 'success',
          text1: '모든 알람설정을 해제했습니다',
          visibilityTime: 2000,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: '서버에서 알람설정을 해제하지 못했습니다',
        });
      }
    }
  }

  useEffect(() => {
    (async () => {
      const reminder = await loadReminders() 
      console.log(userInfo?.username, reminder)
    })()
  }, [])

  return (
    <AppLayout>
      <Header headerLeft={() => <HeaderLeft navigation={navigation} />}>
        <Text style={{ fontSize: FONT_SIZE.BODY, color: OpenColor.black }}>
          알람설정
        </Text>
      </Header>
      <Margin space={16} />
      <ScrollViewContainer>
        <SectionTitleText text='전체 알람 해제' />
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
        <Margin space={32} />
        <View>
          <Button 
            label='전체알람 해제'
            onPress={onClickHandler}
          />
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
