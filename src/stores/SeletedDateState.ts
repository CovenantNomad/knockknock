import { atom } from 'recoil';
import dayjs from 'dayjs';

export const selectedDateState = atom<dayjs.Dayjs>({
  key: 'APP/SELECTEDDATE',
  default: dayjs(),
});
