import React from 'react';
import Screen1 from '../components/Screen1';
import Screen2 from '../components/Screen2';
import Screen from './Screen';
import { Animated, View } from 'react-native';
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

  removeOldComponent() {
    this.setState({
      componentBuffer: this.getComponentBuffer().slice(0, 1),
    });
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

  propsChanged(prevState) {
    return prevState.componentBuffer[0].key != this.state.componentBuffer[0].key;
  }

  getComponentBuffer() {
    return (this.state && this.state.componentBuffer ? this.state.componentBuffer : []);
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
          reset={this.props.reset} />
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
