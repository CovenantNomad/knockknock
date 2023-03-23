import React from 'react';
import { StyleSheet, View } from 'react-native';

interface HeaderProps {
  headerLeft?: () => JSX.Element;
  headerRight?: () => JSX.Element;
  children?: React.ReactNode;
}

const Header = ({ children, headerLeft, headerRight }: HeaderProps) => {
  return (
    <View style={styles.header}>
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
    height: 44,
    flexDirection: 'row',
    paddingHorizontal: 16,
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
