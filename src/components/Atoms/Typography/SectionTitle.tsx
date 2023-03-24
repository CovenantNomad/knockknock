import React, { useState } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import OpenColor from 'open-color';
import { FONT_SIZE, LINE_HEIGHT } from '@/styles/font';

interface SectionTitleTextProps {
  text: string;
  tooltipText?: string;
  sectionRight?: () => JSX.Element;
}

const SectionTitleText = ({
  text,
  tooltipText,
  sectionRight,
}: SectionTitleTextProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: sectionRight ? 'space-between' : 'flex-start',
      }}
    >
      <Text
        style={[
          styles.title,
          Platform.OS === 'android' && {
            fontFamily: 'SF-Pro-Bold',
          },
        ]}
      >
        {text}
      </Text>
      {tooltipText && (
        <View style={styles.tooltipContainer}>
          <TouchableOpacity
            onPress={() => setVisible(!visible)}
            style={styles.tooltipIcon}
          >
            <Text style={{ color: OpenColor.gray[6], fontSize: 12 }}>?</Text>
          </TouchableOpacity>
          {visible && (
            <View style={styles.tooltip}>
              <Text style={styles.tooltipText}>{tooltipText}</Text>
            </View>
          )}
        </View>
      )}
      {sectionRight !== undefined && <View>{sectionRight()}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: FONT_SIZE.BODY,
    lineHeight: LINE_HEIGHT.BODY,
    fontWeight: '600',
    color: OpenColor.black,
  },
  tooltipContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  tooltipIcon: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: OpenColor.gray[6],
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tooltip: {
    marginLeft: 8,
  },
  tooltipText: {
    color: OpenColor.gray[6],
    fontSize: FONT_SIZE.SMALLTEXT,
  },
});

export default SectionTitleText;
