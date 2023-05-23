import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { FONT_SIZE, LINE_HEIGHT } from '@/styles/font';
import OpenColor from 'open-color';

interface NavigationButtonProps {
  label: string;
  bgColor?: string;
  disabled?: boolean;
  onPress: () => void;
}

const NavigationButton = ({
  label,
  bgColor,
  disabled,
  onPress,
}: NavigationButtonProps) => {
  return (
    <TouchableOpacity style={[styles.card, {backgroundColor: bgColor ? bgColor : OpenColor.white}]} onPress={onPress} disabled={disabled}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  label: {
    fontSize: FONT_SIZE.CALLOUT,
    lineHeight: LINE_HEIGHT.CALLOUT,
    color: OpenColor.black,
  },
});

export default NavigationButton;
