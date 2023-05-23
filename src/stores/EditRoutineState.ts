import { atom } from 'recoil';
import { RoutineType } from '@/types/routines/routineType';
import { DEFAULTROUTINE } from '@/constants/defaultValues';

export const editRoutineState = atom<RoutineType>({
  key: 'HOME/EDIT_ROUTINE',
  default: DEFAULTROUTINE,
});
