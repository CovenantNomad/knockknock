import React from 'react';
import { Keyboard } from 'react-native';
//navigation
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '@/types/navigations/navigationTypes';
//fetch
import { useMutation, useQueryClient } from 'react-query';
import { createRoutineFirebase } from '@/api/routine';
// hooks
import useRoutines from '@/hooks/useRoutines';
// components
import AppLayout from '@components/Atoms/Layout/AppLayout';
import Header from '@components/Atoms/Header/Header';
import HeaderBackButton from '@/components/Atoms/Header/HeaderBackButton';
import NewRoutineTemplate from '@components/Templates/Routine/NewRoutineTemplate';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { DEFAULTROUTINE } from '@/constants/defaultValues';
import { useRecoilValue } from 'recoil';
import { createRoutineState } from '@/stores/CreateRoutineState';

const RoutineAddScreen = () => {
  const queryClient = useQueryClient();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const createRoutine = useRecoilValue(createRoutineState);
  const { setCreateRoutine, onCreateRoutine } = useRoutines();
  

  const { mutateAsync: createRoutineMutation } = useMutation(
    createRoutineFirebase,
    {
      onSettled(data, error, variables, context) {
        queryClient.invalidateQueries({ queryKey: ['getRoutines'] });
        queryClient.invalidateQueries({
          queryKey: ['getRoutinesByDay'],
        });
      },
    },
  );

  const onSaveHandler = async () => {
    if (createRoutine.name === '') {
      Toast.show({
        type: 'error',
        text1: '루틴이름을 작성해주세요',
        visibilityTime: 2000,
      });
      return;
    }
    if (createRoutine.hour === '') {
      Toast.show({
        type: 'error',
        text1: '루틴시간을 작성해주세요',
        visibilityTime: 2000,
      });
      return;
    }

    const data = await onCreateRoutine();
    if (data) {
      const response = await createRoutineMutation(data);
      if (response?.routineId) {
        Toast.show({
          type: 'success',
          text1: '루틴을 생성했습니다',
          visibilityTime: 2000,
        });
        setCreateRoutine(DEFAULTROUTINE);
      }
    } else {
      Toast.show({
        type: 'error',
        text1: '새로운 루틴을 생성하지 못했습니다.',
        visibilityTime: 2000,
      });
    }
  };

  return (
    <AppLayout>
      <Header
        headerLeft={() =>
          HeaderBackButton({
            goBack: () => {
              setCreateRoutine(DEFAULTROUTINE);
              navigation.goBack();
            },
            canGoBack: navigation.canGoBack(),
          })
        }
      />
      <NewRoutineTemplate
        onSaveHandler={onSaveHandler}
      />
    </AppLayout>
  );
};

export default RoutineAddScreen;
