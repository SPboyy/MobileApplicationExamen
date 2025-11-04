// App.js
import * as React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Constants from 'expo-constants'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PokemonContainer from './container/PokemonContainer';
import ProfileContainer from './container/ProfileContainer';
import PokemonDetailsScreen from './container/PokemonDetails';

const HomeStack = createNativeStackNavigator();
const initialLayout = { width: Dimensions.get('window').width };

// --- 1. DE STACK NAVIGATOR (VOOR HOME TAB) ---
// Deze beheert de Lijst -> Details flow
const HomeStackNavigator = ({ favoriteIndices, toggleFavorite }) => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen 
                name="PokemonList" 
                options={{ headerShown: false }}
            >
                {(props) => (
                    <PokemonContainer 
                        {...props} 
                        favoriteIndices={favoriteIndices} 
                        toggleFavorite={toggleFavorite}
                    />
                )}
            </HomeStack.Screen>
            <HomeStack.Screen 
                name="PokemonDetails" 
                component={PokemonDetailsScreen} 
                options={({ route }) => ({ 
                    title: route.params?.pokemonData?.name.toUpperCase() || 'DETAILS',
                    headerShown: true
                })}
            />
        </HomeStack.Navigator>
    );
};


// --- 2. DE HOOFD TAB NAVIGATOR (STABIELE VERSIE) ---
export default function App() {
  const [index, setIndex] = React.useState(0);
  const [favoriteIndices, setFavoriteIndices] = React.useState([]); 
  
  const toggleFavorite = (index) => {
    setFavoriteIndices(prevIndices => {
      if (prevIndices.includes(index)) {
        return prevIndices.filter(i => i !== index);
      } else {
        return [...prevIndices, index];
      }
    });
  };
  
  const [routes] = React.useState([
    { key: 'home', title: 'Lijst' },
    { key: 'profile', title: 'Profiel' },
  ]);
  
  // Render Scene Functie
  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'home':
        // De Home tab bevat de volledige Stack Navigatie
        return (
            <NavigationContainer independent={true}>
                <HomeStackNavigator 
                    favoriteIndices={favoriteIndices} 
                    toggleFavorite={toggleFavorite} 
                />
            </NavigationContainer>
        );
      case 'profile':
        return (
            <ProfileContainer 
                shinyCount={favoriteIndices.length}
            />
        );
      default:
        return null;
    }
  };

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'white' }}
      style={{ backgroundColor: '#FF0000', paddingTop: Constants.statusBarHeight }}
      labelStyle={{ fontWeight: 'bold' }}
      renderIcon={({ route, focused, color }) => {
        let iconName = route.key === 'home' ? 'pokeball' : 'account-circle';
        return <MaterialCommunityIcons name={iconName} size={24} color={color} />;
      }}
    />
  );

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