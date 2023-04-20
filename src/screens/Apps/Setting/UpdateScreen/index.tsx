import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
//navigations
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SettingStackParamList } from '@/types/navigations/navigationTypes';
//styles
import { FONT_SIZE, LINE_HEIGHT } from '@/styles/font';
import OpenColor from 'open-color';
//components
import Header from '@/components/Atoms/Header/Header';
import HeaderLeft from '@/components/Atoms/Header/HeaderLeft';
import AppLayout from '@/components/Atoms/Layout/AppLayout';
import ScrollViewContainer from '@/components/Atoms/Container/ScrollViewContainer';
import Margin from '@/components/Atoms/Margin';
import useCodePush from '@/hooks/useCodePush';
import Button from '@/components/Atoms/Button';
import LoadingBar from '@/components/Atoms/LoadingBar';

interface UpdateScreenProps {}

const UpdateScreen = ({}: UpdateScreenProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<SettingStackParamList>>();
  const { updateAvailable, isUpdating, progress, updateApp } = useCodePush();

  return (
    <AppLayout>
      <Header headerLeft={() => <HeaderLeft navigation={navigation} />}>
        <Text style={{ fontSize: FONT_SIZE.BODY, color: OpenColor.black }}>
          업데이트 정보
        </Text>
      </Header>
      <Margin space={24} />
      <ScrollViewContainer>
        <Text
          style={{
            fontSize: FONT_SIZE.CALLOUT,
            lineHeight: LINE_HEIGHT.CALLOUT,
            color: OpenColor.black,
          }}
        >
          업데이트 정보
        </Text>
        <Margin space={16} />
        <Text
          style={{
            fontSize: FONT_SIZE.BODY,
            lineHeight: LINE_HEIGHT.BODY,
            color: OpenColor.black,
          }}
        >
          {updateAvailable
            ? '업데이트 내용이 있습니다\n업데이트를 통해 앱을 최신의 상태로 유지해주세요'
            : '현재 최신버전의 상태입니다'}
        </Text>
        <Margin space={36} />
        {updateAvailable && (
          <View style={{ width: '50%', alignSelf: 'center' }}>
            <Button
              label={'업데이트'}
              onPress={updateApp}
              backgroundColor={OpenColor.blue[6]}
              textColor={OpenColor.white}
            />
          </View>
        )}
        {isUpdating && progress != null && (
          <View>
            <Margin space={48} />
            <Text>업데이트 중...</Text>
            <Margin space={12} />
            <LoadingBar
              downLoading={progress.receivedBytes}
              total={progress.totalBytes}
            />
          </View>
        )}
      </ScrollViewContainer>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default UpdateScreen;
