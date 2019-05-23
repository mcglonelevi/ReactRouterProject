import React from 'react';
import { Button, Text, View } from 'react-native';

export default function Screen1(props) {
  return (
    <View style={{
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }}
    >
      <Text>Screen1!</Text>
      <Button title="Screen 2" onPress={() => props.push('/screen2')} />
    </View>
  );
}
