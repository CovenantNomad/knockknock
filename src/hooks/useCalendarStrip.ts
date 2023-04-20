import { useState, useCallback } from 'react';
import dayjs from 'dayjs';
import { useRecoilState } from 'recoil';
import { selectedDateState } from '@/stores/SeletedDateState';

const useCalendarStrip = () => {
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);

  const handleConfirm = (selectDate: dayjs.Dayjs) => {
    setSelectedDate(selectDate);
  };

  return {
    selectedDate,
    handleConfirm,
  };
};

export default useCalendarStrip;
