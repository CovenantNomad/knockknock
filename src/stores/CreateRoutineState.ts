import { atom } from 'recoil';
import { DEFAULTROUTINE } from '@/constants/defaultValues';
import { RoutineType } from '@/types/routines/routineType';

export const createRoutineState = atom<RoutineType>({
  key: 'HOME/CREATE_ROUTINE',
  default: DEFAULTROUTINE,
});
