import dayjs from 'dayjs';
import firestore from '@react-native-firebase/firestore';
import { BibleType, COLLCTION } from '@/types/firebase/firebase';

export const getBibleByDate = async (date: string) => {
  const bibleRef = firestore().collection(COLLCTION.BIBLECALENDAR).doc(date);
  const routineResponse = await bibleRef.get();
  return routineResponse.data() as BibleType;
};
