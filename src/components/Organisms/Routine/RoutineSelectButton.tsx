import React from 'react';
import NavigationButton from '@/components/Atoms/NavigationButton';
import Margin from '@/components/Atoms/Margin';
import SectionTitleText from '@/components/Atoms/Typography/SectionTitle';

interface RoutineSelectButtonProps {
  title: string;
  buttonLabel: string;
  disabled?: boolean;
  onPress: () => void;
  tooltipText?: string;
}

const RoutineSelectButton = ({
  title,
  buttonLabel,
  disabled,
  tooltipText,
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
