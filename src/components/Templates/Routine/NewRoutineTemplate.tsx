import React, { Dispatch, SetStateAction } from 'react';
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
import RoutineNameCard from '@components/Organisms/Routine/RoutineNameCard';
import KeyboardAvoidingViewContainer from '@/components/Atoms/Container/KeyboardAvoidingViewLayout';
import SectionTitleText from '@/components/Atoms/Typography/SectionTitle';
import RoutineWeekdaySelect from '@/components/Organisms/Routine/RoutineWeekdaySelect';
import RoutineSelectButton from '@/components/Organisms/Routine/RoutineSelectButton';
import RoutineIconInput from '@/components/Organisms/Routine/RoutineIconInput';
import NotificationSwitch from '@/components/Blocks/NotificationSwitch/NotificationSwitch';
import Footer from '@/components/Atoms/Footer/Footer';
import Button from '@/components/Atoms/Button';

interface NewRoutineTemplateProps {
  icon: string;
  setIcon: Dispatch<SetStateAction<string>>;
  onSaveHandler: () => void;
}

const NewRoutineTemplate = ({
  icon,
  setIcon,
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
      <KeyboardAvoidingViewContainer>
        <HeadlineText text={'새로운 영적루틴'} />
        <Margin space={24} />
        <RoutineNameCard />
        <Margin space={24} />
        <RoutineIconInput title="Icon" icon={icon} setIcon={setIcon} />
        <Margin space={24} />
        <RoutineSelectButton
          title={'Color'}
          buttonLabel={createRoutine.color || '선택'}
          onPress={() => navigation.navigate('RoutineAddColor')}
        />
        <SectionTitleText text={'Weekdays'} />
        <Margin space={12} />
        <RoutineWeekdaySelect
          routine={createRoutine}
          setRoutine={setCreateRoutine}
        />
        <Margin space={24} />
        <RoutineSelectButton
          title={'Time'}
          buttonLabel={
            createRoutine.hour !== '' && createRoutine.minute !== ''
              ? `${createRoutine.hour}:${createRoutine.minute}`
              : '선택'
          }
          onPress={showDatePicker}
        />
        <NotificationSwitch
          title={'Notification'}
          tooltipText={'이름, 요일, 시간 설정시 알람설정 가능'}
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
      </KeyboardAvoidingViewContainer>
    </ScrollViewContainer>
  );
};

export default NewRoutineTemplate;
