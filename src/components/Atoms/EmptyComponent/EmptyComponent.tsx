import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import OpenColor from 'open-color';
import { FONT_SIZE } from '@/styles/font';

interface EmptyComponentProps {}

const EmptyComponent = ({}: EmptyComponentProps) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>오늘은 영적루틴이 없습니다</Text>
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
