import Button from '@/components/Atoms/Button';
import ScrollViewContainer from '@/components/Atoms/Container/ScrollViewContainer';
import Divider from '@/components/Atoms/Divider';
import Header from '@/components/Atoms/Header/Header';
import HeaderBackButton from '@/components/Atoms/Header/HeaderBackButton';
import AppLayout from '@/components/Atoms/Layout/AppLayout';
import LocalImage from '@/components/Atoms/LocalImage';
import Margin from '@/components/Atoms/Margin';
import AuthContext from '@/stores/AuthContext';
import { FONT_SIZE, LINE_HEIGHT } from '@/styles/font';
import { HomeStackParamList } from '@/types/navigations/navigationTypes';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import OpenColor from 'open-color';
import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface SettingScreenProps {}

const SettingScreen = ({}: SettingScreenProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const { signOut } = useContext(AuthContext);

  return (
    <AppLayout backgroundColor={OpenColor.white}>
      <Header
        headerLeft={() =>
          HeaderBackButton({
            goBack: navigation.goBack,
            canGoBack: navigation.canGoBack(),
          })
        }
      >
        <Text style={{ fontSize: FONT_SIZE.BODY }}>설정</Text>
      </Header>
      <ScrollViewContainer>
        <View
          style={{
            alignItems: 'center',
            paddingVertical: 32,
          }}
        >
          <View
            style={{
              padding: 6,
              borderWidth: 1,
              borderColor: OpenColor.gray[2],
              borderRadius: 16,
            }}
          >
            <LocalImage
              source={require('../../../../assets/images/icon.png')}
              width={48}
              height={48}
              style={{ resizeMode: 'contain' }}
            />
          </View>
          <Margin space={12} />
          <Text
            style={{
              fontSize: FONT_SIZE.CALLOUT,
              lineHeight: LINE_HEIGHT.CALLOUT,
              fontWeight: '600',
              color: OpenColor.black,
            }}
          >
            Knock-Knock
          </Text>
          <Text
            style={{ fontSize: FONT_SIZE.SMALLTEXT, color: OpenColor.gray[4] }}
          >
            버전 1.0.0
          </Text>
        </View>
        <Divider />
        <Margin space={12} />
        <Text
          style={{
            fontSize: FONT_SIZE.CALLOUT,
            lineHeight: LINE_HEIGHT.CALLOUT,
            fontWeight: '600',
            color: OpenColor.black,
          }}
        >
          설정
        </Text>
        <Margin space={24} />
        <View style={{ width: '50%', alignSelf: 'center' }}>
          <Button
            label={'로그아웃'}
            onPress={signOut}
            backgroundColor={OpenColor.orange[5]}
            textColor={OpenColor.white}
          />
        </View>
      </ScrollViewContainer>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

export default SettingScreen;
