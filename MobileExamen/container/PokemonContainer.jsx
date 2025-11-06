import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { POKEMON_DATA } from '../data/Pokemon';
import PokemonListItem from '../components/PokemonListItem';

const PokemonContainer = ({ navigation, shinyList, toggleShiny }) => {
  const [search, setSearch] = useState('');

  const filtered = POKEMON_DATA.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokémon Lijst</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Zoek Pokémon..."
        value={search}
        onChangeText={setSearch}
      />

      <FlashList
        data={filtered}
        renderItem={({ item }) => (
          <PokemonListItem
            pokemon={item}
            navigation={navigation}
            isShiny={shinyList.includes(item.pokedex_index)}
            toggleShiny={() => toggleShiny(item.pokedex_index)}
          />
        )}
        estimatedItemSize={80}
        keyExtractor={(item) => item.pokedex_index.toString()}
        contentContainerStyle={{ padding: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 50,
    textAlign: 'center',
  },
  searchInput: {
    height: 40,
    margin: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
});

export default PokemonContainer;
