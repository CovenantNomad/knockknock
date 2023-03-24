import React from 'react';
import { StyleSheet, View } from 'react-native';

export interface HeaderActionGroupProps {
  children: React.ReactNode;
}

const HeaderActionGroup = ({ children }: HeaderActionGroupProps) => {
  return <View style={styles.wrapper}>{children}</View>;
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default HeaderActionGroup;
