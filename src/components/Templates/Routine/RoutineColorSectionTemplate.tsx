import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import OpenColor from 'open-color';
import Fontisto from 'react-native-vector-icons/Fontisto';
//compoents
import ScrollViewContainer from '@/components/Atoms/Container/ScrollViewContainer';
import SectionTitleText from '@/components/Atoms/Typography/SectionTitle';
import Margin from '@/components/Atoms/Margin';
//types
import { RoutineType } from '@/types/routines/routineType';
import { colorPalettes } from '@/constants/colorPalette';

interface RoutineColorSectionTemplateProps {
  routine: RoutineType;
  onSelectHandler: (item: string) => void;
}

const RoutineColorSectionTemplate = ({
  routine,
  onSelectHandler,
}: RoutineColorSectionTemplateProps) => {
  return (
    <ScrollViewContainer>
      {colorPalettes.map(palette => (
        <View key={palette.title}>
          <Margin space={18} />
          <SectionTitleText text={palette.title} />
          <Margin space={8} />
          <View style={styles.contentContainer}>
            {palette.palette.map(item => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.item,
                  {
                    backgroundColor: item,
                    borderWidth: routine.color === item ? 2 : 0,
                    borderColor: OpenColor.gray[4],
                  },
                ]}
                onPress={() => onSelectHandler(item)}
              >
                {routine.color === item && (
                  <Fontisto name="check" size={12} color={OpenColor.white} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
      <Margin space={18} />
    </ScrollViewContainer>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  item: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RoutineColorSectionTemplate;
