import React, { useCallback, useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useQueryClient } from 'react-query';
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
//utils
import { getDayText } from '@/utils/dateUtils';
import CalendarStrip from '@/components/Blocks/CalendarStrip';

interface HomeScreenProps {}

const HomeScreen = ({}: HomeScreenProps) => {
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
          onPress={() => navigation.navigate('HomeRoutineList')}
        >
          <Ionicons name="ios-list-outline" size={24} color={OpenColor.black} />
        </TouchableOpacity>
        <Margin horizontal space={24} />
        <TouchableOpacity
          hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}
          onPress={() => navigation.navigate('HomeRoutineAdd')}
        >
          <Ionicons name="ios-add" size={24} color={OpenColor.black} />
        </TouchableOpacity>
        <Margin horizontal space={24} />
        <TouchableOpacity
          hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}
          onPress={() => navigation.navigate('Setting')}
        >
          <Ionicons
            name="ios-ellipsis-horizontal-sharp"
            size={24}
            color={OpenColor.black}
          />
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

  return (
    <AppLayout>
      <Header headerLeft={HeaderLeft} headerRight={HeaderRight} />
      <CalendarStrip
        selectedDate={selectedDate}
        handleConfirm={handleConfirm}
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
