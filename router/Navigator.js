import React from 'react';
import { View } from 'react-native';
import Screen from './Screen';
import SlideLeft from './transitions/SlideLeft';

export default class Navigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      componentBuffer: this.computeComponentBuffer(null),
      styles: [],
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
      componentBuffer: this.computeComponentBuffer(prevState),
      styles: animation.getAnimationStyles(),
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

  getComponentIndexStyle(index) {
    return this.state.styles && this.state.styles[index] ? this.state.styles[index] : null;
  }

  computeComponentBuffer(prevState) {
    const Component = this.props.component;

    const renderedComponent = (
      <Component
        key={Math.floor(Math.random() * 1000)}
        push={this.props.push}
        back={this.props.back}
        reset={this.props.reset}
      />
    );

    return [renderedComponent].concat(this.getComponentBuffer(prevState)).slice(0, 2);
  }

  render() {
    const renderElems = this.state.componentBuffer.map((elem, index) => {
      return (
        <Screen key={elem.key} style={this.getComponentIndexStyle(index)}>
          {this.state.componentBuffer[index]}
        </Screen>
      );
    });

    return (
      <View>
        {renderElems}
      </View>
    );
  }
}
