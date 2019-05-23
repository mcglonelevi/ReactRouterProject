import React from 'react';
import { Button, Text, View } from 'react-native';
import SlideLeft from '../router/transitions/SlideLeft';

export default function Screen2(props) {
  return (
    <View style={{
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }}
    >
      <Text>Screen2!</Text>
      <Button title="Screen 1" onPress={() => props.push('/', { animation: new SlideLeft() })} />
    </View>
  );
}
