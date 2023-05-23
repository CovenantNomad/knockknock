import React, { useMemo } from 'react';
import { FlatList, View } from 'react-native';
import dayjs from 'dayjs';
//components
import CalendarStripColumn from '@/components/Atoms/CalendarStripColum';
import Margin from '@components/Atoms/Margin';
// utils
import {
  getCalendarStripColumns,
  getDayColor,
  getDayText,
} from '@/utils/dateUtils';

interface RenderItemProps {
  item: dayjs.Dayjs;
  index: number;
}

interface CalendarStripProps {
  selectedDate: dayjs.Dayjs;
  handleConfirm: (date: dayjs.Dayjs) => void;
}

const CalendarStrip = ({ selectedDate, handleConfirm }: CalendarStripProps) => {
  const now = dayjs();
  const columnSize = 48;
  const columns = useMemo(() => getCalendarStripColumns(now), [now]);

  const renderItem = ({ item, index }: RenderItemProps) => {
    const dateText = dayjs(item).get('date');
    const day = dayjs(item).get('day');
    const isSelected = dayjs(item).isSame(selectedDate, 'date');
    return (
      <CalendarStripColumn
        key={index}
        columnSize={columnSize}
        color={getDayColor(day)}
        dayText={getDayText(day)}
        dateText={String(dateText)}
        onPress={() => handleConfirm(item)}
        isSelected={isSelected}
      />
    );
  };

  return (
    <View style={{ paddingHorizontal: 16 }}>
      <FlatList
        data={columns}
        keyExtractor={(_, index) => `${index}`}
        horizontal={true}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Margin horizontal space={6} />}
        contentContainerStyle={{
          paddingVertical: 8,
          alignItems: 'center',
        }}
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={13}
        getItemLayout={(data, index) => ({
          length: columnSize,
          offset: (columnSize + 6) * index,
          index,
        })}
      />
    </View>
  );
};

export default CalendarStrip;
