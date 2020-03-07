import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';

import fonts from '../config/fonts';

export const Empty = props => {
  const {image, title} = props;
  return (
    <View style={styles.contentEmpty}>
      <Image style={styles.imageEmpty} source={image} />
      <Text style={styles.textEmpty}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  imageEmpty: {
    width: 300,
    height: 300,
  },
  contentEmpty: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textEmpty: {
    fontFamily: fonts.medium,
    fontSize: 17,
  },
});
