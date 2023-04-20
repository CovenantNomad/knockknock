import React from 'react';
import {
  Image,
  ImageProps,
  ImageSourcePropType,
  StyleProp,
} from 'react-native';

const LocalImage: React.FC<{
  source: ImageSourcePropType;
  width: number;
  height: number;
  style?: StyleProp<ImageProps>;
}> = props => {
  return (
    <Image
      source={props.source}
      style={[
        props.style,
        { width: props.width, height: props.height, resizeMode: 'contain' },
      ]}
    />
  );
};

export default LocalImage;
