import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import dayjs from 'dayjs';
import { UseMutateAsyncFunction } from 'react-query';
import {
  BibleType,
  updateDailyRoutineByIdProp,
} from '@/types/firebase/firebase';
import { FirebaseDailyRoutineType } from '@/types/routines/routineType';
import Margin from '@/components/Atoms/Margin';
import BibleCard from '@/components/Blocks/BibleCard';
import SwipeableListItem from '@/components/Blocks/SwipeableListItem';
import FlatlistContainer from '@/components/Atoms/Container/FlatlistContainer';
import EmptyComponent from '@/components/Atoms/EmptyComponent/EmptyComponent';
import { sortByDateTime } from '@/utils/dateUtils';
import HomeFlatlistHeader from '@/components/Organisms/HomeScreen/HomeFlatlistHeader';

interface HomeTemplateProps {
  data: FirebaseDailyRoutineType[] | undefined;
  isLoading: boolean;
  bible: BibleType | undefined;
  isBibleLoading: boolean;
  selectedDate: dayjs.Dayjs;
  mutateAsync: UseMutateAsyncFunction<
    void,
    unknown,
    updateDailyRoutineByIdProp,
    unknown
  >;
}

interface renderItemProps {
  item: FirebaseDailyRoutineType;
  index: number;
}

const HomeTemplate = ({
  data,
  isLoading,
  bible,
  selectedDate,
  mutateAsync,
}: HomeTemplateProps) => {
  return (
    <FlatlistContainer>
      {isLoading ? (
        <View style={{ paddingTop: 48 }}>
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          data={data?.sort((a, b) => sortByDateTime(a, b))}
          keyExtractor={(item, _) => item.routineId}
          renderItem={({ item }: renderItemProps) => (
            <SwipeableListItem
              routine={item}
              selectedDate={selectedDate}
              mutateAsync={mutateAsync}
            />
          )}
          ItemSeparatorComponent={() => <Margin space={12} />}
          ListHeaderComponent={<HomeFlatlistHeader bible={bible} />}
          scrollEnabled
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<Margin space={49 + 32} />}
          ListEmptyComponent={
            <EmptyComponent text="오늘은 영적루틴이 없습니다" />
          }
        />
      )}
    </FlatlistContainer>
  );
};

export default HomeTemplate;
