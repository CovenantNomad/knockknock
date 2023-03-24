import { getMonthlyTrends, getRoutineStaticById } from '@/api/routine/routine';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';

interface useStaticsPrps {
  uid: string;
  routineId: string;
}

export const useStatics = ({ uid, routineId }: useStaticsPrps) => {
  const now = dayjs();
  const dayOfWeek = useMemo(() => [0, 1, 2, 3, 4, 5, 6], []);
  const [today] = useState(now);
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

  const { isLoading, data } = useQuery(
    ['getRoutinesByDay', { date: today, uid: uid, routineId: routineId }],
    () => getRoutineStaticById(today, uid, routineId),
  );

  const { isLoading: isMonthlyTrendsLoading, data: monthlyTrends } = useQuery(
    ['getMonthlyTrends', { date: today, uid: uid, routineId: routineId }],
    () => getMonthlyTrends(today, uid, routineId),
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

  return {
    stats,
    weeklyPerformance,
    monthlyTrends,
    isLoading,
    isMonthlyTrendsLoading,
  };
};
