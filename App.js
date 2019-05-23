import React from 'react';
import Router from './router/Router';
import Screen1 from './components/Screen1';
import Screen2 from './components/Screen2';

export default function App() {
  return (
    <Router
      routes={{
        '/': Screen1,
        '/screen2': Screen2,
      }}
      routeStack={['/']}
    />
  );
}
