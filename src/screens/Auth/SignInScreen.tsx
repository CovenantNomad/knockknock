import React, { useCallback, useContext, useRef } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { LoginFormType } from '@/types/auth/auth';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/types/navigations/navigationTypes';
import AuthContext from '@/stores/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AuthLayout from '@components/Atoms/Layout/AuthLayout';
import KeyboardAvoidingViewContainer from '@/components/Atoms/Container/KeyboardAvoidingViewLayout';
import Margin from '@components/Atoms/Margin';
import { emailRegExp, moveToNext } from '@/utils/utils';
import OpenColor from 'open-color';
import DisplayText from '@/components/Atoms/Typography/DisplayText';
import ErrorText from '@/components/Atoms/Typography/ErrorText';
import LinkText from '@/components/Atoms/Typography/LinkText';
import Button from '@/components/Atoms/Button';
import { FONT_SIZE } from '@/styles/font';
import AppTitleText from '@/components/Atoms/Typography/AppTitleText';

interface SignInScreenProps {}

const SignInScreen = ({}: SignInScreenProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { signIn, isSignInLoading } = useContext(AuthContext);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormType>();

  const passwordRef = useRef<TextInput>(null);

  const onSubmit = useCallback(
    async (data: LoginFormType) => {
      await signIn({ email: data.email, password: data.password });
    },
    [signIn],
  );

  const onMoveSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  return (
    <AuthLayout>
      <KeyboardAvoidingViewContainer>
        <>
          <Margin space={96} />
          <AppTitleText>Knock Knock</AppTitleText>
          <DisplayText>{'주님과 나의 약속시간'}</DisplayText>
          <Margin space={42} />
          <View style={styles.TextInputContainer}>
            <Ionicons name="mail" size={18} color={OpenColor.gray[6]} />
            <Controller
              name="email"
              control={control}
              rules={{
                required: true,
                pattern: {
                  value: emailRegExp,
                  message: '이메일 형식 아닙니다',
                },
              }}
              render={({ field: { onChange } }) => (
                <TextInput
                  onChangeText={onChange}
                  value={watch('email')}
                  keyboardType="email-address"
                  returnKeyType="next"
                  autoCapitalize="none"
                  onSubmitEditing={() => moveToNext(passwordRef)}
                  selectionColor={OpenColor.blue[6]}
                  style={styles.TextInput}
                  placeholder="이메일"
                />
              )}
            />
          </View>
          <Margin space={4} />
          {errors.email && (
            <ErrorText>
              {errors?.email?.message || '이메일을 입력해주세요'}
            </ErrorText>
          )}
          <Margin space={12} />
          <View style={styles.TextInputContainer}>
            <Ionicons
              name="ios-lock-closed"
              size={18}
              color={OpenColor.gray[6]}
            />
            <Controller
              name="password"
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
                  ref={passwordRef}
                  onChangeText={onChange}
                  value={watch('password')}
                  returnKeyType="done"
                  autoCapitalize="none"
                  secureTextEntry
                  onSubmitEditing={handleSubmit(onSubmit)}
                  selectionColor={OpenColor.blue[6]}
                  style={styles.TextInput}
                  placeholder="비밀번호"
                />
              )}
            />
          </View>
          <Margin space={4} />
          {errors.password && (
            <ErrorText>
              {errors?.password?.message || '비밀번호를 입력해주세요'}
            </ErrorText>
          )}
          <Margin space={24} />
          <Button
            label="로그인"
            onPress={handleSubmit(onSubmit)}
            isLoading={isSignInLoading}
          />
          <Margin space={16} />
          <LinkText
            onPress={onMoveSignUp}
            description={'계정이 없으신가요?'}
            linkText={'회원가입 →'}
          />
        </>
      </KeyboardAvoidingViewContainer>
    </AuthLayout>
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
    paddingVertical: 4,
    backgroundColor: OpenColor.gray[1],
  },
  TextInput: {
    width: '100%',
    fontSize: FONT_SIZE.CALLOUT,
    paddingVertical: 12,
    marginLeft: 12,
    padding: 0,
  },
});

export default SignInScreen;
