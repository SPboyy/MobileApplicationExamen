// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import PokemonContainer from './container/PokemonContainer'; 
import ProfileContainer from './container/ProfileContainer'; 
import PokemonDetailsScreen from './container/PokemonDetails'; 

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// --- 1. De Stack voor Lijst -> Details ---
const HomeStackNavigator = ({ favoriteIndices, toggleFavorite }) => (
  <Stack.Navigator>
    <Stack.Screen
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
    </Stack.Screen>

    <Stack.Screen
      name="PokemonDetails"
      component={PokemonDetailsScreen}
      options={({ route }) => ({
        title: route.params?.pokemonData?.name?.toUpperCase() || 'DETAILS',
        headerShown: true,
      })}
    />
  </Stack.Navigator>
);

// --- 2. De Tabs: HomeStack + Profiel ---
const TabsComponent = ({ favoriteIndices, toggleFavorite }) => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarActiveTintColor: '#FF0000',
      tabBarInactiveTintColor: 'gray',
      headerShown: false,
      tabBarIcon: ({ color, size }) => {
        let iconName =
          route.name === 'Home' ? 'pokeball' : 'account-circle';
        return (
          <MaterialCommunityIcons name={iconName} size={size} color={color} />
        );
      },
    })}
  >
    <Tab.Screen name="Home" options={{ title: 'Lijst' }}>
      {() => (
        <HomeStackNavigator
          favoriteIndices={favoriteIndices}
          toggleFavorite={toggleFavorite}
        />
      )}
    </Tab.Screen>

    <Tab.Screen name="Profile" options={{ title: 'Profiel' }}>
      {() => <ProfileContainer shinyCount={favoriteIndices.length} />}
    </Tab.Screen>
  </Tab.Navigator>
);

// --- 3. Root App ---
export default function App() {
  const [favoriteIndices, setFavoriteIndices] = React.useState([]);

  const toggleFavorite = (index) => {
    setFavoriteIndices((prevIndices) =>
      prevIndices.includes(index)
        ? prevIndices.filter((i) => i !== index)
        : [...prevIndices, index]
    );
  };

  return (
    <NavigationContainer>
      <TabsComponent
        favoriteIndices={favoriteIndices}
        toggleFavorite={toggleFavorite}
      />
    </NavigationContainer>
  );
}
