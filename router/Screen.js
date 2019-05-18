import React from 'react';
import { Dimensions, View } from 'react-native';

export default function Screen(props) {
  const { height, width } = Dimensions.get('window');

  return (
    <View
      style={{
        height,
        width,
      }}
    >
      {props.children}
    </View>
  );
}
