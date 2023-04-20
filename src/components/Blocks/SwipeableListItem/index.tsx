import React from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { UseMutateAsyncFunction } from 'react-query';
import dayjs from 'dayjs';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '@/types/navigations/navigationTypes';
import { FONT_SIZE, LINE_HEIGHT } from '@/styles/font';
import { getDayText } from '@/utils/dateUtils';
import Margin from '@/components/Atoms/Margin';
import { updateDailyRoutineByIdProp } from '@/types/firebase/firebase';
import { FirebaseDailyRoutineType } from '@/types/routines/routineType';
import Fontisto from 'react-native-vector-icons/Fontisto';
import OpenColor from 'open-color';

interface SwipeableListItemProps {
  routine: FirebaseDailyRoutineType;
  selectedDate: dayjs.Dayjs;
  mutateAsync: UseMutateAsyncFunction<
    void,
    unknown,
    updateDailyRoutineByIdProp,
    unknown
  >;
}

const SwipeableListItem = ({
  routine,
  selectedDate,
  mutateAsync,
}: SwipeableListItemProps) => {
  const {
    name,
    color,
    icon,
    weekday,
    hour,
    minute,
    userId,
    routineId,
    isCompleted,
    hasNotification,
  } = routine;
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const renderRightAction = (
    dragX: Animated.AnimatedInterpolation<string | number>,
  ) => {
    const scale = dragX.interpolate({
      inputRange: [-60, 0],
      outputRange: [1, 0.5],
      extrapolate: 'clamp',
    });

    const opacity = dragX.interpolate({
      inputRange: [-60, -20, 0],
      outputRange: [1, 0.6, 0],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity
        onPress={() =>
          mutateAsync({
            uid: userId,
            date: selectedDate,
            routineId: routineId,
            completed: isCompleted,
          })
        }
      >
        <Animated.View style={[styles.button, { opacity: opacity }]}>
          <Animated.Text
            style={[
              styles.buttonLabel,
              {
                color: isCompleted ? '#E16A62' : '#0E336A',
                transform: [{ scale }],
                marginBottom: 4,
              },
            ]}
          >
            {isCompleted ? '😯' : '🙏'}
          </Animated.Text>
          <Animated.Text
            style={[
              styles.buttonLabel,
              {
                color: isCompleted ? '#E16A62' : '#0E336A',
                transform: [{ scale }],
              },
            ]}
          >
            {isCompleted ? '취소' : '아멘'}
          </Animated.Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderRightActions={(_, dragX) => renderRightAction(dragX)}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('HomeRoutineDetail', {
            screen: 'RoutineDetailMain',
            params: {
              routine: routine,
              previousRoute: 'HomeMain',
            },
          })
        }
      >
        <View style={styles.container}>
          <View style={[styles.label, { backgroundColor: color }]} />
          <View style={styles.content}>
            <View style={styles.iconWrapper}>
              {!isCompleted ? (
                <Text style={styles.icon}>{icon ? icon : '🙏'}</Text>
              ) : (
                <Fontisto name="check" size={20} color={OpenColor.blue[6]} />
              )}
            </View>
            <View style={styles.leftSide}>
              <Text
                style={[
                  styles.title,
                  {
                    color: isCompleted ? OpenColor.gray[2] : OpenColor.black,
                    textDecorationLine: isCompleted ? 'line-through' : 'none',
                  },
                ]}
              >
                {name}
              </Text>
              <Margin space={4} />
              <View style={styles.dayContainer}>
                {weekday.map((item, index) => (
                  <Text
                    key={index}
                    style={[
                      styles.daytext,
                      {
                        color: isCompleted
                          ? OpenColor.gray[2]
                          : OpenColor.gray[6],
                      },
                    ]}
                  >
                    {getDayText(item)}
                  </Text>
                ))}
              </View>
            </View>
            <View style={styles.rightSide}>
              {hasNotification && (
                <Fontisto
                  name="bell"
                  color={isCompleted ? OpenColor.gray[2] : OpenColor.black}
                />
              )}
              <Text
                style={[
                  styles.timetext,
                  {
                    color: isCompleted ? OpenColor.gray[2] : OpenColor.black,
                  },
                ]}
              >{`${hour}:${minute}`}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: OpenColor.white,
  },
  label: {
    width: 16,
    height: '100%',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  iconWrapper: {
    width: 52,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: OpenColor.gray[1],
    borderRadius: 12,
    marginRight: 16,
  },
  icon: {
    fontSize: 24,
  },
  leftSide: {
    flex: 1,
  },
  rightSide: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 16,
  },
  title: {
    fontSize: FONT_SIZE.BODY,
    fontWeight: '600',
  },
  dayContainer: {
    flexDirection: 'row',
  },
  daytext: {
    fontSize: FONT_SIZE.FOOTNOTE,
    lineHeight: LINE_HEIGHT.FOOTNOTE,
    marginRight: 4,
  },
  timetext: {
    fontSize: FONT_SIZE.CALLOUT,
    lineHeight: LINE_HEIGHT.CALLOUT,
    marginLeft: 8,
  },
  button: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  buttonLabel: {
    fontSize: FONT_SIZE.BODY,
    fontWeight: '800',
    color: OpenColor.black,
  },
});

export default SwipeableListItem;
