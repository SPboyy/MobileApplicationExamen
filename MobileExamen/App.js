// App.js

import * as React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Constants from 'expo-constants'; 

// Importeer uw containers/views
import PokemonContainer from './container/PokemonContainer';
import ProfileContainer from './container/ProfileContainer'; 

const initialLayout = { width: Dimensions.get('window').width };

// Definieer de Views voor de Tabs
const renderScene = SceneMap({
  home: PokemonContainer,
  profile: ProfileContainer,
});

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: 'white' }}
    style={{ backgroundColor: '#FF0000', paddingTop: Constants.statusBarHeight }}
    labelStyle={{ fontWeight: 'bold' }}
  />
);

export default function App() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Lijst' },
    { key: 'profile', title: 'Profiel' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
}