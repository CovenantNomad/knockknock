import { useCallback, useState } from 'react';
import dayjs from 'dayjs';

const useDateTimePicker = () => {
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = useCallback(() => {
    setDatePickerVisibility(true);
  }, []);

  const hideDatePicker = useCallback(() => {
    setDatePickerVisibility(false);
  }, []);

  return {
    date,
    isDatePickerVisible,
    setDatePickerVisibility,
    setDate,
    showDatePicker,
    hideDatePicker,
  };
};

export default useDateTimePicker;
