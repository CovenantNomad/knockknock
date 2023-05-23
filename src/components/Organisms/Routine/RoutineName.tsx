import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Controller, UseFormWatch, Control, FieldErrors } from 'react-hook-form';
//styles
import { FONT_SIZE } from '@/styles/font';
import OpenColor from 'open-color';
//components
import KeyboardAvoidingViewContainer from '@/components/Atoms/Container/KeyboardAvoidingViewLayout';
import SectionContainer from '@/components/Atoms/Container/SectionContainer';
import Margin from '@/components/Atoms/Margin';
import Button from '@/components/Atoms/Button';
import ErrorText from '@/components/Atoms/Typography/ErrorText';
import { RoutineNameForm } from '@/screens/Apps/Home/RoutineAddNavigation/RoutineAddNameScreen';

interface RoutineNameProps {
  control: Control<RoutineNameForm, any>
  errors: FieldErrors<RoutineNameForm>
  watch: UseFormWatch<RoutineNameForm>
  onSaveHandler: () => void
}

const RoutineName = ({ control, errors, watch, onSaveHandler }: RoutineNameProps) => {
  
  return (
    <KeyboardAvoidingViewContainer>
      <SectionContainer>
        <Margin space={12} />
        <View style={styles.lengthwrapper}>
          <Text style={styles.legnthText}>
            {watch('name').length}/10
          </Text>  
        </View>
        <Margin space={4} />
        <View style={styles.card}>
          <Controller
            name="name"
            control={control}
            rules={{
              required: true,
              maxLength: {
                value: 10,
                message: '루틴이름은 10자 이하로 작성해주세요'
              }
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                onChangeText={onChange}
                value={value}
                returnKeyType="done"
                autoCapitalize="none"
                selectionColor={OpenColor.blue[6]}
                style={styles.TextInput}
                placeholder="영적루틴 이름"
                placeholderTextColor={OpenColor.gray[1]}
              />
            )}
          />
        </View>
        <Margin space={4} />
        {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
        <Margin space={16} />
        <Button
          label="확인"
          onPress={onSaveHandler}
          disabled={watch("name") === "" || errors.name !== undefined}
        />
      </SectionContainer>
    </KeyboardAvoidingViewContainer>
  );
};

const styles = StyleSheet.create({
  lengthwrapper: {
    alignItems: 'flex-end',
    paddingRight: 8,
  },
  legnthText: {
    color: OpenColor.gray[6]
  },
  card: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#B0D2D4'
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

export default RoutineName;
