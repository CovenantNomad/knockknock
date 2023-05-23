import React from 'react';
import { Text } from 'react-native';
import { useForm } from 'react-hook-form';
//store
import { useRecoilState } from 'recoil';
import { createRoutineState } from '@/stores/CreateRoutineState';
//navgiation
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RoutineAddStackParamList } from '@/types/navigations/navigationTypes';
//components
import AppLayout from '@/components/Atoms/Layout/AppLayout';
import Header from '@/components/Atoms/Header/Header';
import HeaderBackButton from '@/components/Atoms/Header/HeaderBackButton';
//styles
import { FONT_SIZE } from '@/styles/font';
import OpenColor from 'open-color';
import RoutineIconInput from '@/components/Organisms/Routine/RoutineIconInput';


export interface RoutineIconForm {
  icon: string;
}

const RoutineAddIconScreen = () => {
  const navigation =
  useNavigation<NativeStackNavigationProp<RoutineAddStackParamList>>();
  const [createRoutine, setCreateRoutine] = useRecoilState(createRoutineState);
  const { handleSubmit, control, watch, formState: { errors }} = useForm<RoutineIconForm>({
    defaultValues: {
      icon: createRoutine.icon
    }
  });

  const onSubmitHandler = (data: RoutineIconForm) => {
    setCreateRoutine({
      ...createRoutine,
      icon: data.icon
    })
    navigation.goBack()
  }
  return (
    <AppLayout>
      <Header
        headerLeft={() =>
          HeaderBackButton({
            goBack: navigation.goBack,
            canGoBack: navigation.canGoBack(),
          })
        }
      >
        <Text style={{ fontSize: FONT_SIZE.BODY, color: OpenColor.black }}>
          영적루틴 아이콘
        </Text>
      </Header>
      <RoutineIconInput
        control={control}
        errors={errors}
        watch={watch}
        onSaveHandler={handleSubmit(onSubmitHandler)}
      />
    </AppLayout>
  );
};

export default RoutineAddIconScreen;
