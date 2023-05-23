import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getDayText } from '@/utils/dateUtils';
import { FONT_SIZE } from '@/styles/font';
import Fontisto from 'react-native-vector-icons/Fontisto';
import OpenColor from 'open-color';

interface WeeklyPerformanceChartProps {
  data: boolean[];
}

const WeeklyPerformanceChart = ({ data }: WeeklyPerformanceChartProps) => {
  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <View style={styles.column} key={index}>
          <View style={styles.wrapper}>
            {item && (
              <Fontisto name="check" size={18} color={OpenColor.blue[6]} />
            )}
          </View>
          <Text style={styles.label}>{getDayText(index)}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: OpenColor.white,
  },
  column: {
    flex: 1,
    height: 60,
    alignItems: 'center',
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    color: OpenColor.gray[6],
    fontSize: FONT_SIZE.SMALLTEXT,
  },
});

export default WeeklyPerformanceChart;
