import Margin from '@/components/Atoms/Margin';
import HeaderTitle from '@/components/Atoms/Typography/HeaderTitle';
import BibleCard from '@/components/Blocks/BibleCard';
import { FONT_SIZE, LINE_HEIGHT } from '@/styles/font';
import { BibleType } from '@/types/firebase/firebase';
import OpenColor from 'open-color';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface HomeFlatlistHeaderProps {
  bible: BibleType | undefined;
}

const HomeFlatlistHeader = ({ bible }: HomeFlatlistHeaderProps) => {
  return (
    <View style={styles.listHeader}>
      <BibleCard bible={bible} />
      <Margin space={24} />
      <Text style={styles.title}>오늘 영적루틴</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  listHeader: {
    marginTop: 24,
    marginBottom: 12,
  },
  title: {
    fontSize: FONT_SIZE.BODY,
    lineHeight: LINE_HEIGHT.BODY,
    color: OpenColor.black,
    fontWeight: '600',
  },
});

export default HomeFlatlistHeader;
