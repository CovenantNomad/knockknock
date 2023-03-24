import React from 'react';
import { Image, ImageProps, StyleProp } from 'react-native';

const LocalImage: React.FC<{
  source: number;
  width: number;
  height: number;
  style?: StyleProp<ImageProps>;
}> = props => {
  return (
    <Image
      source={props.source}
      style={[props.style, { width: props.width, height: props.height }]}
    />
  );
};

export default LocalImage;
