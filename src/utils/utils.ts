// import { FirebaseRoutineType } from '@/types/routines/routineType';
import { TextInput } from 'react-native';

export const emailRegExp =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

export const moveToNext = (nextRef: React.RefObject<TextInput>) => {
  nextRef?.current?.focus();
};

export function delay(t: number, v: Function) {
  return new Promise(function (resolve) {
    setTimeout(resolve.bind(null, v), t);
  });
}

// export const sortByDateTime = (
//   a: FirebaseRoutineType,
//   b: FirebaseRoutineType,
// ) => Number(a.hour) - Number(b.hour) || Number(a.minute) - Number(b.minute);
