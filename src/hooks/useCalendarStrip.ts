import { useState, useCallback } from 'react';
import dayjs from 'dayjs';

const useCalendarStrip = () => {
  const now = dayjs();
  const [selectedDate, setSelectedDate] = useState(now);

  const handleConfirm = useCallback((selectDate: dayjs.Dayjs) => {
    setSelectedDate(selectDate);
  }, []);

  return {
    selectedDate,
    handleConfirm,
  };
};

export default useCalendarStrip;
