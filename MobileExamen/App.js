// App.js
import * as React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Constants from 'expo-constants'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import PokemonContainer from './container/PokemonContainer'; 
import ProfileContainer from './container/ProfileContainer'; 
import PokemonDetailsScreen from './container/PokemonDetails'; 

const HomeStack = createNativeStackNavigator();
const initialLayout = { width: Dimensions.get('window').width };

// --- HOME STACK NAVIGATOR (Lijst en Details) ---
const HomeStackNavigator = ({ route }) => {
    // Haal de state en toggle functie uit de route.params
    const { favoriteIndices, toggleFavorite } = route.params; 

    return (
        <HomeStack.Navigator>
            <HomeStack.Screen 
                name="PokemonList" 
                // Geef de state en toggle functie door aan de PokemonContainer
                component={(props) => (
                    <PokemonContainer 
                        {...props} 
                        favoriteIndices={favoriteIndices} 
                        toggleFavorite={toggleFavorite}
                    />
                )}
                options={{ headerShown: false }}
            />
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

// --- Render Scene Functie voor TabView ---
const renderScene = ({ route, navigation }) => {
    const { favoriteIndices, toggleFavorite } = route; 
    
    switch (route.key) {
      case 'homeStack': // Laadt de Stack Navigator (met de lijst)
        return (
            <NavigationContainer independent={true}>
                <HomeStackNavigator route={{ params: { favoriteIndices, toggleFavorite } }} />
            </NavigationContainer>
        );
      case 'profile':
        return (
            <ProfileContainer shinyCount={favoriteIndices.length} />
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
        let iconName;
        if (route.key === 'homeStack') {
          iconName = focused ? 'format-list-bulleted' : 'format-list-bulleted';
        } else if (route.key === 'profile') {
          iconName = focused ? 'account-circle' : 'account-circle-outline';
        }
        return <MaterialCommunityIcons name={iconName} size={24} color={color} />;
    }}
  />
);


export default function App() {
  const [index, setIndex] = React.useState(0);
  const [favoriteIndices, setFavoriteIndices] = React.useState([]); 
  
  // Toggle Functie
  const toggleFavorite = (index) => {
    setFavoriteIndices(prevIndices => {
      if (prevIndices.includes(index)) {
        return prevIndices.filter(i => i !== index);
      } else {
        return [...prevIndices, index];
      }
    });
  };
  
  // Routes array bevat de state en functies
  const [routes] = React.useState([
    { key: 'homeStack', title: 'Lijst', favoriteIndices, toggleFavorite },
    { key: 'profile', title: 'Profiel', favoriteIndices, toggleFavorite },
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