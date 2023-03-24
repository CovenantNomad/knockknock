import OpenColor from 'open-color';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import Margin from '../Margin';

interface CalendarColumnProps {
  columnSize: number;
  color?: string;
  dateText: string;
  dayText: string;
  disabled?: boolean;
  isSelected?: boolean;
  onPress?: () => void;
}

const CalendarStripColumn = ({
  columnSize,
  dateText,
  dayText,
  disabled,
  isSelected,
  onPress,
}: CalendarColumnProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        width: columnSize,
        height: columnSize,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isSelected ? OpenColor.black : OpenColor.white,
        borderRadius: 8,
        borderWidth: isSelected ? 2 : 0,
      }}
    >
      <Text
        style={{
          color: isSelected ? OpenColor.white : OpenColor.black,
          fontSize: 10,
          fontWeight: '600',
        }}
      >
        {dayText}
      </Text>
      <Margin space={4} />
      <Text style={{ color: isSelected ? OpenColor.white : OpenColor.black }}>
        {dateText}
      </Text>
    </TouchableOpacity>
  );
};

export default CalendarStripColumn;
