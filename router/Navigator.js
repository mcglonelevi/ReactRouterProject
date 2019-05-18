import React from 'react';
import { View } from 'react-native';
import Screen from './Screen';
import SlideLeft from './transitions/SlideLeft';

export default class Navigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      componentBuffer: this.computeComponentBuffer(null, null),
      styles: {},
    };

    this.updateNavigator = this.updateNavigator.bind(this);
    this.removeOldComponent = this.removeOldComponent.bind(this);
  }

  componentDidMount() {
    this.props.updateNavigator(this.updateNavigator);
  }

  getComponentBuffer(prevState) {
    return (prevState && prevState.componentBuffer ? prevState.componentBuffer : []);
  }

  updateNavigator() {
    const animation = new SlideLeft();

    this.setState((prevState) => ({
      componentBuffer: this.computeComponentBuffer(prevState, animation.getAnimationStyles()),
    }), () => {
      animation.animate(this.removeOldComponent);
    });
  }

  removeOldComponent() {
    this.setState((prevState) => {
      const componentBuffer = this.getComponentBuffer(prevState).slice(0, 1);
      componentBuffer[0].props.style = null;

      return {
        componentBuffer
      };
    });
  }

  getComponentIndexStyle(styles, index) {
    return styles && styles[index] ? styles[index] : null;
  }

  computeComponentBuffer(prevState, styles) {
    const Component = this.props.component;
    const key = Math.floor(Math.random() * 10);

    if (this.state && this.state.styles) {
      this.state.styles[key] = this.getComponentIndexStyle(styles, 0);
    }
    

    const renderedComponent = (
      <Screen key={key} style={this.state && this.state.styles && this.state.styles[key] || null}>
        <Component
          push={this.props.push}
          back={this.props.back}
          reset={this.props.reset}
        />
      </Screen>
    );

    const componentStack = [renderedComponent].concat(this.getComponentBuffer(prevState)).slice(0, 2);

    if (componentStack[1]) {
      this.state.styles[componentStack[1].key] = this.getComponentIndexStyle(styles, 1);
    }

    return componentStack;
  }

  render() {
    return (
      <View>
        {this.state.componentBuffer}
      </View>
    );
  }
}
