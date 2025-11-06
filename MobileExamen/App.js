import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import PokemonContainer from './container/PokemonContainer';
import PokemonDetails from './container/PokemonDetails';
import ProfileContainer from './container/ProfileContainer';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = ({ shinyList, toggleShiny }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="PokemonList"
      options={{ headerShown: false }}
    >
      {(props) => (
        <PokemonContainer {...props} shinyList={shinyList} toggleShiny={toggleShiny} />
      )}
    </Stack.Screen>

    <Stack.Screen
      name="PokemonDetails"
      component={PokemonDetails}
      options={({ route }) => ({
        title: route.params?.pokemon?.name.toUpperCase() || 'Details',
      })}
    />
  </Stack.Navigator>
);

export default function App() {
  const [shinyList, setShinyList] = useState([]);

  const toggleShiny = (index) => {
    setShinyList((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#FF0000',
          tabBarInactiveTintColor: 'gray',
          tabBarIcon: ({ color, size }) => {
            const icon = route.name === 'Home' ? 'pokeball' : 'account-circle';
            return <MaterialCommunityIcons name={icon} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home">
          {() => <HomeStack shinyList={shinyList} toggleShiny={toggleShiny} />}
        </Tab.Screen>

        <Tab.Screen name="Profiel">
          {() => <ProfileContainer shinyCount={shinyList.length} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
