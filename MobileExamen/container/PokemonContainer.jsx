// container/PokemonContainer.jsx

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { POKEMON_DATA } from '../data/Pokemon'; 
import Header from '../components/Header';
import PokemonListItem from '../components/PokemonListItem';

const PokemonContainer = ({ favoriteIndices, toggleFavorite }) => {
  const [pokemonList] = useState(POKEMON_DATA); 

  useEffect(() => {
    console.log("PokemonContainer mounted.");
  }, []); 

  return (
    <View style={styles.container}>
      
      <Header /> 
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {pokemonList.map((pokemon) => (
          <PokemonListItem 
            key={pokemon.pokedex_index} 
            pokemon={pokemon}
            isFavorite={favoriteIndices.includes(pokemon.pokedex_index)} 
            onToggleFavorite={() => toggleFavorite(pokemon.pokedex_index)} 
          />
        ))}

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f0f0f0' 
  },
  scrollContent: { 
    padding: 15, 
    paddingTop: 10, 
  },
});

export default PokemonContainer;