import React from 'react';
import { StyleSheet, View } from 'react-native';

interface FooterProps {
  children: React.ReactNode;
}

const Footer = ({ children }: FooterProps) => {
  return <View style={styles.footer}>{children}</View>;
};

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
});

export default Footer;
