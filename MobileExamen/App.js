import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import PokemonContainer from './container/PokemonContainer';   // ✅ aangepast pad
import ProfileContainer from './container/ProfileContainer';   // ✅ aangepast pad
import PokemonDetailsScreen from './container/PokemonDetails'; // ✅ aangepast pad

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// 🔹 Stack navigator (Home → Details)
const HomeStackNavigator = ({ shinyList, toggleShiny, setTotalCount }) => (
  <Stack.Navigator>
    <Stack.Screen name="PokemonList" options={{ headerShown: false }}>
      {(props) => (
        <PokemonContainer
          {...props}
          shinyList={shinyList}
          toggleShiny={toggleShiny}
          setTotalCount={setTotalCount}
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

// 🔹 Tabs (Home + Profile)
const TabsComponent = ({ shinyList, toggleShiny, totalCount, setTotalCount }) => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarActiveTintColor: '#FF0000',
      tabBarInactiveTintColor: 'gray',
      headerShown: false,
      tabBarIcon: ({ color, size }) => {
        const icon = route.name === 'Home' ? 'pokeball' : 'account-circle';
        return <MaterialCommunityIcons name={icon} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Home" options={{ title: 'Lijst' }}>
      {() => (
        <HomeStackNavigator
          shinyList={shinyList}
          toggleShiny={toggleShiny}
          setTotalCount={setTotalCount}
        />
      )}
    </Tab.Screen>

    <Tab.Screen name="Profile" options={{ title: 'Profiel' }}>
      {() => <ProfileContainer shinyCount={shinyList.length} totalCount={totalCount} />}
    </Tab.Screen>
  </Tab.Navigator>
);

// 🔹 Root app
export default function App() {
  const [shinyList, setShinyList] = React.useState([]);
  const [totalCount, setTotalCount] = React.useState(0);

  const toggleShiny = (index) => {
    setShinyList((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <NavigationContainer>
      <TabsComponent
        shinyList={shinyList}
        toggleShiny={toggleShiny}
        totalCount={totalCount}
        setTotalCount={setTotalCount}
      />
    </NavigationContainer>
  );
}
