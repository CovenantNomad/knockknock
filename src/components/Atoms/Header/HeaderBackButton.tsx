import OpenColor from 'open-color';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export interface HeaderBackButtonProps {
  goBack: () => void;
  canGoBack: boolean;
}

const HeaderBackButton = ({ goBack, canGoBack }: HeaderBackButtonProps) => {
  return (
    <>
      {canGoBack && (
        <TouchableOpacity
          onPress={goBack}
          hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}
        >
          <Ionicons
            name="ios-chevron-back-outline"
            size={24}
            color={OpenColor.black}
          />
        </TouchableOpacity>
      )}
    </>
  );
};

export default HeaderBackButton;
