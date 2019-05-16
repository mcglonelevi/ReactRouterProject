import React from 'react';
import { Button, Text, View } from 'react-native';

export default class Screen2 extends React.Component {
  componentDidMount() {
    console.log('Screen 2 mounted.');
  }

  componentWillUnmount() {
    console.log('Screen 2 unmounted.');
  }

  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Text>Screen2!</Text>
        <Button title="Screen 1" onPress={() => this.props.push('/')} />
      </View>
    );
  }
}
