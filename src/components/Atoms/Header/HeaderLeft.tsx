import React from 'react';
import HeaderBackButton from './HeaderBackButton';

interface HeaderLeftProps {
  navigation: any;
}

const HeaderLeft = ({ navigation }: HeaderLeftProps) => {
  return (
    <HeaderBackButton
      goBack={navigation.goBack}
      canGoBack={navigation.canGoBack()}
    />
  );
};

export default HeaderLeft;
