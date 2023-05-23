import React from 'react';
import dayjs from 'dayjs';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RoutineAddStackParamList } from '@/types/navigations/navigationTypes';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
//states
import { useRecoilState } from 'recoil';
import { createRoutineState } from '@/stores/CreateRoutineState';
//hooks
import useDateTimePicker from '@/hooks/useDateTimePicker';
//components
import ScrollViewContainer from '@components/Atoms/Container/ScrollViewContainer';
import HeadlineText from '@components/Atoms/Typography/HeadlineText';
import Margin from '@components/Atoms/Margin';
import SectionTitleText from '@/components/Atoms/Typography/SectionTitle';
import RoutineWeekdaySelect from '@/components/Organisms/Routine/RoutineWeekdaySelect';
import RoutineSelectButton from '@/components/Organisms/Routine/RoutineSelectButton';
import RoutineIconInput from '@/components/Organisms/Routine/RoutineIconInput';
import NotificationSwitch from '@/components/Blocks/NotificationSwitch/NotificationSwitch';
import Button from '@/components/Atoms/Button';
import OpenColor from 'open-color';

interface NewRoutineTemplateProps {
  onSaveHandler: () => void;
}

const NewRoutineTemplate = ({
  onSaveHandler,
}: NewRoutineTemplateProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RoutineAddStackParamList>>();
  const [createRoutine, setCreateRoutine] = useRecoilState(createRoutineState);
  const { date, isDatePickerVisible, setDate, showDatePicker, hideDatePicker } =
    useDateTimePicker();

  const onToggelHandler = () => {
    setCreateRoutine({
      ...createRoutine,
      hasNotification: !createRoutine.hasNotification,
    });
  };

  const handleConfirm = (time: Date) => {
    hideDatePicker();
    const hour = dayjs(time).hour();
    const minute = dayjs(time).minute();
    setDate(time);
    setCreateRoutine({
      ...createRoutine,
      hour: hour.toString().padStart(2, '0'),
      minute: minute.toString().padStart(2, '0'),
    });
  };

  return (
    <ScrollViewContainer>
      <HeadlineText text={'새로운 영적루틴'} />
      <Margin space={24} />
      <RoutineSelectButton
        title={'이름'}
        buttonLabel={createRoutine.name || '입력'}
        onPress={() => navigation.navigate('RoutineAddName')}
      />
      <Margin space={16} />
      <RoutineSelectButton
        title={'아이콘'}
        buttonLabel={createRoutine.icon || '입력'}
        onPress={() => navigation.navigate('RoutineAddIcon')}
      />
      <Margin space={16} />
      <RoutineSelectButton
        title={'태그 색상'}
        buttonLabel={createRoutine.color || '선택'}
        bgColor={createRoutine.color || OpenColor.white}
        onPress={() => navigation.navigate('RoutineAddColor')}
      />
      <Margin space={16} />
      <SectionTitleText text={'반복'} />
      <Margin space={12} />
      <RoutineWeekdaySelect
        routine={createRoutine}
        setRoutine={setCreateRoutine}
      />
      <Margin space={28} />
      <RoutineSelectButton
        title={'약속시간'}
        buttonLabel={
          createRoutine.hour !== '' && createRoutine.minute !== ''
            ? `${createRoutine.hour}:${createRoutine.minute}`
            : '선택'
        }
        onPress={showDatePicker}
      />
      <Margin space={16} />
      <NotificationSwitch
        title={'알람'}
        tooltipText={'이름, 요일, 시간을 설정하면 알람기능 활성화'}
        value={createRoutine.hasNotification}
        disabled={
          createRoutine.weekday.filter(item => item.selected === true)
            .length === 0 ||
          createRoutine.hour === null ||
          createRoutine.minute === null ||
          createRoutine.name === ''
        }
        onChange={onToggelHandler}
      />
      <Margin space={36} />
      <Button
        label="저장"
        onPress={onSaveHandler}
        disabled={createRoutine.name === '' || createRoutine.hour === ''}
      />
      <Margin space={16} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        date={date}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        timePickerModeAndroid={'spinner'}
        is24Hour={true}
      />
    </ScrollViewContainer>
  );
};

export default NewRoutineTemplate;
