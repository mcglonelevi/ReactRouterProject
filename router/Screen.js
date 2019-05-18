import React from 'react';
import { Animated, Dimensions } from 'react-native';

export default class Screen extends React.Component{
  componentWillUnmount() {
    console.log('UNMOUNTING');
  }

  render() {
    const { height, width } = Dimensions.get('window');
    const styleObject = {
      height,
      width,
      position: 'absolute',
      top: 0,
      left: 0,
      ...this.props.style
    };

    return (
      <Animated.View
        style={styleObject}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}
