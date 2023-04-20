import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
//navigation
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SettingStackParamList } from '@/types/navigations/navigationTypes';
//components
import AppLayout from '@/components/Atoms/Layout/AppLayout';
import ScrollViewContainer from '@/components/Atoms/Container/ScrollViewContainer';
import Header from '@/components/Atoms/Header/Header';
import HeaderLeft from '@/components/Atoms/Header/HeaderLeft';
import Margin from '@/components/Atoms/Margin';
//styles
import { FONT_SIZE, LINE_HEIGHT } from '@/styles/font';
import OpenColor from 'open-color';
import BottomSheet from '@/components/Blocks/BottomSheet';
import { View } from 'react-native';
import Button from '@/components/Atoms/Button';

interface WithdrawScreenProps {}

const WithdrawScreen = ({}: WithdrawScreenProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<SettingStackParamList>>();

  const [modalVisible, setModalVisible] = useState(false);

  const onDeleteHandler = () => {};

  return (
    <AppLayout>
      <Header headerLeft={() => <HeaderLeft navigation={navigation} />}>
        <Text style={{ fontSize: FONT_SIZE.BODY, color: OpenColor.black }}>
          회원탈퇴
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
          {`Knock-Knock을 이용하시는데 불편함이 있으셨나요?\n더 좋은 서비스로 다시 만날 수 있기를 바랍니다`}
        </Text>
        <Margin space={48} />
        <View>
          <Button label="회원 탈퇴하기" onPress={() => setModalVisible(true)} />
        </View>

        <BottomSheet
          icon={'😥'}
          name={'회원탈퇴'}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          bodyText={'정말 계정을 삭제하실껀가요?'}
          actionLabel={'회원탈퇴'}
          actionHandler={onDeleteHandler}
        />
      </ScrollViewContainer>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

export default WithdrawScreen;
