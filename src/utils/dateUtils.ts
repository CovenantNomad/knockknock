import dayjs from 'dayjs';

export const getCalendarStripColumns = (now: dayjs.Dayjs) => {
  const columns: dayjs.Dayjs[] = [];
  Array.from({ length: 14 }).map((_, i) => {
    const date = dayjs(now).subtract(i, 'day');
    columns.push(date);
  });
  return columns.reverse();
};

/**
 * @param day 0~6
 * @returns 일~월
 */
export const getDayText = (day: number) => {
  const textDay = ['일', '월', '화', '수', '목', '금', '토'];
  return textDay[day];
};

/**
 * @param month 0~11
 * @returns 1월~12월
 */
export const getMonthText = (month: number) => {
  const textMonth = [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ];
  return textMonth[month];
};

/**
 * @param day 0~6
 * @returns TextColor
 */
export const getDayColor = (day: number) => {
  return day === 0 ? '#e67639' : day === 6 ? '#5872d1' : '#2b2b2b';
};
