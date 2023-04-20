import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
//states
import AuthContext from '@/stores/AuthContext';
//navigations
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '@/types/navigations/navigationTypes';
//api
import { useQuery } from 'react-query';
import { getRoutines } from '@/api/routine';
import { FirebaseDailyRoutineType } from '@/types/routines/routineType';
//components
import AppLayout from '@/components/Atoms/Layout/AppLayout';
import ScrollViewContainer from '@/components/Atoms/Container/ScrollViewContainer';
import Header from '@/components/Atoms/Header/Header';
import HeaderBackButton from '@/components/Atoms/Header/HeaderBackButton';
import Margin from '@/components/Atoms/Margin';
import RoutineListItem from '@/components/Organisms/Routine/RoutineListItem';
import SectionTitleText from '@/components/Atoms/Typography/SectionTitle';
//styles
import { FONT_SIZE } from '@/styles/font';
import OpenColor from 'open-color';

const RoutineListScreen = () => {
  const { userInfo } = useContext(AuthContext);
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeList, setActiveList] = useState<FirebaseDailyRoutineType[]>([]);
  const [inActiveList, setInActiveList] = useState<FirebaseDailyRoutineType[]>(
    [],
  );

  const { data } = useQuery<FirebaseDailyRoutineType[]>(
    ['getRoutines', { uid: userInfo!.uid }],
    () => getRoutines(userInfo!.uid),
    {
      enabled: !!userInfo?.uid,
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10,
    },
  );

  useEffect(() => {
    if (data) {
      setIsLoading(true);
      setActiveList(data.filter(item => item.isActive));
      setInActiveList(data.filter(item => !item.isActive));
      setIsLoading(false);
    }
  }, [data]);

  return (
    <AppLayout>
      <Header
        headerLeft={() =>
          HeaderBackButton({
            goBack: navigation.goBack,
            canGoBack: navigation.canGoBack(),
          })
        }
      >
        <Text style={{ fontSize: FONT_SIZE.BODY, color: OpenColor.black }}>
          내 영적루틴 관리
        </Text>
      </Header>
      <Margin space={12} />
      <ScrollViewContainer>
        {isLoading ? (
          <>
            <Margin space={24} />
            <ActivityIndicator />
          </>
        ) : (
          <>
            <SectionTitleText text={'진행중'} />
            <Margin space={24} />
            <View>
              {activeList.length !== 0 ? (
                activeList
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map(item => (
                    <View key={item.routineId}>
                      <RoutineListItem routine={item} />
                      <Margin space={12} />
                    </View>
                  ))
              ) : (
                <Text style={{ textAlign: 'center', color: OpenColor.black }}>
                  현재 진행 중인 영적루틴이 없습니다.
                </Text>
              )}
            </View>
            <Margin space={32} />
            <SectionTitleText text={'이전 루틴'} />
            <Margin space={24} />
            <View>
              {inActiveList.length !== 0 ? (
                inActiveList
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map(item => (
                    <View key={item.routineId}>
                      <RoutineListItem routine={item} />
                      <Margin space={12} />
                    </View>
                  ))
              ) : (
                <Text style={{ textAlign: 'center', color: OpenColor.black }}>
                  이전에 했던 영적루틴이 없습니다.
                </Text>
              )}
            </View>
            <Margin space={32} />
          </>
        )}
        <Margin space={36} />
      </ScrollViewContainer>
    </AppLayout>
  );
};

export default RoutineListScreen;
