import React from 'react';
import dayjs from 'dayjs';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RoutineDetailStackParamList } from '@/types/navigations/navigationTypes';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
//states
import { useRecoilState } from 'recoil';
import { editRoutineState } from '@/stores/EditRoutineState';
// hooks
import useDateTimePicker from '@/hooks/useDateTimePicker';
// components
import ScrollViewContainer from '@components/Atoms/Container/ScrollViewContainer';
import HeadlineText from '@components/Atoms/Typography/HeadlineText';
import Margin from '@components/Atoms/Margin';
import RoutineWeekdaySelect from '@/components/Organisms/Routine/RoutineWeekdaySelect';
import RoutineSelectButton from '@/components/Organisms/Routine/RoutineSelectButton';
import Divider from '@/components/Atoms/Divider';
import SectionTitleText from '@/components/Atoms/Typography/SectionTitle';
import Button from '@/components/Atoms/Button';
import Footer from '@/components/Atoms/Footer/Footer';
import InactiveButton from '@/components/Atoms/Buttons/InactiveButton';
import NotificationSwitch from '@/components/Blocks/NotificationSwitch/NotificationSwitch';
//styles & types
import { FirebaseDailyRoutineType } from '@/types/routines/routineType';
import OpenColor from 'open-color';

interface EditRoutineTemplateProps {
  routine: FirebaseDailyRoutineType;
  onActiveModalHandler: () => void;
  onUpdateHandler: () => void;
}

const EditRoutineTemplate = ({
  routine,
  onActiveModalHandler,
  onUpdateHandler,
}: EditRoutineTemplateProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RoutineDetailStackParamList>>();
  const [editRoutine, setEditRoutine] = useRecoilState(editRoutineState);
  const {
    isDatePickerVisible,
    setDatePickerVisibility,
    showDatePicker,
    hideDatePicker,
  } = useDateTimePicker();

  const onToggelHandler = () => {
    setEditRoutine({
      ...editRoutine!,
      hasNotification: !editRoutine!.hasNotification,
    });
  };

  const handleConfirm = (time: Date) => {
    setDatePickerVisibility(false);
    const hour = dayjs(time).hour();
    const minute = dayjs(time).minute();
    setEditRoutine({
      ...editRoutine!,
      hour: hour.toString().padStart(2, '0'),
      minute: minute.toString().padStart(2, '0'),
    });
  };

  return (
    <ScrollViewContainer>
      <HeadlineText text={'영적루틴 수정하기'} />
      <Margin space={24} />
      <RoutineSelectButton
        title={'이름'}
        buttonLabel={editRoutine.name || '입력'}
        onPress={() => navigation.navigate('RoutineEditName')}
      />
      <Margin space={16} />
      <RoutineSelectButton
        title={'아이콘'}
        buttonLabel={editRoutine.icon || '입력'}
        onPress={() => navigation.navigate('RoutineEditIcon')}
      />
      <Margin space={16} />
      <RoutineSelectButton
        title={'태그 색상'}
        buttonLabel={editRoutine.color || '선택'}
        bgColor={editRoutine.color || OpenColor.white}
        onPress={() => navigation.navigate('RoutineEditColor')}
      />
      <Margin space={16} />
      <SectionTitleText text={'반복'} />
      <Margin space={12} />
      <RoutineWeekdaySelect
        routine={editRoutine}
        setRoutine={setEditRoutine}
      />
      <Margin space={28} />
      <RoutineSelectButton
        title={'약속시간'}
        buttonLabel={
          editRoutine.hour !== '' && editRoutine.minute !== ''
            ? `${editRoutine.hour}:${editRoutine.minute}`
            : '선택'
        }
        onPress={showDatePicker}
      />
      <NotificationSwitch
        title={'알람'}
        tooltipText={'이름, 요일, 시간을 설정하면 알람기능 활성화'}
        value={editRoutine.hasNotification}
        disabled={
          editRoutine.weekday.filter(item => item.selected === true)
            .length === 0 ||
          editRoutine.hour === null ||
          editRoutine.minute === null ||
          editRoutine.name === ''
        }
        onChange={onToggelHandler}
      />
      <Margin space={24} />
      <Divider />
      <Margin space={24} />
      <InactiveButton
        label={routine.isActive ? '루틴 종료' : '루틴 재개'}
        onPress={onActiveModalHandler}
      />
      <Margin space={64} />
      <Footer isModalFooter>
        <Button label="저장" onPress={onUpdateHandler} />
      </Footer>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        date={dayjs()
          .hour(Number(editRoutine.hour))
          .minute(Number(editRoutine.minute))
          .toDate()}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        timePickerModeAndroid={'spinner'}
        is24Hour={true}
      />
    </ScrollViewContainer>
  );
};

export default EditRoutineTemplate;
