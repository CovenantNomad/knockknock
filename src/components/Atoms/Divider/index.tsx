import OpenColor from 'open-color';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface DividerProps {}

const Divider = ({}: DividerProps) => {
  return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
  divider: {
    width: '100%',
    height: 0.5,
    backgroundColor: OpenColor.gray[2],
  },
});

export default Divider;
