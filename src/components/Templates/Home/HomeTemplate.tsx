import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import dayjs from 'dayjs';
import { UseMutateAsyncFunction } from 'react-query';
import { updateDailyRoutineByIdProp } from '@/types/firebase/firebase';
import { FirebaseDailyRoutineType } from '@/types/routines/routineType';
import Margin from '@/components/Atoms/Margin';
import BibleCard from '@/components/Blocks/BibleCard';
import { BibleType } from '@/types/bibleCalendar/bibleCalendarType';
import { sortByDateTime } from '@/utils/utils';
import SwipeableListItemTwo from '@/components/Blocks/SwipeableListItemTwo';
import FlatlistContainer from '@/components/Atoms/Container/FlatlistContainer';
import EmptyComponent from '@/components/Atoms/EmptyComponent/EmptyComponent';

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
            <SwipeableListItemTwo
              routine={item}
              selectedDate={selectedDate}
              mutateAsync={mutateAsync}
            />
          )}
          ItemSeparatorComponent={() => <Margin space={12} />}
          ListHeaderComponent={<BibleCard bible={bible} />}
          ListHeaderComponentStyle={styles.listHeader}
          scrollEnabled
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<Margin space={24} />}
          ListEmptyComponent={<EmptyComponent />}
        />
      )}
    </FlatlistContainer>
  );
};

const styles = StyleSheet.create({
  listHeader: {
    marginVertical: 24,
  },
});

export default HomeTemplate;
