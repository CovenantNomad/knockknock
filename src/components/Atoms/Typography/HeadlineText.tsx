import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import OpenColor from 'open-color';
import { FONT_SIZE, LINE_HEIGHT } from '@/styles/font';

interface HeadlineTextProps {
  text: string;
}

const HeadlineText = ({ text }: HeadlineTextProps) => {
  return (
    <View>
      <Text
        style={[
          styles.title,
          Platform.OS === 'android' && { fontFamily: 'SF-Pro-Bold' },
        ]}
      >
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: FONT_SIZE.HEADING_2,
    lineHeight: LINE_HEIGHT.HEADING_2,
    fontWeight: '600',
    color: OpenColor.black,
  },
});

export default HeadlineText;
