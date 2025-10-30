// App.js
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Importeer uw containers (Zorg dat ze 'export default' gebruiken)
import PokemonContainer from './container/PokemonContainer'; 
import ProfileContainer from './container/ProfileContainer'; 
import PokemonDetailsScreen from './container/PokemonDetails'; 

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// --- 1. DEFINIEER DE TABS COMPONENT ---
// Dit component beheert de Bottom Tabs (Home en Profile)
// Het ontvangt de state (favorieten) van de App component
const TabsComponent = ({ favoriteIndices, toggleFavorite }) => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: '#FF0000',
                tabBarInactiveTintColor: 'gray',
                headerShown: false, // De Header zit al in PokemonContainer
                tabBarIcon: ({ color, size }) => {
                    let iconName = route.name === 'Home' ? 'pokeball' : 'account-circle';
                    return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                }
            })}
        >
            {/* Home Tab: Rendert de container en geeft de state door */}
            <Tab.Screen name="Home" options={{ title: 'Lijst' }}>
                {(props) => (
                    <PokemonContainer 
                        {...props}
                        favoriteIndices={favoriteIndices}
                        toggleFavorite={toggleFavorite}
                    />
                )}
            </Tab.Screen>
            
            {/* Profile Tab: Rendert de container en geeft de state door */}
            <Tab.Screen name="Profile" options={{ title: 'Profiel' }}>
                 {(props) => (
                    <ProfileContainer 
                        {...props}
                        shinyCount={favoriteIndices.length}
                    />
                )}
            </Tab.Screen>
        </Tab.Navigator>
    );
};

// --- 2. DEFINIEER DE ROOT APP (STACK NAVIGATOR) ---
export default function App() {
  // De state (favorieten) leeft nu in de Root (App.js)
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
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        
        {/* Scherm 1: De Tabs Component (Verbergt de Stack Header) */}
        <Stack.Screen 
          name="HomeTabs"
          options={{ headerShown: false }}
        >
          {/* Geef de state en de functie door aan de TabsComponent */}
          {(props) => (
            <TabsComponent 
              {...props}
              favoriteIndices={favoriteIndices}
              toggleFavorite={toggleFavorite}
            />
          )}
        </Stack.Screen>

        {/* Scherm 2: De Details Pagina (Toont de Stack Header) */}
        <Stack.Screen 
          name="PokemonDetails" 
          component={PokemonDetailsScreen} 
          options={({ route }) => ({ 
            title: route.params?.pokemonData?.name.toUpperCase() || 'DETAILS',
            headerShown: true // Toont de 'terug' knop
          })}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};