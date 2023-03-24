import React from 'react';
import { StyleSheet, Text } from 'react-native';
import OpenColor from 'open-color';
import { FONT_SIZE, LINE_HEIGHT } from '@/styles/font';

interface AppTitleTextProps {
  children: React.ReactNode;
}

const AppTitleText = ({ children }: AppTitleTextProps) => {
  return <Text style={styles.text}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: FONT_SIZE.DISPLAY,
    lineHeight: LINE_HEIGHT.DISPLAY,
    color: OpenColor.black,
    fontFamily: 'BebasNeue-Regular',
  },
});

export default AppTitleText;
