import React from 'react';
//navigations
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RoutineAddStackParamList } from '@/types/navigations/navigationTypes';
//states
import { useRecoilState } from 'recoil';
import { createRoutineState } from '@/stores/CreateRoutineState';
//components
import AppLayout from '@components/Atoms/Layout/AppLayout';
import Header from '@components/Atoms/Header/Header';
import HeaderBackButton from '@/components/Atoms/Header/HeaderBackButton';
import RoutineColorSectionTemplate from '@/components/Templates/Routine/RoutineColorSectionTemplate';

const RoutineAddColorScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RoutineAddStackParamList>>();
  const [createRoutine, setCreateRoutine] = useRecoilState(createRoutineState);

  const onSelectHandler = (item: string) => {
    setCreateRoutine({
      ...createRoutine,
      color: item,
    });
  };
  return (
    <AppLayout>
      <Header
        headerLeft={() =>
          HeaderBackButton({
            goBack: navigation.goBack,
            canGoBack: navigation.canGoBack(),
          })
        }
      />
      <RoutineColorSectionTemplate
        routine={createRoutine}
        onSelectHandler={onSelectHandler}
      />
    </AppLayout>
  );
};

export default RoutineAddColorScreen;
