import React, { useCallback, useState } from 'react';
import { Keyboard, TouchableOpacity } from 'react-native';
//fetch
import { useMutation, useQueryClient } from 'react-query';
import {
  deleteRoutineFirebase,
  inActiveRoutineFirebase,
  updateRoutineFirebase,
} from '@api/routine/index';
//hooks
import useReminer from '@/hooks/useReminder';
import useRoutines from '@/hooks/useRoutines';
//navigations
import {
  HomeStackParamList,
  RoutineDetailStackParamList,
} from '@/types/navigations/navigationTypes';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
//components
import Header from '@/components/Atoms/Header/Header';
import HeaderLeft from '@/components/Atoms/Header/HeaderLeft';
import AppLayout from '@/components/Atoms/Layout/AppLayout';
import Margin from '@/components/Atoms/Margin';
import EditRoutineTemplate from '@/components/Templates/Routine/EditRoutineTemplate';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomSheet from '@/components/Blocks/BottomSheet';
//styles
import OpenColor from 'open-color';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

interface RoutineEditScreenProps {
  route: RouteProp<RoutineDetailStackParamList, 'RoutineEditMain'>;
}

const RoutineEditScreen = ({ route }: RoutineEditScreenProps) => {
  const {
    params: { routine, previousRoute },
  } = route;
  const queryClient = useQueryClient();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const { onUpdateRoutine, onActiveRoutine, onInactiveRoutine } = useRoutines();
  const { removeReminders } = useReminer();
  const [modalVisible, setModalVisible] = useState(false);
  const [isInactiveButton, setIsInactiveButton] = useState(false);

  const { mutateAsync: updateMutation } = useMutation(updateRoutineFirebase, {
    onSettled(data, error, variables, context) {
      queryClient.invalidateQueries({ queryKey: 'getRoutines' });
      queryClient.invalidateQueries({ queryKey: 'getRoutinesByDay' });
    },
  });

  const { mutateAsync: deleteMutaion } = useMutation(deleteRoutineFirebase, {
    onSettled(data, error, variables, context) {
      queryClient.invalidateQueries({ queryKey: 'getRoutines' });
      queryClient.invalidateQueries({ queryKey: 'getRoutinesByDay' });
    },
  });

  const { mutateAsync: inActiveMutaion } = useMutation(
    inActiveRoutineFirebase,
    {
      onSettled(data, error, variables, context) {
        queryClient.invalidateQueries({ queryKey: 'getRoutines' });
        queryClient.invalidateQueries({ queryKey: 'getRoutinesByDay' });
      },
    },
  );

  const onUpdateHandler = async () => {
    Keyboard.dismiss();
    const submitData = await onUpdateRoutine(routine);
    if (submitData !== undefined) {
      await updateMutation({ data: submitData, routineId: routine.routineId });
    }
    Toast.show({
      type: 'success',
      text1: '영적루틴을 수정했습니다',
      visibilityTime: 2500,
    });
    navigation.navigate(
      previousRoute === 'HomeMain' ? 'HomeMain' : 'HomeRoutineList',
    );
  };

  const onInactiveHandler = async () => {
    await onInactiveRoutine(routine);
    await inActiveMutaion({
      userId: routine.userId,
      routineId: routine.routineId,
    });
    Toast.show({
      type: 'error',
      text1: '영적루틴을 종료합니다',
      visibilityTime: 3000,
    });
    setModalVisible(false);
    navigation.navigate(
      previousRoute === 'HomeMain' ? 'HomeMain' : 'HomeRoutineList',
    );
  };

  const onActiveHandler = async () => {
    Keyboard.dismiss();
    const submitData = await onActiveRoutine(routine);
    if (submitData !== undefined) {
      await updateMutation({ data: submitData, routineId: routine.routineId });
    }
    setModalVisible(false);
    Toast.show({
      type: 'success',
      text1: '영적루틴을 다시 재개합니다',
      visibilityTime: 2500,
    });
    setModalVisible(false);
    navigation.navigate(
      previousRoute === 'HomeMain' ? 'HomeMain' : 'HomeRoutineList',
    );
  };

  const onDeleteHandler = async () => {
    const response = await deleteMutaion({
      userId: routine.userId,
      routineId: routine.routineId,
    });

    if (response) {
      if (routine.hasNotification && routine.notificationIds) {
        await removeReminders(routine.notificationIds);
      }
      navigation.navigate(
        previousRoute === 'HomeMain' ? 'HomeMain' : 'HomeRoutineList',
      );
    }
  };

  const headerRight = () => (
    <TouchableOpacity
      hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}
      onPress={onDeleteModalHandler}
    >
      <Ionicons name="ios-trash-outline" size={20} color={OpenColor.black} />
    </TouchableOpacity>
  );

  const onActiveModalHandler = useCallback(() => {
    Keyboard.dismiss();
    setIsInactiveButton(true);
    setModalVisible(true);
  }, []);

  const onDeleteModalHandler = useCallback(() => {
    Keyboard.dismiss();
    setIsInactiveButton(false);
    setModalVisible(true);
  }, []);

  return (
    <AppLayout>
      <Header
        headerLeft={() => <HeaderLeft navigation={navigation} />}
        headerRight={headerRight}
      />
      <Margin space={12} />
      <EditRoutineTemplate
        routine={routine}
        onActiveModalHandler={onActiveModalHandler}
        onUpdateHandler={onUpdateHandler}
      />
      <BottomSheet
        icon={routine.icon}
        name={routine.name}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        bodyText={
          isInactiveButton
            ? routine.isActive
              ? '\n이 루틴을 잠시 쉴까요?\n종료하면 다음날부터 적용됩니다'
              : '\n이 루틴을 다시 시작할까요?\n다시 견고히 세워갑시다'
            : '루틴을 삭제하면\n루틴과 관련된 모든 데이터가 삭제됩니다\n\n해당 영적루틴을 삭제하실껀가요?'
        }
        actionLabel={
          isInactiveButton ? (routine.isActive ? '종료' : '재개') : '삭제'
        }
        actionHandler={
          isInactiveButton
            ? routine.isActive
              ? onInactiveHandler
              : onActiveHandler
            : onDeleteHandler
        }
      />
    </AppLayout>
  );
};

export default RoutineEditScreen;
