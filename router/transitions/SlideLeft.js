import { Dimensions, Animated } from 'react-native';

export default function getSlideLeft() {
  const { height, width } = Dimensions.get('window');

  return {
    style: {
      position: 'relative',
      flexDirection: 'row',
      left: new Animated.Value(-width),
    },
    to: {
      toValue: 0,
      duration: 1000,
    },
    property: 'left',
  };
}
