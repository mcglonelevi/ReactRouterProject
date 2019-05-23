import React from 'react';
import { Animated, Dimensions } from 'react-native';

export default function Screen(props) {
  const { height, width } = Dimensions.get('window');
  const styleObject = {
    height,
    width,
    position: 'absolute',
    top: 0,
    left: 0,
    ...props.style,
  };

  return (
    <Animated.View
      style={styleObject}
    >
      {props.children}
    </Animated.View>
  );
}
