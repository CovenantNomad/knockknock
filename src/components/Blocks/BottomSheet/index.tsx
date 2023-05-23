import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import {
  Modal,
  StyleSheet,
  Animated,
  Pressable,
  Dimensions,
  PanResponder,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
//components
import Button from '@components/Atoms/Button';
import Margin from '@/components/Atoms/Margin';
//styles
import OpenColor from 'open-color';
import { FONT_SIZE, LINE_HEIGHT } from '@/styles/font';

interface BottomSheetProps {
  name: string;
  icon: string;
  bodyText: string;
  actionLabel: string;
  actionHandler: () => void;
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
}

const BottomSheet = ({
  name,
  icon,
  bodyText,
  actionLabel,
  modalVisible,
  setModalVisible,
  actionHandler,
}: BottomSheetProps) => {
  const { bottom } = useSafeAreaInsets();
  const screenHeight = Dimensions.get('screen').height;
  const panY = useRef(new Animated.Value(screenHeight)).current;
  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  const resetBottomSheet = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  const closeBottomSheet = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 300,
    useNativeDriver: true,
  });

  const panResponders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: (event, gestureState) => {
        panY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dy > 0 && gestureState.vy > 1.5) {
          closeModal();
        } else {
          resetBottomSheet.start();
        }
      },
    }),
  ).current;

  useEffect(() => {
    if (modalVisible) {
      resetBottomSheet.start();
    }
  }, [modalVisible, resetBottomSheet]);

  const closeModal = () => {
    closeBottomSheet.start(() => {
      setModalVisible(false);
    });
  };

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <Pressable style={styles.overlay} onPress={closeModal}>
        <Animated.View
          style={{
            ...styles.contentContainer,
            transform: [{ translateY: translateY }],
          }}
          {...panResponders.panHandlers}
        >
          <View style={[styles.modalView, { paddingBottom: bottom + 16 }]}>
            <Text style={styles.title}>{`${icon} ${name}`}</Text>
            <Margin space={24} />
            <Text style={styles.body}>{bodyText}</Text>
            <View style={styles.buttonGroup}>
              <View style={{ flex: 1 }}>
                <Button
                  label="취소"
                  onPress={closeModal}
                  backgroundColor={OpenColor.gray[1]}
                  textColor={OpenColor.gray[6]}
                />
              </View>
              <Margin horizontal space={16} />
              <View style={{ flex: 1 }}>
                <Button
                  label={actionLabel}
                  onPress={actionHandler}
                  backgroundColor={OpenColor.red[6]}
                  textColor={OpenColor.white}
                />
              </View>
            </View>
          </View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  contentContainer: {
    width: '100%',
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 32,
    paddingHorizontal: 32,
  },
  modalView: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: FONT_SIZE.CALLOUT,
    lineHeight: LINE_HEIGHT.CALLOUT,
    color: OpenColor.black,
    textAlign: 'center',
  },
  body: {
    flex: 1,
    fontSize: FONT_SIZE.BODY,
    color: OpenColor.black,
    textAlign: 'center',
  },
  buttonGroup: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default BottomSheet;
