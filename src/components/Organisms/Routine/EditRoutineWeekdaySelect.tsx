import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useRecoilState } from 'recoil';
import { editRoutineState } from '@/stores/EditRoutineState';
import OpenColor from 'open-color';
import { WEEKDAYS } from '@/constants/defaultValues';
import { WeekdayType } from '@/types/routines/routineType';

interface RenderItemProps {
  item: WeekdayType;
  index: number;
}

const EditRoutineWeekdaySelect = () => {
  const [editRoutine, setEditRoutine] = useRecoilState(editRoutineState);
  const [updateWeekday, setUpdateWeekday] = useState(WEEKDAYS);

  const onToggleSelect = useCallback(
    (id: number) => {
      setUpdateWeekday(
        updateWeekday.map(weekday =>
          weekday.id === id
            ? { ...weekday, selected: !weekday.selected }
            : weekday,
        ),
      );
    },
    [updateWeekday],
  );

  useEffect(() => {
    setUpdateWeekday(
      WEEKDAYS.map(item =>
        editRoutine?.weekday.includes(item.id)
          ? { ...item, selected: true }
          : { ...item, selected: false },
      ),
    );
  }, []);

  const renderItems = ({ item: weekday }: RenderItemProps) => {
    return (
      <TouchableOpacity
        style={[
          styles.circleSelector,
          { backgroundColor: weekday.selected ? '#B0D2D4' : OpenColor.white },
        ]}
        onPress={() => onToggleSelect(weekday.id)}
      >
        <Text
          style={{
            color: weekday.selected ? OpenColor.black : OpenColor.gray[4],
          }}
        >
          {weekday.title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={updateWeekday}
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

export default EditRoutineWeekdaySelect;
