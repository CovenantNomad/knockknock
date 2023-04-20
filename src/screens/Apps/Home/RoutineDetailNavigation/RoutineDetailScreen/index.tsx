import React, { useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useRecoilState } from 'recoil';
import { editRoutineState } from '@/stores/EditRoutineState';
import { WEEKDAYS } from '@/constants/defaultValues';
//hooks
import { useStatics } from '@/hooks/useStatics';
// navigation
import {
  HomeStackParamList,
  RoutineDetailStackParamList,
} from '@/types/navigations/navigationTypes';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
//components
import Header from '@/components/Atoms/Header/Header';
import HeaderLeft from '@/components/Atoms/Header/HeaderLeft';
import AppLayout from '@/components/Atoms/Layout/AppLayout';
import Margin from '@/components/Atoms/Margin';
import RoutineDetailTemplate from '@/components/Templates/Routine/RoutineDetailTemplate';
//styles
import Ionicons from 'react-native-vector-icons/Ionicons';
import OpenColor from 'open-color';

interface RoutineDetailScreenProps {
  route: RouteProp<RoutineDetailStackParamList, 'RoutineDetailMain'>;
}

const RoutineDetailScreen = ({ route }: RoutineDetailScreenProps) => {
  const {
    params: { routine, previousRoute },
  } = route;
  const {
    isLoading,
    isMonthlyTrendsLoading,
    stats,
    weeklyPerformance,
    lastFiveMonthResults,
  } = useStatics({
    uid: routine.userId,
    routineId: routine.routineId,
  });
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const [editRoutine, setEditRoutine] = useRecoilState(editRoutineState);

  const headerRight = () => (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity
        hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
        onPress={() => {
          navigation.navigate('HomeRoutineDetail', {
            screen: 'RoutineEditMain',
            params: {
              routine: routine,
              previousRoute: previousRoute,
            },
          });
        }}
        style={{ padding: 4 }}
      >
        <Ionicons name="ios-create-outline" size={24} color={OpenColor.black} />
      </TouchableOpacity>
    </View>
  );

  useEffect(() => {
    setEditRoutine({
      name: routine.name,
      icon: routine.icon,
      color: routine.color,
      weekday: WEEKDAYS.map(item =>
        routine?.weekday.includes(item.id)
          ? { ...item, selected: true }
          : { ...item, selected: false },
      ),
      hour: routine.hour,
      minute: routine.minute,
      hasNotification: routine.hasNotification,
      notificationIds: routine.notificationIds,
      userId: routine.userId,
      isActive: routine.isActive,
      isPeriodRoutine: routine.isPeriodRoutine,
    });
  }, []);

  return (
    <AppLayout>
      <Header
        headerLeft={() => <HeaderLeft navigation={navigation} />}
        headerRight={headerRight}
      />
      <Margin space={12} />
      <RoutineDetailTemplate
        title={
          `${editRoutine.icon} ${editRoutine.name}` ||
          `${routine.icon} ${routine.name}`
        }
        stats={stats}
        weeklyPerformance={weeklyPerformance}
        lastFiveMonthResults={lastFiveMonthResults}
        isLoading={isLoading}
        isMonthlyTrendsLoading={isMonthlyTrendsLoading}
      />
    </AppLayout>
  );
};

export default RoutineDetailScreen;
