import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

interface HeaderProps {
  headerLeft?: () => JSX.Element;
  headerRight?: () => JSX.Element;
  children?: React.ReactNode;
}

const Header = ({ children, headerLeft, headerRight }: HeaderProps) => {
  return (
    <View style={[styles.header, { height: Platform.OS === 'ios' ? 48 : 56 }]}>
      {headerLeft !== undefined && (
        <View style={styles.left}>{headerLeft()}</View>
      )}
      {children && <View style={styles.center}>{children}</View>}
      {headerRight !== undefined && (
        <View style={styles.right}>{headerRight()}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  left: {
    position: 'absolute',
    left: 16,
  },
  center: {
    alignItems: 'center',
  },
  right: {
    position: 'absolute',
    right: 16,
    alignItems: 'flex-end',
  },
});

export default Header;
