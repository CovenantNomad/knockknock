import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
// components
import ScrollViewContainer from '@/components/Atoms/Container/ScrollViewContainer';
import HeadlineText from '@/components/Atoms/Typography/HeadlineText';
import Margin from '@/components/Atoms/Margin';
import StatsGroup from '@/components/Blocks/StatsGroup';
import RoutineTrendChart from '@/components/Organisms/Charts/RoutineTrendChart';
import WeeklyPerformanceChart from '@/components/Organisms/Charts/WeeklyPerformanceChart';
import SectionTitleText from '@/components/Atoms/Typography/SectionTitle';
import { monthlyTrendsType } from '@/types/routines/routineType';

interface RoutineDetailTemplateProps {
  title: string;
  stats: { name: string; stats: number }[];
  weeklyPerformance: boolean[];
  lastFiveMonthResults: monthlyTrendsType[] | undefined;
  isLoading: boolean;
  isMonthlyTrendsLoading: boolean;
}

const RoutineDetailTemplate = ({
  title,
  stats,
  weeklyPerformance,
  lastFiveMonthResults,
  isLoading,
  isMonthlyTrendsLoading,
}: RoutineDetailTemplateProps) => {
  return (
    <ScrollViewContainer>
      <HeadlineText text={title} />
      <Margin space={32} />
      {isLoading && isMonthlyTrendsLoading ? (
        <ActivityIndicator />
      ) : stats !== undefined &&
        weeklyPerformance !== undefined &&
        lastFiveMonthResults !== undefined ? (
        <>
          <SectionTitleText text="Statistic" />
          <Margin space={16} />
          <StatsGroup stats={stats} />
          <Margin space={24} />
          <SectionTitleText text="Weekly Performance" />
          <Margin space={16} />
          <WeeklyPerformanceChart data={weeklyPerformance} />
          <Margin space={24} />
          <SectionTitleText text="Monthly Trends" />
          <Margin space={16} />
          <RoutineTrendChart trends={lastFiveMonthResults} />
        </>
      ) : (
        <View>
          <Text>데이터 없음</Text>
        </View>
      )}
    </ScrollViewContainer>
  );
};

export default RoutineDetailTemplate;
