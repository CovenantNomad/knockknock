import React, { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import CodePush from 'react-native-code-push';
//states
import AuthContext from '@/stores/AuthContext';
//navigations
import { useNavigation } from '@react-navigation/native';
import { SettingStackParamList } from '@/types/navigations/navigationTypes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
//components
import AppLayout from '@/components/Atoms/Layout/AppLayout';
import ScrollViewContainer from '@/components/Atoms/Container/ScrollViewContainer';
import Header from '@/components/Atoms/Header/Header';
import Margin from '@/components/Atoms/Margin';
import Button from '@/components/Atoms/Button';
import Divider from '@/components/Atoms/Divider';
import LocalImage from '@/components/Atoms/LocalImage';
import MenuItem from '@/components/Blocks/MenuItem/MenuItem';
// styles
import OpenColor from 'open-color';
import { FONT_SIZE, LINE_HEIGHT } from '@/styles/font';

import { version } from '../../../../../package.json';
import useCodePush from '@/hooks/useCodePush';

interface SettingScreenProps {}

const SettingScreen = ({}: SettingScreenProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<SettingStackParamList>>();
  const { userInfo, signOut } = useContext(AuthContext);
  const { updateAvailable } = useCodePush();

  return (
    <AppLayout backgroundColor={OpenColor.white}>
      <Header>
        <Text style={{ fontSize: FONT_SIZE.BODY, color: OpenColor.black }}>
          설정
        </Text>
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
            style={{ fontSize: FONT_SIZE.SMALLTEXT, color: OpenColor.gray[6] }}
          >
            버전 {version}
          </Text>
        </View>
        <Divider />
        <Margin space={12} />
        <Text
          style={{
            fontSize: FONT_SIZE.CALLOUT,
            lineHeight: LINE_HEIGHT.CALLOUT,
            color: OpenColor.gray[6],
          }}
        >
          계정설정
        </Text>
        <Margin space={12} />
        <MenuItem title={'이메일'} status={userInfo?.email} />
        <MenuItem
          title={'비밀번호 재설정'}
          onPress={() => navigation.navigate('ChangePassword')}
        />
        <MenuItem
          title={'회원탈퇴'}
          onPress={() => navigation.navigate('Withdraw')}
        />
        <Margin space={24} />
        <Text
          style={{
            fontSize: FONT_SIZE.CALLOUT,
            lineHeight: LINE_HEIGHT.CALLOUT,
            color: OpenColor.gray[6],
          }}
        >
          앱 관리
        </Text>
        <Margin space={12} />
        <MenuItem
          title={'업데이트 정보'}
          status={updateAvailable ? '업데이트 있음' : '최신상태'}
          onPress={() => navigation.navigate('Update')}
        />
        <MenuItem
          title={'알림'}
          onPress={() => navigation.navigate('ReminderList')}
        />
        <Margin space={32} />
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

export default SettingScreen;
