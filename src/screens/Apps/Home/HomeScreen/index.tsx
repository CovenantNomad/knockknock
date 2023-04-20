import React, { useCallback, useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useMutation, useQuery, useQueryClient } from 'react-query';
//apis
import { checkDailyRoutineById, getRoutinesByDay } from '@/api/routine';
import { getBibleByDate } from '@/api/bibleCalendar';
//state
import AuthContext from '@/stores/AuthContext';
//hooks
import useCalendarStrip from '@/hooks/useCalendarStrip';
//naviations
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '@/types/navigations/navigationTypes';
//styles
import OpenColor from 'open-color';
import { FONT_SIZE } from '@/styles/font';
//components
import AppLayout from '@/components/Atoms/Layout/AppLayout';
import Header from '@/components/Atoms/Header/Header';
import Margin from '@/components/Atoms/Margin';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HeaderActionGroup from '@/components/Atoms/Header/HeaderActionGroup';
import CalendarStrip from '@/components/Blocks/CalendarStrip';
import HomeTemplate from '@/components/Templates/Home/HomeTemplate';
//types
import { FirebaseDailyRoutineType } from '@/types/routines/routineType';
import { BibleType } from '@/types/firebase/firebase';
//utils
import { getDayText } from '@/utils/dateUtils';
import dayjs from 'dayjs';

interface HomeScreenProps {}

const HomeScreen = ({}: HomeScreenProps) => {
  const now = dayjs();
  const queryClient = useQueryClient();
  const { userInfo } = useContext(AuthContext);
  const { selectedDate, handleConfirm } = useCalendarStrip();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const HeaderRight = useCallback(() => {
    return (
      <HeaderActionGroup>
        <TouchableOpacity
          hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}
          onPress={() => navigation.navigate('HomeRoutineAdd')}
        >
          <Ionicons name="ios-add" size={24} color={OpenColor.black} />
        </TouchableOpacity>
        <Margin horizontal space={24} />
        <TouchableOpacity
          hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}
          onPress={() => navigation.navigate('HomeRoutineList')}
        >
          <Ionicons name="ios-list-outline" size={24} color={OpenColor.black} />
        </TouchableOpacity>
      </HeaderActionGroup>
    );
  }, [navigation]);

  const HeaderLeft = useCallback(() => {
    return (
      <Text
        style={{
          fontSize: FONT_SIZE.HEADING_3,
          fontWeight: '700',
          color: OpenColor.black,
        }}
      >
        {selectedDate.get('month') + 1}월 {selectedDate.get('date')}일{' '}
        {getDayText(selectedDate.get('day'))}요일
      </Text>
    );
  }, [selectedDate]);

  const { isLoading, data } = useQuery<FirebaseDailyRoutineType[]>(
    [
      'getRoutinesByDay',
      {
        date: selectedDate.format('YY-MM-DD'),
        day: selectedDate.get('day'),
        uid: userInfo!.uid,
      },
    ],
    () =>
      getRoutinesByDay(
        selectedDate.format('YY-MM-DD'),
        selectedDate.get('day'),
        userInfo!.uid,
      ),
    {
      enabled: !!selectedDate && !!userInfo,
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10,
    },
  );

  const { isLoading: isBibleLoading, data: bibleData } = useQuery<BibleType>(
    ['getBibleByDate', { date: String(selectedDate.get('date')) }],
    () => getBibleByDate(String(selectedDate.get('date'))),
    {
      enabled: !!selectedDate,
      staleTime: 1000 * 60 * 60 * 12,
      cacheTime: 1000 * 60 * 60 * 24,
    },
  );

  const { mutateAsync } = useMutation(checkDailyRoutineById, {
    onMutate: async variables => {
      await queryClient.cancelQueries([
        'getRoutinesByDay',
        {
          date: selectedDate.format('YY-MM-DD'),
          day: selectedDate.get('day'),
          uid: userInfo!.uid,
        },
      ]);
      const previousRoutines = queryClient.getQueryData<
        FirebaseDailyRoutineType[]
      >([
        'getRoutinesByDay',
        {
          date: selectedDate.format('YY-MM-DD'),
          day: selectedDate.get('day'),
          uid: userInfo!.uid,
        },
      ]);

      const updateRoutines = previousRoutines?.map(item =>
        item.routineId === variables.routineId
          ? { ...item, isCompelted: !item.isCompleted }
          : item,
      );

      queryClient.setQueryData(
        [
          'getRoutinesByDay',
          {
            date: selectedDate.format('YY-MM-DD'),
            day: selectedDate.get('day'),
            uid: userInfo!.uid,
          },
        ],
        updateRoutines,
      );

      return { previousRoutines };
    },
    onError(error, variables, context) {
      queryClient.setQueryData(
        [
          'getRoutinesByDay',
          {
            date: selectedDate.format('YY-MM-DD'),
            day: selectedDate.get('day'),
            uid: userInfo!.uid,
          },
        ],
        context?.previousRoutines,
      );
    },
    onSettled(data, error, variables) {
      queryClient.invalidateQueries([
        'getRoutinesByDay',
        {
          date: selectedDate.format('YY-MM-DD'),
          day: selectedDate.get('day'),
          uid: userInfo!.uid,
        },
      ]);
      queryClient.invalidateQueries({ queryKey: ['getRoutineStaticById'] });
      queryClient.invalidateQueries({ queryKey: ['getMonthlyTrends'] });
    },
  });

  return (
    <AppLayout>
      <Header headerLeft={HeaderLeft} headerRight={HeaderRight} />
      <CalendarStrip
        selectedDate={selectedDate}
        handleConfirm={handleConfirm}
      />
      <HomeTemplate
        data={data}
        isLoading={isLoading}
        bible={bibleData}
        isBibleLoading={isBibleLoading}
        selectedDate={selectedDate}
        mutateAsync={mutateAsync}
      />
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

export default HomeScreen;
