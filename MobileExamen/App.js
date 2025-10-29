// App.js

import * as React from 'react';
// Importeer de zojuist gemaakte HomeScreen
import HomeScreen from './screens/HomeScreen';

export default function App() {
  return (
    // De App component retourneert nu direct de HomeScreen.
    <HomeScreen />
  );
}