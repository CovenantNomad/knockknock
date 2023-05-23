import { FONT_SIZE, LINE_HEIGHT } from '@/styles/font';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import OpenColor from 'open-color';

interface LinkTextProps {
  linkText: string;
  description?: string;
  onPress: () => void;
}

const LinkText = ({ linkText, description, onPress }: LinkTextProps) => {
  return (
    <View style={styles.wrapper}>
      {description && <Text style={styles.description}>{description}</Text>}
      <TouchableOpacity
        hitSlop={{ top: 8, left: 8, right: 8, bottom: 8 }}
        onPress={onPress}
      >
        <Text style={styles.linkText}>{linkText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  description: {
    fontSize: FONT_SIZE.FOOTNOTE,
    lineHeight: LINE_HEIGHT.FOOTNOTE,
    color: OpenColor.black,
    marginRight: 8,
    fontFamily: 'NotoSansKR-Regular',
  },
  linkText: {
    fontSize: FONT_SIZE.FOOTNOTE,
    lineHeight: LINE_HEIGHT.FOOTNOTE,
    color: OpenColor.orange[6],
    fontFamily: 'NotoSansKR-Regular',
  },
});

export default LinkText;
