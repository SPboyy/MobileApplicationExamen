import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TextInput, TouchableOpacity, Text } from 'react-native';
import { POKEMON_DATA } from '../data/Pokemon';
import Header from '../components/Header';
import PokemonListItem from '../components/PokemonListItem';

const PokemonContainer = ({ navigation, favoriteIndices, toggleFavorite }) => {
  const [searchText, setSearchText] = useState('');
  const [activeSort, setActiveSort] = useState({ type: 'name', asc: true }); // standaard naam A→Z

  // Filter Pokémon op naam
  const filteredPokemon = POKEMON_DATA.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Sorteer Pokémon
  const sortedPokemon = [...filteredPokemon].sort((a, b) => {
    if (activeSort.type === 'name') {
      return activeSort.asc
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else {
      return activeSort.asc
        ? a.pokedex_index - b.pokedex_index
        : b.pokedex_index - a.pokedex_index;
    }
  });

  // Pijltjes symbolen
  const arrow = (asc) => (asc ? '↑' : '↓');

  return (
    <View style={styles.container}>
      <Header />

      {/* Zoekbalk */}
      <TextInput
        style={styles.searchInput}
        placeholder="Zoek op naam..."
        value={searchText}
        onChangeText={setSearchText}
        autoCapitalize="none"
        autoCorrect={false}
      />

      {/* Sorteer knoppen */}
      <View style={styles.sortContainer}>
        {/* Naam knop */}
        <TouchableOpacity
          style={[
            styles.sortButton,
            activeSort.type === 'name' && { backgroundColor: '#FFCC00' },
          ]}
          onPress={() => setActiveSort({ type: 'name', asc: !activeSort.asc })}
        >
          <Text style={styles.sortText}>
            Naam {activeSort.type === 'name' ? arrow(activeSort.asc) : '↑↓'}
          </Text>
        </TouchableOpacity>

        {/* Index knop */}
        <TouchableOpacity
          style={[
            styles.sortButton,
            activeSort.type === 'index' && { backgroundColor: '#FFCC00' },
          ]}
          onPress={() => setActiveSort({ type: 'index', asc: !activeSort.asc })}
        >
          <Text style={styles.sortText}>
            Index {activeSort.type === 'index' ? arrow(activeSort.asc) : '↑↓'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Pokémon lijst */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {sortedPokemon.map((pokemon) => (
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
  container: { flex: 1, backgroundColor: '#f0f0f0' },
  searchInput: {
    height: 45,
    margin: 15,
    marginBottom: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginBottom: 10,
  },
  sortButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#fff', // standaard wit
    borderWidth: 1,
    borderColor: '#ccc',
  },
  sortText: { fontSize: 14, fontWeight: 'bold', color: '#333' },
  scrollContent: { padding: 15, paddingTop: 0 },
});

export default PokemonContainer;
