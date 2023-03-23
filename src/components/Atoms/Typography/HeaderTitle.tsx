import { FONT_SIZE, LINE_HEIGHT } from '@/styles/font';
import OpenColor from 'open-color';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface HeaderTitleProps {
  children: React.ReactNode;
}

const HeaderTitle = ({ children }: HeaderTitleProps) => {
  return <Text style={styles.text}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: FONT_SIZE.HEADING_3,
    lineHeight: LINE_HEIGHT.HEADING_3,
    color: OpenColor.black,
    fontFamily: 'NotoSansKR-Bold',
  },
});

export default HeaderTitle;
