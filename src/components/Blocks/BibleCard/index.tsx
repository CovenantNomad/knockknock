import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { FONT_SIZE, LINE_HEIGHT } from '@/styles/font';
import { BibleType } from '@/types/firebase/firebase';
import OpenColor from 'open-color';

interface BibleCardProps {
  bible: BibleType | undefined;
}

const BibleCard = ({ bible }: BibleCardProps) => {
  return (
    <View style={styles.wrapper}>
      {bible ? (
        <>
          <Text style={styles.text}>
            {bible.content.replace('! ', '! \n').replace('. ', '. \n')}
          </Text>
        </>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 20,
    borderRadius: 12,
    backgroundColor: OpenColor.white,
  },
  text: {
    textAlign: 'center',
    fontSize: FONT_SIZE.CALLOUT,
    lineHeight: LINE_HEIGHT.CALLOUT,
    color: OpenColor.black,
  },
});

export default BibleCard;
