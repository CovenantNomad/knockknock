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
import KeyboardAvoidingViewContainer from '@/components/Atoms/Container/KeyboardAvoidingViewLayout';
import RoutineWeekdaySelect from '@/components/Organisms/Routine/RoutineWeekdaySelect';
import RoutineSelectButton from '@/components/Organisms/Routine/RoutineSelectButton';
import EditRoutineNameCard from '@/components/Organisms/Routine/EditRoutineNameCard';
import { FirebaseDailyRoutineType } from '@/types/routines/routineType';
import EditRoutineIconInput from '@/components/Organisms/Routine/EditRoutineIconInput';
import Divider from '@/components/Atoms/Divider';
import SectionTitleText from '@/components/Atoms/Typography/SectionTitle';
import Button from '@/components/Atoms/Button';
import Footer from '@/components/Atoms/Footer/Footer';
import InactiveButton from '@/components/Atoms/Buttons/InactiveButton';
import NotificationSwitch from '@/components/Blocks/NotificationSwitch/NotificationSwitch';

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
  const { isDatePickerVisible, showDatePicker, hideDatePicker } =
    useDateTimePicker();

  const onToggelHandler = () => {
    setEditRoutine({
      ...editRoutine!,
      hasNotification: !editRoutine!.hasNotification,
    });
  };

  const handleConfirm = (time: Date) => {
    const hour = dayjs(time).hour();
    const minute = dayjs(time).minute();
    setEditRoutine({
      ...editRoutine!,
      hour: hour.toString().padStart(2, '0'),
      minute: minute.toString().padStart(2, '0'),
    });
    hideDatePicker();
  };

  return (
    <ScrollViewContainer>
      <KeyboardAvoidingViewContainer>
        <HeadlineText text={'영적루틴 수정하기'} />
        <Margin space={24} />
        <EditRoutineNameCard />
        <Margin space={24} />
        <EditRoutineIconInput defaultIcon={routine.icon || ''} />
        <Margin space={24} />
        <RoutineSelectButton
          title={'Color'}
          buttonLabel={routine.color || '선택'}
          onPress={() => navigation.navigate('RoutineEditColor')}
        />
        <SectionTitleText text={'Weekdays'} />
        <Margin space={12} />
        <RoutineWeekdaySelect
          routine={editRoutine}
          setRoutine={setEditRoutine}
        />
        <Margin space={24} />
        <RoutineSelectButton
          title={'Time'}
          buttonLabel={
            editRoutine.hour !== '' && editRoutine.minute !== ''
              ? `${editRoutine.hour}:${editRoutine.minute}`
              : '선택'
          }
          onPress={showDatePicker}
        />
        <NotificationSwitch
          title={'Notification'}
          tooltipText={'이름, 요일, 시간 설정시 알람설정 가능'}
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
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="time"
          date={dayjs()
            .hour(Number(routine.hour))
            .minute(Number(routine.minute))
            .toDate()}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          timePickerModeAndroid={'spinner'}
          is24Hour={true}
        />
        <Footer isModalFooter>
          <Button label="저장" onPress={onUpdateHandler} />
        </Footer>
      </KeyboardAvoidingViewContainer>
    </ScrollViewContainer>
  );
};

export default EditRoutineTemplate;
