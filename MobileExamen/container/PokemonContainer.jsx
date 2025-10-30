import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { POKEMON_DATA } from '../data/Pokemon';
import Header from '../components/Header';
import PokemonListItem from '../components/PokemonListItem';

const PokemonContainer = ({ navigation, favoriteIndices, toggleFavorite }) => {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {POKEMON_DATA.map((pokemon) => (
          <PokemonListItem
            key={pokemon.pokedex_index}
            pokemon={pokemon}
            navigation={navigation}
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
    backgroundColor: '#f0f0f0',
  },
  scrollContent: {
    padding: 15,
  },
});

export default PokemonContainer;
