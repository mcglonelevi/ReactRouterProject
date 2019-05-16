import React from 'react';
import { Button, Text, View } from 'react-native';

export default class Screen1 extends React.Component {
  componentDidMount() {
    console.log('Screen 1 mounted.');
  }

  componentWillUnmount() {
    console.log('Screen 1 unmounted.');
  }

  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Text>Screen1!</Text>
        <Button title="Screen 2" onPress={() => this.props.push('/screen2')} />
      </View>
    );
  }
}
