import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import PokemonContainer from './container/PokemonContainer';
import ProfileContainer from './container/ProfileContainer';
import PokemonDetailsScreen from './container/PokemonDetails';

const HomeStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// ✅ We maken een wrapper voor de Home Stack zodat we props kunnen meegeven
const HomeStackWrapper = ({ favoriteIndices, toggleFavorite }) => {
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
          title: route.params?.pokemonData?.name?.toUpperCase() || 'DETAILS',
          headerShown: true,
        })}
      />
    </HomeStack.Navigator>
  );
};

export default function App() {
  const [favoriteIndices, setFavoriteIndices] = React.useState([]);

  const toggleFavorite = (index) => {
    setFavoriteIndices((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: '#FF0000',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            const iconName =
              route.name === 'Home' ? 'pokeball' : 'account-circle';
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          },
        })}
      >
        {/* ✅ HOME TAB */}
        <Tab.Screen
          name="Home"
          options={{ title: 'Lijst' }}
        >
          {() => (
            <HomeStackWrapper
              favoriteIndices={favoriteIndices}
              toggleFavorite={toggleFavorite}
            />
          )}
        </Tab.Screen>

        {/* ✅ PROFILE TAB */}
        <Tab.Screen
          name="Profile"
          options={{ title: 'Profiel' }}
        >
          {() => (
            <ProfileContainer
              shinyCount={favoriteIndices.length}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
