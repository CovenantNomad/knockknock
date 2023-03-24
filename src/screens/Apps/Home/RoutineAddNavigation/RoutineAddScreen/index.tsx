import React, { useState } from 'react';
import { Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '@/types/navigations/navigationTypes';
import { DEFAULTROUTINE } from '@/constants/defaultValues';
// hooks
import useRoutines from '@/hooks/useRoutines';
// components
import AppLayout from '@components/Atoms/Layout/AppLayout';
import Header from '@components/Atoms/Header/Header';
import HeaderBackButton from '@/components/Atoms/Header/HeaderBackButton';
import NewRoutineTemplate from '@components/Templates/Routine/NewRoutineTemplate';
import Margin from '@/components/Atoms/Margin';
import Footer from '@/components/Atoms/Footer/Footer';
import { useQueryClient } from 'react-query';
import { createRoutineFirebase } from '@/api/routine/routine';

import { Toast } from 'react-native-toast-message/lib/src/Toast';
import Button from '@/components/Atoms/Button';

const RoutineAddScreen = () => {
  const queryClient = useQueryClient();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const [name, setName] = useState<string>('');
  const [icon, setIcon] = useState<string>('');
  const { createRoutine, setCreateRoutine, onCreateRoutine } = useRoutines();

  const onSaveHandler = async () => {
    Keyboard.dismiss();
    const data = onCreateRoutine();
    if (data) {
      if (data.name === '') {
        Toast.show({
          type: 'error',
          text1: '루틴이름을 작성해주세요',
          visibilityTime: 2000,
        });
        return;
      }
      if (data.hour === '') {
        Toast.show({
          type: 'error',
          text1: '루틴시간을 작성해주세요',
          visibilityTime: 2000,
        });
        return;
      }

      const response = await createRoutineFirebase(data);
      if (response?.routineId) {
        Toast.show({
          type: 'success',
          text1: '루틴을 생성했습니다',
          visibilityTime: 2000,
        });
        setCreateRoutine(DEFAULTROUTINE);
        setName('');
        setIcon('');
        queryClient.invalidateQueries(['getRoutinesByDay']);
      }
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
        name={name}
        setName={setName}
        icon={icon}
        setIcon={setIcon}
      />
      <Margin space={24} />
      <Footer>
        <Button
          label="저장"
          onPress={onSaveHandler}
          disabled={createRoutine.name === '' || createRoutine.hour === ''}
        />
      </Footer>
    </AppLayout>
  );
};

export default RoutineAddScreen;
