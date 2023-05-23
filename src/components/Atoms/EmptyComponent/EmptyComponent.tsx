import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import OpenColor from 'open-color';
import { FONT_SIZE } from '@/styles/font';

interface EmptyComponentProps {
  text: string;
}

const EmptyComponent = ({ text }: EmptyComponentProps) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 120,
  },
  text: {
    fontSize: FONT_SIZE.HEADING_3,
    color: OpenColor.gray[6],
  },
});

export default EmptyComponent;
