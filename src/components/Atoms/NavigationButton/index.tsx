import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { FONT_SIZE, LINE_HEIGHT } from '@/styles/font';
import OpenColor from 'open-color';

interface NavigationButtonProps {
  label: string;
  disabled?: boolean;
  onPress: () => void;
}

const NavigationButton = ({
  label,
  disabled,
  onPress,
}: NavigationButtonProps) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} disabled={disabled}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: OpenColor.white,
  },
  label: {
    fontSize: FONT_SIZE.CALLOUT,
    lineHeight: LINE_HEIGHT.CALLOUT,
    color: OpenColor.black,
  },
});

export default NavigationButton;