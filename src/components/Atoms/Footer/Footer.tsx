import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View, Platform } from 'react-native';

interface FooterProps {
  children: React.ReactNode;
  isModalFooter?: boolean;
}

const Footer = ({ children, isModalFooter }: FooterProps) => {
  return (
    <View
      style={{
        paddingBottom: isModalFooter
          ? Platform.OS === 'android'
            ? 16
            : 32
          : 12,
        paddingHorizontal: isModalFooter ? 0 : 16,
      }}
    >
      {children}
    </View>
  );
};

export default Footer;
