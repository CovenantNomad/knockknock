import React from 'react';
import { Text } from 'react-native';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { createRoutineState } from '@/stores/CreateRoutineState';
//navigations
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RoutineAddStackParamList } from '@/types/navigations/navigationTypes';
//components
import Header from '@/components/Atoms/Header/Header';
import HeaderBackButton from '@/components/Atoms/Header/HeaderBackButton';
import AppLayout from '@/components/Atoms/Layout/AppLayout';
import RoutineName from '@/components/Organisms/Routine/RoutineName';
//styles
import { FONT_SIZE } from '@/styles/font';
import OpenColor from 'open-color';


interface RoutineAddNameScreenProps {}

export interface RoutineNameForm {
  name: string;
}

const RoutineAddNameScreen = ({}: RoutineAddNameScreenProps) => {
  const navigation =
  useNavigation<NativeStackNavigationProp<RoutineAddStackParamList>>();
  const [createRoutine, setCreateRoutine] = useRecoilState(createRoutineState);
  const { handleSubmit, control, watch, formState: { errors }} = useForm<RoutineNameForm>({
    defaultValues: {
      name: createRoutine.name
    }
  });

  const onSubmitHandler = (data: RoutineNameForm) => {
    setCreateRoutine({
      ...createRoutine,
      name: data.name
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
          영적루틴 이름
        </Text>
      </Header>
      <RoutineName
        control={control}
        errors={errors}
        watch={watch}
        onSaveHandler={handleSubmit(onSubmitHandler)}
      />
    </AppLayout>
  );
};

export default RoutineAddNameScreen;
