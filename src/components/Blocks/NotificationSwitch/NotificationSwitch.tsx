import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import OpenColor from 'open-color';
import { FONT_SIZE, LINE_HEIGHT } from '@/styles/font';
import Margin from '@/components/Atoms/Margin';
import SectionTitleText from '@/components/Atoms/Typography/SectionTitle';

interface NotificationSwitchProps {
  title: string;
  tooltipText?: string;
  value: boolean;
  disabled?: boolean;
  onChange: () => void;
}

const NotificationSwitch = ({
  title,
  tooltipText,
  value,
  disabled,
  onChange,
}: NotificationSwitchProps) => {
  return (
    <>
      <SectionTitleText text={title} tooltipText={tooltipText} />
      <Margin space={12} />
      <View style={styles.wrapper}>
        <Text style={styles.text}>알람설정</Text>
        <Switch
          value={value}
          disabled={disabled}
          onValueChange={onChange}
          trackColor={{ false: '#767577', true: '#B0D2D4' }}
          thumbColor={'#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: FONT_SIZE.BODY,
    lineHeight: LINE_HEIGHT.BODY,
    color: OpenColor.black,
  },
});

export default NotificationSwitch;
