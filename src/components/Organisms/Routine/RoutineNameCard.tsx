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
import { FONT_SIZE, LINE_HEIGHT } from '@/styles/font';
import OpenColor from 'open-color';

interface RoutineNameCardProps {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
}

const RoutineNameCard = ({ name, setName }: RoutineNameCardProps) => {
  const [createRoutine, setCreateRoutine] = useRecoilState(createRoutineState);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        style={[
          styles.card,
          { backgroundColor: createRoutine.color || '#B0D2D4' },
        ]}
      >
        <TextInput
          value={name}
          onChangeText={(text: string) => setName(text)}
          placeholder="영적루틴 이름"
          onSubmitEditing={() => {
            setCreateRoutine({
              ...createRoutine,
              name: name,
            });
          }}
          onEndEditing={() => {
            setCreateRoutine({
              ...createRoutine,
              name: name,
            });
          }}
          style={styles.textInput}
          placeholderTextColor={OpenColor.gray[1]}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  textInput: {
    width: '100%',
    fontSize: FONT_SIZE.BODY,
    lineHeight: LINE_HEIGHT.BODY,
    fontWeight: '400',
    color: OpenColor.white,
    letterSpacing: 1.3,
    textAlign: 'center',
    padding: 0,
    margin: 0,
  },
});

export default RoutineNameCard;
