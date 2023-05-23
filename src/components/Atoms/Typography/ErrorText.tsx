import React from 'react';
import { StyleSheet, Text } from 'react-native';
import OpenColor from 'open-color';
import { FONT_SIZE, LINE_HEIGHT } from '@/styles/font';

interface ErrorTextProps {
  children: React.ReactNode;
}

const ErrorText = ({ children }: ErrorTextProps) => {
  return <Text style={styles.text}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: FONT_SIZE.FOOTNOTE,
    lineHeight: LINE_HEIGHT.FOOTNOTE,
    color: OpenColor.red[6],
  },
});

export default ErrorText;
