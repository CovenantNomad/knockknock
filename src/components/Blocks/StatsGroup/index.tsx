import React from 'react';
import { StyleSheet, View } from 'react-native';
import Stats from '@/components/Atoms/Stats';

interface StatsGroupProps {
  stats: { name: string; stats: number }[];
}

const StatsGroup = ({ stats }: StatsGroupProps) => {
  return (
    <View style={styles.container}>
      {stats.map((item, index) => (
        <Stats
          key={item.name}
          number={item.stats}
          text={item.name}
          lastOne={index !== stats.length - 1}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default StatsGroup;
