import React from 'react';
import { StyleSheet, View } from 'react-native';
import LocalImage from '@/components/Atoms/LocalImage';

interface SplashScreenProps {}

const SplashScreen = ({}: SplashScreenProps) => {
  return (
    <View style={styles.wrapper}>
      <LocalImage
        source={require('../assets/images/splash.png')}
        width={300}
        height={500}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

export default SplashScreen;
