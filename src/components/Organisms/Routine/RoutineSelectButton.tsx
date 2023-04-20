import React from 'react';
import NavigationButton from '@/components/Atoms/NavigationButton';
import Margin from '@/components/Atoms/Margin';
import SectionTitleText from '@/components/Atoms/Typography/SectionTitle';
import { Switch } from 'react-native';

interface RoutineSelectButtonProps {
  title: string;
  buttonLabel: string;
  tooltipText?: string;
  disabled?: boolean;
  onPress: () => void;
}

const RoutineSelectButton = ({
  title,
  tooltipText,
  buttonLabel,
  disabled,
  onPress,
}: RoutineSelectButtonProps) => {
  return (
    <>
      <SectionTitleText text={title} tooltipText={tooltipText} />
      <Margin space={12} />
      <NavigationButton
        label={buttonLabel}
        onPress={onPress}
        disabled={disabled}
      />
      <Margin space={24} />
    </>
  );
};

export default RoutineSelectButton;
