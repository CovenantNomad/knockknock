import React, { Dispatch, SetStateAction } from 'react';
import {
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useRecoilState } from 'recoil';
import { createRoutineState } from '@/stores/CreateRoutineState';
import OpenColor from 'open-color';
import { FONT_SIZE } from '@/styles/font';
import Margin from '@/components/Atoms/Margin';
import SectionTitleText from '@/components/Atoms/Typography/SectionTitle';

interface RoutineIconInputProps {
  title: string;
  icon: string;
  setIcon: Dispatch<SetStateAction<string>>;
}

const RoutineIconInput = ({ title, icon, setIcon }: RoutineIconInputProps) => {
  const [createRoutine, setCreateRoutine] = useRecoilState(createRoutineState);

  return (
    <>
      <SectionTitleText
        text={title}
        tooltipText="이모지는 한 개만 입력 할 수 있습니다"
      />
      <Margin space={12} />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ width: '100%' }}>
          <TextInput
            value={icon}
            onChangeText={(text: string) => setIcon(text)}
            placeholder="이모지로 아이콘 입력"
            onSubmitEditing={() => {
              setCreateRoutine({
                ...createRoutine,
                icon: icon.trim(),
              });
            }}
            onEndEditing={() => {
              setCreateRoutine({
                ...createRoutine,
                icon: icon.trim(),
              });
            }}
            style={styles.textInput}
            placeholderTextColor={OpenColor.gray[4]}
          />
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    height: 40,
    backgroundColor: OpenColor.white,
    fontSize: FONT_SIZE.BODY,
    fontWeight: '400',
    letterSpacing: 1.3,
    textAlign: 'center',
    borderRadius: 8,
    padding: 0,
  },
});

export default RoutineIconInput;
