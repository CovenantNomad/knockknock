import React from 'react';
//states
import { useRecoilState } from 'recoil';
import { editRoutineState } from '@/stores/EditRoutineState';
//navigations
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RoutineDetailStackParamList } from '@/types/navigations/navigationTypes';
//components
import AppLayout from '@components/Atoms/Layout/AppLayout';
import Header from '@components/Atoms/Header/Header';
import HeaderBackButton from '@/components/Atoms/Header/HeaderBackButton';
import RoutineColorSectionTemplate from '@/components/Templates/Routine/RoutineColorSectionTemplate';

const RoutineEditColorScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RoutineDetailStackParamList>>();
  const [editRoutine, setEditRoutine] = useRecoilState(editRoutineState);

  const onSelectHandler = (item: string) => {
    setEditRoutine({
      ...editRoutine!,
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
        routine={editRoutine}
        onSelectHandler={onSelectHandler}
      />
    </AppLayout>
  );
};

export default RoutineEditColorScreen;
