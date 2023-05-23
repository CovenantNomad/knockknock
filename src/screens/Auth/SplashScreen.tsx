import React from 'react';
import { Image, StyleSheet, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface LoadingScreenProps {
  onFinished: () => void;
}

const SplashScreen = ({ onFinished }: LoadingScreenProps) => {
  const { width, height } = useWindowDimensions();

  return (
    <SafeAreaView style={styles.layout}>
      <Image
        source={require('../../../assets/images/splash.png')}
        style={{ width, height }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashScreen;
