import OpenColor from 'open-color';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

interface LoadingBarProps {
  total: number;
  downLoading: number;
}

const LoadingBar = ({ total, downLoading }: LoadingBarProps) => {
  const { width } = Dimensions.get('screen');

  const loadingAnimRef = useRef(new Animated.Value(0));
  const startAnimation = useCallback(() => {
    Animated.timing(loadingAnimRef.current, {
      toValue: downLoading / total,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [total, downLoading]);

  const progressWidth = useMemo(() => {
    return loadingAnimRef.current.interpolate({
      inputRange: [0, 1],
      outputRange: [0, width - 32],
      extrapolate: 'clamp',
    });
  }, [width]);

  const containerStyle = useMemo<StyleProp<ViewStyle>>(
    () => [styles.container, { width: width - 32 }],
    [width],
  );

  useEffect(() => {
    startAnimation();
  }, [startAnimation]);

  return (
    <View style={containerStyle}>
      <Animated.View
        style={[styles.progress, { width: progressWidth }]}
      ></Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 16,
    borderWidth: 1,
    borderColor: OpenColor.blue[6],
    borderRadius: 16,
  },
  progress: {
    height: '100%',
    backgroundColor: OpenColor.blue[6],
    borderRadius: 16,
  },
});

export default LoadingBar;
