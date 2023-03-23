import React from 'react';
import { View } from 'react-native';

interface MarginProps {
  horizontal?: boolean;
  space: number;
}

const Margin = ({ horizontal, space }: MarginProps) => {
  return (
    <View
      style={{
        width: horizontal ? space : undefined,
        height: !horizontal ? space : undefined,
      }}
    />
  );
};

export default Margin;
