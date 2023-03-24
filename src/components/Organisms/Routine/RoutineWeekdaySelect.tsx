import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SetterOrUpdater } from 'recoil';
import { RoutineType, WeekdayType } from '@/types/routines/routineType';
import OpenColor from 'open-color';

interface RenderItemProps {
  item: WeekdayType;
  index: number;
}

interface RoutineWeekdaySelectProps {
  routine: RoutineType;
  setRoutine: SetterOrUpdater<RoutineType>;
}

const RoutineWeekdaySelect = ({
  routine,
  setRoutine,
}: RoutineWeekdaySelectProps) => {
  const onToggleSelect = (id: number) => {
    const updateWeekday = routine.weekday.map(weekday =>
      weekday.id === id ? { ...weekday, selected: !weekday.selected } : weekday,
    );
    setRoutine({
      ...routine,
      weekday: updateWeekday,
    });
  };

  const renderItems = ({ item: weekday }: RenderItemProps) => {
    return (
      <TouchableOpacity
        style={[
          styles.circleSelector,
          {
            backgroundColor: weekday.selected ? '#B0D2D4' : OpenColor.white,
          },
        ]}
        onPress={() => onToggleSelect(weekday.id)}
      >
        <Text
          style={{
            color: weekday.selected ? OpenColor.white : OpenColor.gray[4],
          }}
        >
          {weekday.title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={routine.weekday}
      keyExtractor={item => `${item.id}`}
      renderItem={renderItems}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-around',
      }}
    />
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  circleSelector: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RoutineWeekdaySelect;
