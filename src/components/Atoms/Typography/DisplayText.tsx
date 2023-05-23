import React from 'react';
import { StyleSheet, Text } from 'react-native';
import OpenColor from 'open-color';
import { FONT_SIZE, LINE_HEIGHT } from '@/styles/font';

interface DisplayTextProps {
  children: React.ReactNode;
}

const DisplayText = ({ children }: DisplayTextProps) => {
  return <Text style={styles.text}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: FONT_SIZE.HEADING_2,
    lineHeight: LINE_HEIGHT.HEADING_2,
    color: OpenColor.black,
    fontFamily: 'NotoSansKR-Bold',
  },
});

export default DisplayText;
