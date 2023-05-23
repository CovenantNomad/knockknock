import { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { getMonthlyTrends, getRoutineStaticById } from '@/api/routine';
import dayjs from 'dayjs';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import useCalendarStrip from './useCalendarStrip';
import { monthlyTrendsType } from '@/types/routines/routineType';
dayjs.extend(dayOfYear);
dayjs.extend(weekOfYear);

interface useStaticsPrps {
  uid: string;
  routineId: string;
}

export const useStatics = ({ uid, routineId }: useStaticsPrps) => {
  const { selectedDate } = useCalendarStrip();
  const dayOfWeek = useMemo(() => [0, 1, 2, 3, 4, 5, 6], []);
  const [stats, setStats] = useState<{ name: string; stats: number }[]>([
    { name: '이번주', stats: 0 },
    { name: '이번달', stats: 0 },
    { name: '올해', stats: 0 },
    { name: '전체', stats: 0 },
  ]);
  const [weeklyPerformance, setWeeklyPerformance] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [lastFiveMonthResults, setLastFiveMonthResults] =
    useState<monthlyTrendsType[]>();

  const { isLoading, data } = useQuery(
    [
      'getRoutineStaticById',
      {
        year: selectedDate.get('year'),
        month: selectedDate.get('month'),
        week: selectedDate.week(),
        uid: uid,
        routineId: routineId,
      },
    ],
    () =>
      getRoutineStaticById(
        selectedDate.get('year'),
        selectedDate.get('month'),
        selectedDate.week(),
        uid,
        routineId,
      ),
    {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10,
    },
  );

  const { isLoading: isMonthlyTrendsLoading, data: monthlyTrends } = useQuery(
    [
      'getMonthlyTrends',
      {
        today: selectedDate.format('YYYY-MM-DD'),
        uid: uid,
        routineId: routineId,
      },
    ],
    () => getMonthlyTrends(selectedDate.format('YYYY-MM-DD'), uid, routineId),
    {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10,
    },
  );

  useEffect(() => {
    if (data) {
      setStats([
        { name: '이번주', stats: data.weeklyStatic },
        { name: '이번달', stats: data.monthlyStatic },
        { name: '올해', stats: data.yearlyStatic },
        { name: '전체', stats: data.totalStatic },
      ]);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      const findPerformance = data?.weeklyResult.map(item => item.day);
      const performanceResult = dayOfWeek.map(item =>
        findPerformance?.includes(item),
      );
      setWeeklyPerformance(performanceResult);
    }
  }, [data, dayOfWeek]);

  useEffect(() => {
    if (monthlyTrends) {
      setLastFiveMonthResults(monthlyTrends.lastFiveMonthResults);
    }
  }, [monthlyTrends]);

  return {
    stats,
    weeklyPerformance,
    lastFiveMonthResults,
    isLoading,
    isMonthlyTrendsLoading,
  };
};
