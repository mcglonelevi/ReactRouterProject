import React from 'react';
import Screen1 from '../components/Screen1';
import Screen2 from '../components/Screen2';
import Navigator from './Navigator';

export default class Router extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: {
        '/': Screen1,
        '/screen2': Screen2,
      },
      routeStack: ['/'],
    };

    this.push = this.push.bind(this);
    this.back = this.back.bind(this);
    this.reset = this.reset.bind(this);
  }

  push(route) {
    this.setState(prevState => ({
      routeStack: [route].concat(prevState.routeStack),
    }), () => this.updateNavigator());
  }

  back() {
    this.setState(prevState => ({
      routeStack: prevState.routeStack.slice(1),
    }), () => this.updateNavigator());
  }

  reset() {
    this.setState(prevState => ({
      routeStack: prevState.routeStack.slice(-1),
    }), () => this.updateNavigator());
  }

  render() {
    const Component = this.state.routes[this.state.routeStack[0]];
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
