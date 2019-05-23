import { Dimensions, Animated } from 'react-native';

export default class SlideLeft {
  constructor() {
    const { width } = Dimensions.get('window');

    this.width = width;
    this.incrementer = new Animated.Value(0);
  }

  // Returns an array. 0 is for new, 1 is for old.
  getAnimationStyles() {
    return [
      {
        transform: [{
          translateX: this.incrementer.interpolate({
            inputRange: [0, 1],
            outputRange: [this.width, 0],
          }),
        }],
      },
      {
        transform: [{
          translateX: this.incrementer.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -this.width],
          }),
        }],
      },
    ];
  }

  animate(callback) {
    Animated.timing(this.incrementer, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(callback);
  }
}
