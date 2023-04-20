import AppLayout from '@/components/Atoms/Layout/AppLayout';
import LoadingBar from '@/components/Atoms/LoadingBar';
import Margin from '@/components/Atoms/Margin';
import { FONT_SIZE, LINE_HEIGHT } from '@/styles/font';
import OpenColor from 'open-color';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

interface LoadingScreenProps {
  progress?: {
    downloading: number;
    total: number;
  };
}

const LoadingScreen = ({ progress }: LoadingScreenProps) => {
  return (
    <AppLayout>
      <View style={styles.wrapper}>
        <View style={styles.messageBox}>
          <Text style={styles.title}>Knock-Kncok</Text>
          <Margin space={24} />
          <Text style={styles.description}>최신 업데이트가 있습니다</Text>
          <Margin space={8} />
          <Text style={styles.description}>
            {`최적의 사용 환경을 위해\n최신 버전의 앱으로 업데이트 하겠습니다`}
          </Text>
        </View>
        <Margin space={24} />
        <ActivityIndicator />
        <Margin space={16} />
        {progress != null && (
          <LoadingBar
            downLoading={progress.downloading}
            total={progress.total}
          />
        )}
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  messageBox: {
    width: '100%',
    backgroundColor: OpenColor.white,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    textTransform: 'uppercase',
    fontSize: FONT_SIZE.HEADING_1,
    fontWeight: '600',
    color: OpenColor.black,
  },
  description: {
    fontSize: FONT_SIZE.CALLOUT,
    lineHeight: LINE_HEIGHT.CALLOUT,
    color: OpenColor.black,
    textAlign: 'center',
  },
});

export default LoadingScreen;
