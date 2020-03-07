import React from 'react';
import {View, StyleSheet} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export const Placeholder = () => {
  return Array.from({length: 5}).map((_, index) => (
    <View key={index} style={styles.margin}>
      <SkeletonPlaceholder speed={900}>
        <View style={styles.row}>
          <View style={styles.container}>
            <View style={styles.firstContent} />
            <View style={styles.secondContent} />
            <View style={styles.thirdContent} />
            <View style={styles.thirdContent} />
          </View>
          <View style={styles.image} />
        </View>
      </SkeletonPlaceholder>
    </View>
  ));
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    marginLeft: 20,
    flex: 1,
  },
  margin: {
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
  firstContent: {
    width: '70%',
    height: 15,
  },
  secondContent: {
    width: '30%',
    height: 10,
  },
  thirdContent: {
    width: '50%',
    height: 10,
  },
  row: {
    flexDirection: 'row',
  },
});
