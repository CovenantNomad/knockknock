import React from 'react';
import { Text } from 'react-native';
//navigation
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RoutineAddStackParamList } from '@/types/navigations/navigationTypes';
//components
import AppLayout from '@/components/Atoms/Layout/AppLayout';
import Header from '@/components/Atoms/Header/Header';
import HeaderBackButton from '@/components/Atoms/Header/HeaderBackButton';
//styles
import OpenColor from 'open-color';
import { FONT_SIZE } from '@/styles/font';
import EditRoutineName from '@/components/Organisms/Routine/EditRoutineName';
import { useRecoilState } from 'recoil';
import { editRoutineState } from '@/stores/EditRoutineState';
import { useForm } from 'react-hook-form';
import { RoutineNameForm } from '../../RoutineAddNavigation/RoutineAddNameScreen';

interface RoutineEditNameScreenProps {}

const RoutineEditNameScreen = ({}: RoutineEditNameScreenProps) => {
  const navigation =
  useNavigation<NativeStackNavigationProp<RoutineAddStackParamList>>();
  const [editRoutine, setEditRoutine] = useRecoilState(editRoutineState);
  const { handleSubmit, control, watch, formState: { errors }} = useForm<RoutineNameForm>({
    defaultValues: {
      name: editRoutine.name
    }
  });

  const onSubmitHandler = (data: RoutineNameForm) => {
    setEditRoutine({
      ...editRoutine,
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
      <EditRoutineName 
          control={control}
          errors={errors}
          watch={watch}
          onSaveHandler={handleSubmit(onSubmitHandler)}
        />
    </AppLayout>
  );
};

export default RoutineEditNameScreen;
