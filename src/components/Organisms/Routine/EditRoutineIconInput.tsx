import React, { useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useRecoilState } from 'recoil';
import Margin from '@/components/Atoms/Margin';
import SectionTitleText from '@/components/Atoms/Typography/SectionTitle';

import { FONT_SIZE } from '@/styles/font';
import { editRoutineState } from '@/stores/EditRoutineState';
import OpenColor from 'open-color';

interface RoutineIconInputProps {
  defaultIcon: string;
}

const EditRoutineIconInput = ({ defaultIcon }: RoutineIconInputProps) => {
  const [editRoutine, setEditRoutine] = useRecoilState(editRoutineState);
  const [icon, setIcon] = useState<string>(defaultIcon);

  return (
    <>
      <SectionTitleText
        text={'Icon'}
        tooltipText="이모지는 한 개만 입력 할 수 있습니다"
      />
      <Margin space={12} />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View>
          <TextInput
            value={icon}
            onChangeText={(text: string) => setIcon(text)}
            placeholder="이모지로 아이콘 입력"
            onSubmitEditing={() => {
              setEditRoutine({
                ...editRoutine,
                icon: icon.trim(),
              });
            }}
            onEndEditing={() => {
              setEditRoutine({
                ...editRoutine,
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
  },
});

export default EditRoutineIconInput;
