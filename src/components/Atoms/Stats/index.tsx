import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Margin from '../Margin';
import OpenColor from 'open-color';
import { FONT_SIZE, LINE_HEIGHT } from '@/styles/font';

interface StatsProps {
  number: number;
  text: string;
  lastOne?: boolean;
}

const Stats = ({ number, text, lastOne }: StatsProps) => {
  return (
    <View style={[styles.stats, { marginRight: lastOne ? 8 : 0 }]}>
      <Text style={styles.number}>{number}</Text>
      <Margin space={4} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  stats: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: OpenColor.white,
  },
  number: {
    color: OpenColor.black,
    fontSize: FONT_SIZE.HEADING_3,
    lineHeight: LINE_HEIGHT.HEADING_3,
  },
  text: {
    color: OpenColor.gray[6],
    fontSize: FONT_SIZE.SMALLTEXT,
  },
});

export default Stats;
