import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { FONT_SIZE } from '@/styles/font';
import OpenColor from 'open-color';

interface InactiveButtonProps {
  label: string;
  onPress: () => void;
}

const InactiveButton = ({ label, onPress }: InactiveButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    backgroundColor: OpenColor.white,
    borderRadius: 8,
  },
  label: {
    fontSize: FONT_SIZE.CALLOUT,
    color: OpenColor.red[6],
  },
});

export default InactiveButton;
