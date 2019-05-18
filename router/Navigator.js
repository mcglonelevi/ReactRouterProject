import React from 'react';
import { Animated } from 'react-native';
import Screen from './Screen';
import getSlideLeft from './transitions/SlideLeft';

export default class Navigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      componentBuffer: this.computeComponentBuffer(),
      containerStyle: null,
    };

    this.updateNavigator = this.updateNavigator.bind(this);
    this.removeOldComponent = this.removeOldComponent.bind(this);
  }

  componentDidMount() {
    this.props.updateNavigator(this.updateNavigator);
  }

  getComponentBuffer() {
    return (this.state && this.state.componentBuffer ? this.state.componentBuffer : []);
  }

  propsChanged(prevState) {
    return prevState.componentBuffer[0].key !== this.state.componentBuffer[0].key;
  }

  updateNavigator() {
    const transition = getSlideLeft();
    const animate = () => {
      Animated.timing(
        transition.style[transition.property],
        transition.to,
      ).start(this.removeOldComponent);
    };
    this.setState({
      componentBuffer: this.computeComponentBuffer(),
      containerStyle: transition.style,
    }, animate);
  }

  removeOldComponent() {
    this.setState({
      componentBuffer: this.getComponentBuffer().slice(0, 1),
      containerStyle: null,
    });
  }

  computeComponentBuffer() {
    const Component = this.props.component;
    const renderedComponent = (
      <Screen
        key={Math.floor(Math.random() * 1000)}
      >
        <Component
          push={this.props.push}
          back={this.props.back}
          reset={this.props.reset}
        />
      </Screen>
    );

    return [renderedComponent].concat(this.getComponentBuffer()).slice(0, 2);
  }

  render() {
    return (
      <Animated.View style={this.state.containerStyle}>
        {this.state.componentBuffer}
      </Animated.View>
    );
  }
}
