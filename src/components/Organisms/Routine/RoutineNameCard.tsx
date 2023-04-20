import React from 'react';
import {
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { createRoutineState } from '@/stores/CreateRoutineState';
import { FONT_SIZE, LINE_HEIGHT } from '@/styles/font';
import OpenColor from 'open-color';

interface RoutineNameForm {
  name: string;
}

const RoutineNameCard = () => {
  const [createRoutine, setCreateRoutine] = useRecoilState(createRoutineState);
  const { control, watch } = useForm<RoutineNameForm>();

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        style={[
          styles.card,
          { backgroundColor: createRoutine.color || '#B0D2D4' },
        ]}
      >
        <Controller
          name="name"
          control={control}
          rules={{
            required: true,
            maxLength: 16,
          }}
          render={({ field: { onChange } }) => (
            <TextInput
              onChangeText={onChange}
              value={watch('name')}
              returnKeyType="done"
              autoCapitalize="none"
              onSubmitEditing={() => {
                setCreateRoutine({
                  ...createRoutine,
                  name: watch('name'),
                });
              }}
              onEndEditing={() => {
                setCreateRoutine({
                  ...createRoutine,
                  name: watch('name'),
                });
              }}
              selectionColor={OpenColor.blue[6]}
              style={styles.TextInput}
              placeholder="영적루틴 이름"
              placeholderTextColor={OpenColor.gray[1]}
            />
          )}
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
  TextInput: {
    width: '100%',
    fontSize: FONT_SIZE.BODY,
    fontWeight: '400',
    color: OpenColor.white,
    letterSpacing: 1.3,
    textAlign: 'center',
    padding: 0,
    margin: 0,
  },
});

export default RoutineNameCard;
