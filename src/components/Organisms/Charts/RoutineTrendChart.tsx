import React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import OpenColor from 'open-color';
import { getMonthText } from '@/utils/dateUtils';
import { monthlyTrendsType } from '@/types/routines/routineType';

interface RoutineTrendChartProps {
  trends: monthlyTrendsType[];
}

const RoutineTrendChart = ({ trends }: RoutineTrendChartProps) => {
  const { width } = useWindowDimensions();
  const labels = trends
    ?.sort((a, b) => a.year - b.year || a.month - b.month)
    .map(item => getMonthText(item.month));
  const data = trends
    ?.sort((a, b) => a.year - b.year || a.month - b.month)
    .map(item => item.stats);

  const chartData = {
    labels,
    datasets: [
      {
        data,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: OpenColor.white,
    backgroundGradientTo: OpenColor.white,
    color: (opacity = 1) => `rgba(82, 113, 254, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(34, 34, 34, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    decimalPlaces: 2,
    useShadowColorFromDataset: false, // optional
    styles: {
      paddingLeft: 0,
    },
  };

  return (
    <BarChart
      style={styles.graphStyle}
      data={chartData}
      width={width - 32}
      height={220}
      yAxisLabel=""
      yAxisSuffix=""
      yAxisInterval={10}
      chartConfig={chartConfig}
      verticalLabelRotation={0}
      fromZero={true}
      withInnerLines={false}
    />
  );
};

const styles = StyleSheet.create({
  graphStyle: {
    borderRadius: 12,
  },
});

export default RoutineTrendChart;
