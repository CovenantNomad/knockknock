import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import OpenColor from 'open-color';

const Button: React.FC<{
  label: string;
  textColor?: string;
  disabled?: boolean;
  isLoading?: boolean;
  rounded?: boolean;
  backgroundColor?: string;
  onPress: () => void;
}> = props => {
  return (
    <TouchableOpacity
      {...props}
      style={[
        styles.button,
        {
          backgroundColor: props.backgroundColor || OpenColor.blue[6],
          borderRadius: props.rounded ? 12 : 0,
        },
      ]}
      onPress={props.onPress}
      disabled={props.disabled}
    >
      {props.isLoading ? (
        <ActivityIndicator color={OpenColor.white} />
      ) : (
        <Text
          style={[styles.label, { color: props.textColor || OpenColor.white }]}
        >
          {props.label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  label: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: 'NotoSansKR-Bold',
  },
});

export default Button;
