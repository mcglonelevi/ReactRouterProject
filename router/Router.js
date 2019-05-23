import React from 'react';
import Navigator from './Navigator';
import Immediate from './transitions/Immediate';

export default class Router extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routeStack: props.routeStack,
    };

    this.push = this.push.bind(this);
    this.back = this.back.bind(this);
    this.reset = this.reset.bind(this);
  }

  push(route, opts = {}) {
    this.setState(prevState => ({
      routeStack: [route].concat(prevState.routeStack),
    }), () => this.updateNavigator(Object.assign({}, Router.DEFAULT_PARAMETERS, opts)));
  }

  back(opts = {}) {
    this.setState(prevState => ({
      routeStack: prevState.routeStack.slice(1),
    }), () => this.updateNavigator(Object.assign({}, Router.DEFAULT_PARAMETERS, opts)));
  }

  reset(opts = {}) {
    this.setState(prevState => ({
      routeStack: prevState.routeStack.slice(-1),
    }), () => this.updateNavigator(Object.assign({}, Router.DEFAULT_PARAMETERS, opts)));
  }

  render() {
    const Component = this.props.routes[this.state.routeStack[0]];
    return (
      <Navigator
        component={Component}
        push={this.push}
        back={this.back}
        reset={this.reset}
        updateNavigator={(func) => { this.updateNavigator = func; }}
      />
    );
  }
}

Router.DEFAULT_PARAMETERS = {
  animation: new Immediate(),
  props: {},
};
