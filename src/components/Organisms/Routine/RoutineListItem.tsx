import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
//navigation
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '@/types/navigations/navigationTypes';
//components
import Margin from '@/components/Atoms/Margin';
import Ionicons from 'react-native-vector-icons/Ionicons';
//styles
import OpenColor from 'open-color';
import { FONT_SIZE, LINE_HEIGHT } from '@/styles/font';
import { FirebaseDailyRoutineType } from '@/types/routines/routineType';
import { getDayText } from '@/utils/dateUtils';

interface RoutineListItemProps {
  routine: FirebaseDailyRoutineType;
}

const RoutineListItem = ({ routine }: RoutineListItemProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('HomeRoutineDetail', {
          screen: 'RoutineDetailMain',
          params: {
            routine: routine,
            previousRoute: 'HomeRoutineList',
          },
        })
      }
    >
      <View style={styles.container}>
        <View style={styles.leftside}>
          <Text style={{ fontSize: 24, marginRight: 12 }}>
            {routine.icon ? routine.icon : '🙏'}
          </Text>
          <View>
            <Text style={styles.title}>{routine.name}</Text>
          </View>
        </View>
        <View style={styles.rightside}>
          <View style={styles.dayContainer}>
            {routine.weekday.map((item, index) => (
              <Text
                key={index}
                style={[styles.daytext, { marginLeft: index === 0 ? 0 : 4 }]}
              >
                {getDayText(item)}
              </Text>
            ))}
          </View>
          <Margin space={4} />
          <View style={styles.timeContainer}>
            {routine.hasNotification && (
              <Ionicons
                name="ios-notifications-sharp"
                color={OpenColor.black}
                size={14}
                style={{ marginRight: 6 }}
              />
            )}
            <Text style={styles.timetext}>
              {`${routine.hour}:${routine.minute}`}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: OpenColor.white,
    borderRadius: 12,
  },
  leftside: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightside: {},
  title: {
    fontSize: FONT_SIZE.BODY,
    color: OpenColor.black,
  },
  dayContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  daytext: {
    fontSize: FONT_SIZE.CALLOUT,
    lineHeight: LINE_HEIGHT.CALLOUT,
    color: OpenColor.gray[6],
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'flex-end',
  },
  timetext: {
    fontSize: FONT_SIZE.HEADING_3,
    lineHeight: LINE_HEIGHT.HEADING_3,
    color: OpenColor.black,
  },
});

export default RoutineListItem;
