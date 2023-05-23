import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Control, Controller, FieldErrors, UseFormWatch } from 'react-hook-form';
//components
import KeyboardAvoidingViewContainer from '@/components/Atoms/Container/KeyboardAvoidingViewLayout';
import Divider from '@/components/Atoms/Divider';
import SectionContainer from '@/components/Atoms/Container/SectionContainer';
import Button from '@/components/Atoms/Button';
import ErrorText from '@/components/Atoms/Typography/ErrorText';
import Margin from '@/components/Atoms/Margin';
//styles
import OpenColor from 'open-color';
import { FONT_SIZE } from '@/styles/font';
import { RoutineIconForm } from '@/screens/Apps/Home/RoutineAddNavigation/RoutineAddIconScreen';

interface RoutineIconInputProps {
  control: Control<RoutineIconForm, any>
  errors: FieldErrors<RoutineIconForm>
  watch: UseFormWatch<RoutineIconForm>
  onSaveHandler: () => void
}

const RoutineIconInput = ({ control, errors, watch, onSaveHandler }: RoutineIconInputProps) => {

  return (
    <KeyboardAvoidingViewContainer>
      <SectionContainer>
        <View style={styles.header}>
          <View style={styles.iconWrapper}>
            <Text style={styles.icon}>{watch('icon') ? watch('icon') : '🙏'}</Text>      
          </View>
        </View>
        <Divider />
        <Margin space={16} />
        <View style={styles.textInputWrapper}>
          <Controller
            name="icon"
            control={control}
            rules={{
              required: true,
              maxLength: {
                value: 3,
                message: '아이콘은 하나만 선택해주세요'
              }
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                onChangeText={onChange}
                value={value}
                returnKeyType="done"
                autoCapitalize="none"
                selectionColor={OpenColor.blue[6]}
                style={styles.textInput}
                placeholder="아이콘을 입력해보세요"
                placeholderTextColor={OpenColor.gray[5]}
                inputMode='text'
              />
            )}
          />
        </View>
        <Margin space={4} />
        {errors.icon && <ErrorText>{errors.icon.message}</ErrorText>}
        <Margin space={24} />
        <Button
          label="확인"
          onPress={onSaveHandler}
          disabled={watch("icon") === "" || errors.icon !== undefined}
        />
      </SectionContainer>
    </KeyboardAvoidingViewContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  iconWrapper: {
    width: 52,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: OpenColor.gray[4],
    borderRadius: 12,
    marginRight: 16,
  },
  icon: {
    fontSize: 24,
  },
  textInputWrapper: {
    position: 'relative',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: OpenColor.white,
  },
  textInput: {
    width: '100%',
    fontSize: FONT_SIZE.BODY,
    fontWeight: '400',
    color: OpenColor.black,
    letterSpacing: 1.3,
    textAlign: 'center',
    padding: 0,
    margin: 0,
  },
});

export default RoutineIconInput;
