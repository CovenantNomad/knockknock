import React from 'react';
import { Text } from 'react-native';
import { useForm } from 'react-hook-form';
//state
import { useRecoilState } from 'recoil';
import { editRoutineState } from '@/stores/EditRoutineState';
//navigation
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RoutineAddStackParamList } from '@/types/navigations/navigationTypes';
//components
import AppLayout from '@/components/Atoms/Layout/AppLayout';
import Header from '@/components/Atoms/Header/Header';
import HeaderBackButton from '@/components/Atoms/Header/HeaderBackButton';
import EditRoutineIconInput from '@/components/Organisms/Routine/EditRoutineIconInput';
//styles
import OpenColor from 'open-color';
import { FONT_SIZE } from '@/styles/font';
import { RoutineIconForm } from '../../RoutineAddNavigation/RoutineAddIconScreen';


interface RoutineEditIconScreenProps {}

const RoutineEditIconScreen = ({}: RoutineEditIconScreenProps) => {
  const navigation =
  useNavigation<NativeStackNavigationProp<RoutineAddStackParamList>>();
  const [ editRoutine, setEditRoutine] = useRecoilState(editRoutineState);
  const { handleSubmit, control, watch, formState: { errors }} = useForm<RoutineIconForm>({
    defaultValues: {
      icon: editRoutine.icon
    }
  });

  const onSubmitHandler = (data: RoutineIconForm) => {
    setEditRoutine({
      ...editRoutine,
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
      <EditRoutineIconInput
        control={control}
        errors={errors}
        watch={watch}
        onSaveHandler={handleSubmit(onSubmitHandler)}
      />
    </AppLayout>
  );
};

export default RoutineEditIconScreen;
