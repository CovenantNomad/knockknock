import Button from '@/components/Atoms/Button';
import KeyboardAvoidingViewContainer from '@/components/Atoms/Container/KeyboardAvoidingViewLayout';
import Header from '@/components/Atoms/Header/Header';
import Margin from '@/components/Atoms/Margin';
import ErrorText from '@/components/Atoms/Typography/ErrorText';
import HeaderTitle from '@/components/Atoms/Typography/HeaderTitle';
import LinkText from '@/components/Atoms/Typography/LinkText';
import AuthContext from '@/stores/AuthContext';
import { FONT_SIZE, LINE_HEIGHT } from '@/styles/font';
import { SignUpFormType } from '@/types/auth/auth';
import { RootStackParamList } from '@/types/navigations/navigationTypes';
import { emailRegExp, moveToNext } from '@/utils/utils';
import AuthLayout from '@components/Atoms/Layout/AuthLayout';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import OpenColor from 'open-color';
import React, { useContext } from 'react';
import { useCallback } from 'react';
import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface SignUpScreenProps {}

const SignUpScreen = ({}: SignUpScreenProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { isSignUpLoading, signUp, setIsSignUpLoading } =
    useContext(AuthContext);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormType>();

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const onSubmit = useCallback(
    async (data: SignUpFormType) => {
      setIsSignUpLoading(true);
      await signUp(data.email, data.password, data.username);
      Toast.show({
        type: 'success',
        text1: '회원가입을 축하합니다',
        text2: '영적루틴을 견고히 세워나갑시다',
        visibilityTime: 2000,
      });
      setTimeout(() => {
        setIsSignUpLoading(false);
      }, 2000);
    },
    [navigation, signUp],
  );

  const onMoveSignIn = useCallback(() => {
    navigation.navigate('SignIn');
  }, [navigation]);

  return (
    <AuthLayout>
      <KeyboardAvoidingViewContainer>
        <>
          <Margin space={16} />
          <Header>
            <HeaderTitle>회원가입</HeaderTitle>
          </Header>
          <Margin space={24} />
          <View style={styles.TextInputContainer}>
            <Ionicons name="person" size={18} color={OpenColor.gray[6]} />
            <Controller
              name="username"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange } }) => (
                <TextInput
                  onChangeText={onChange}
                  value={watch('username')}
                  keyboardType="default"
                  returnKeyType="next"
                  autoCapitalize="none"
                  onSubmitEditing={() => moveToNext(emailRef)}
                  selectionColor={OpenColor.blue[6]}
                  style={styles.TextInput}
                  placeholder="이름"
                />
              )}
            />
          </View>
          <Margin space={4} />
          {errors.username && (
            <ErrorText>
              {errors?.username?.message || '이름을 입력해주세요'}
            </ErrorText>
          )}
          <Margin space={12} />
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
                  ref={emailRef}
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
                  returnKeyType="next"
                  autoCapitalize="none"
                  secureTextEntry
                  onSubmitEditing={handleSubmit(onSubmit)}
                  selectionColor={OpenColor.blue[6]}
                  style={styles.TextInput}
                  placeholder="비밀번호 (8자리 이상)"
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
          <Margin space={12} />
          <View style={styles.TextInputContainer}>
            <Ionicons
              name="ios-lock-closed"
              size={18}
              color={OpenColor.gray[6]}
            />
            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: true,
                minLength: {
                  value: 8,
                  message: '8자리이상 해주세요',
                },
                validate: value =>
                  value === watch('password') || '비밀번호가 일치하지 않습니다',
              }}
              render={({ field: { onChange } }) => (
                <TextInput
                  ref={confirmPasswordRef}
                  onChangeText={onChange}
                  value={watch('confirmPassword')}
                  returnKeyType="done"
                  autoCapitalize="none"
                  secureTextEntry
                  onSubmitEditing={handleSubmit(onSubmit)}
                  selectionColor={OpenColor.blue[6]}
                  style={styles.TextInput}
                  placeholder="비밀번호 확인"
                />
              )}
            />
          </View>
          <Margin space={4} />
          {errors.confirmPassword && (
            <ErrorText>
              {errors?.confirmPassword?.message ||
                '비밀번호를 한번 더 입력해주세요'}
            </ErrorText>
          )}
          <Margin space={24} />
          <Button
            label="회원가입"
            onPress={handleSubmit(onSubmit)}
            isLoading={isSignUpLoading}
          />
          <Margin space={16} />
          <LinkText
            onPress={onMoveSignIn}
            description={'이미 계정이 있나요?'}
            linkText={'로그인 →'}
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

export default SignUpScreen;
