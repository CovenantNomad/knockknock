import React, { useCallback, useRef } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
//navigation
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SettingStackParamList } from '@/types/navigations/navigationTypes';
// form
import { Controller, useForm } from 'react-hook-form';
import { ChangePasswordForm } from '@/types/auth/auth';
//components
import AppLayout from '@/components/Atoms/Layout/AppLayout';
import KeyboardAvoidingViewContainer from '@/components/Atoms/Container/KeyboardAvoidingViewLayout';
import ScrollViewContainer from '@/components/Atoms/Container/ScrollViewContainer';
import Header from '@/components/Atoms/Header/Header';
import HeaderLeft from '@/components/Atoms/Header/HeaderLeft';
import Margin from '@/components/Atoms/Margin';
import ErrorText from '@/components/Atoms/Typography/ErrorText';
import Button from '@/components/Atoms/Button';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
//styles
import { FONT_SIZE, LINE_HEIGHT } from '@/styles/font';
import OpenColor from 'open-color';
import { moveToNext } from '@/utils/utils';

const ChangePasswordScreen = () => {
  const newPasswordRef = useRef<TextInput>(null);
  const confirmNewPasswordRef = useRef<TextInput>(null);

  const navigation =
    useNavigation<NativeStackNavigationProp<SettingStackParamList>>();

  const {
    control,
    watch,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordForm>();

  const checkPassword = useCallback(
    async (oldPassword: string, user: FirebaseAuthTypes.User | null) => {
      if (user && user.email) {
        const credentail = auth.EmailAuthProvider.credential(
          user.email,
          oldPassword,
        );
        return await user.reauthenticateWithCredential(credentail);
      } else {
        throw new Error('로그인되어 있지 않습니다.');
      }
    },
    [],
  );

  const onSubmit = useCallback(async (data: ChangePasswordForm) => {
    const user = auth().currentUser;
    try {
      if (user) {
        await checkPassword(data.oldPassword, user);
        await user.updatePassword(data.newPassword);
        Toast.show({
          type: 'success',
          text1: '비밀번호가 변경되었습니다',
          visibilityTime: 2000,
        });
        reset();
      }
    } catch (error: any) {
      if (error.code === 'auth/wrong-password') {
        Toast.show({
          type: 'error',
          text1: '기존 비밀번호가 잘못되었습니다.',
          visibilityTime: 2000,
        });
      }
    }
  }, []);

  return (
    <AppLayout>
      <KeyboardAvoidingViewContainer>
        <Header headerLeft={() => <HeaderLeft navigation={navigation} />}>
          <Text style={{ fontSize: FONT_SIZE.BODY, color: OpenColor.black }}>
            비밀번호 변경
          </Text>
        </Header>
        <Margin space={16} />
        <ScrollViewContainer>
          <Text
            style={{
              fontSize: FONT_SIZE.CALLOUT,
              lineHeight: LINE_HEIGHT.CALLOUT,
              color: OpenColor.black,
            }}
          >
            기존 비밀번호
          </Text>
          <Margin space={8} />
          <View style={styles.TextInputContainer}>
            <Controller
              name="oldPassword"
              control={control}
              rules={{
                required: true,
                minLength: {
                  value: 8,
                  message: '8자리이상 해주세요',
                },
              }}
              render={({ field: { onChange } }) => (
                <TextInput
                  onChangeText={onChange}
                  value={watch('oldPassword')}
                  returnKeyType="next"
                  autoCapitalize="none"
                  secureTextEntry
                  onSubmitEditing={() => moveToNext(newPasswordRef)}
                  selectionColor={OpenColor.blue[6]}
                  style={styles.TextInput}
                  placeholder="기존 비밀번호를 입력해 주세요"
                />
              )}
            />
          </View>
          <Margin space={4} />
          {errors.oldPassword && (
            <ErrorText>
              {errors?.oldPassword?.message || '기존 비밀번호를 입력해주세요'}
            </ErrorText>
          )}
          <Margin space={24} />
          <Text
            style={{
              fontSize: FONT_SIZE.CALLOUT,
              lineHeight: LINE_HEIGHT.CALLOUT,
              color: OpenColor.black,
            }}
          >
            새로운 비밀번호
          </Text>
          <Margin space={8} />
          <View style={styles.TextInputContainer}>
            <Controller
              name="newPassword"
              control={control}
              rules={{
                required: true,
                minLength: {
                  value: 8,
                  message: '8자리이상 해주세요',
                },
              }}
              render={({ field: { onChange } }) => (
                <TextInput
                  ref={newPasswordRef}
                  onChangeText={onChange}
                  value={watch('newPassword')}
                  returnKeyType="next"
                  autoCapitalize="none"
                  secureTextEntry
                  onSubmitEditing={() => moveToNext(confirmNewPasswordRef)}
                  selectionColor={OpenColor.blue[6]}
                  style={styles.TextInput}
                  placeholder="비밀번호 (8자리 이상)"
                />
              )}
            />
          </View>
          <Margin space={4} />
          {errors.newPassword && (
            <ErrorText>
              {errors?.newPassword?.message || '새로운 비밀번호를 입력해주세요'}
            </ErrorText>
          )}
          <Margin space={4} />
          <View style={styles.TextInputContainer}>
            <Controller
              name="confirmNewPassword"
              control={control}
              rules={{
                required: true,
                minLength: {
                  value: 8,
                  message: '8자리이상 해주세요',
                },
                validate: value =>
                  value === watch('newPassword') ||
                  '비밀번호가 일치하지 않습니다',
              }}
              render={({ field: { onChange } }) => (
                <TextInput
                  ref={confirmNewPasswordRef}
                  onChangeText={onChange}
                  value={watch('confirmNewPassword')}
                  returnKeyType="done"
                  autoCapitalize="none"
                  secureTextEntry
                  onSubmitEditing={handleSubmit(onSubmit)}
                  selectionColor={OpenColor.blue[6]}
                  style={styles.TextInput}
                  placeholder="비밀번호를 한번 더 입력해 주세요"
                />
              )}
            />
          </View>
          <Margin space={4} />
          {errors.confirmNewPassword && (
            <ErrorText>
              {errors?.confirmNewPassword?.message ||
                '비밀번호를 한번 더 입력해주세요'}
            </ErrorText>
          )}
          <Margin space={24} />
          <Button
            label="변경하기"
            onPress={handleSubmit(onSubmit)}
            isLoading={isSubmitting}
          />
        </ScrollViewContainer>
      </KeyboardAvoidingViewContainer>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  TextInputContainer: {
    position: 'relative',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: OpenColor.white,
    borderWidth: 1,
    borderColor: OpenColor.gray[3],
  },
  TextInput: {
    width: '100%',
    fontSize: FONT_SIZE.CALLOUT,
    padding: 0,
  },
});

export default ChangePasswordScreen;
