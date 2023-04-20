import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import OpenColor from 'open-color';
import { FONT_SIZE, LINE_HEIGHT } from '@/styles/font';
import Margin from '@/components/Atoms/Margin';

interface MenuItemProps {
  title: string;
  status?: string;
  onPress: () => void;
}

const MenuItem = ({ title, status, onPress }: MenuItemProps) => {
  return (
    <>
      <View style={styles.wrapper}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.description}>
          {status && <Text style={styles.descriptionText}>{status}</Text>}
          <TouchableOpacity
            hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
            onPress={onPress}
          >
            <Ionicons
              name="chevron-forward-sharp"
              color={OpenColor.gray[4]}
              size={20}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Margin space={20} />
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: FONT_SIZE.BODY,
    lineHeight: LINE_HEIGHT.BODY,
    color: OpenColor.black,
  },
  description: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  descriptionText: {
    fontSize: FONT_SIZE.FOOTNOTE,
    lineHeight: LINE_HEIGHT.FOOTNOTE,
    color: OpenColor.gray[6],
    marginRight: 8,
  },
});

export default MenuItem;
