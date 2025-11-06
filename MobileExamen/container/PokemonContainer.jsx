import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { POKEMON_DATA } from '../data/Pokemon';
import PokemonListItem from '../components/PokemonListItem';

const PokemonContainer = ({ navigation, shinyList, toggleShiny }) => {
  const [search, setSearch] = useState('');
  const [sortType, setSortType] = useState('name'); // 'name' of 'index'
  const [asc, setAsc] = useState(true); // true = oplopend, false = aflopend

  // Filter Pokémon
  const filtered = POKEMON_DATA.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // Sorteer Pokémon
  const sorted = [...filtered].sort((a, b) => {
    if (sortType === 'name') {
      return asc
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else {
      return asc
        ? a.pokedex_index - b.pokedex_index
        : b.pokedex_index - a.pokedex_index;
    }
  });

  // Hulpfunctie voor pijltje
  const arrow = asc ? '↑' : '↓';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokémon Lijst</Text>

      {/* Zoekveld */}
      <TextInput
        style={styles.searchInput}
        placeholder="Zoek Pokémon..."
        value={search}
        onChangeText={setSearch}
      />

      {/* Sorteerknoppen */}
      <View style={styles.sortContainer}>
        <TouchableOpacity
          style={[
            styles.sortButton,
            sortType === 'name' && { backgroundColor: '#FFCC00' },
          ]}
          onPress={() => {
            if (sortType === 'name') setAsc(!asc);
            else {
              setSortType('name');
              setAsc(true);
            }
          }}
        >
          <Text style={styles.sortText}>
            Naam {sortType === 'name' ? arrow : '↑↓'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.sortButton,
            sortType === 'index' && { backgroundColor: '#FFCC00' },
          ]}
          onPress={() => {
            if (sortType === 'index') setAsc(!asc);
            else {
              setSortType('index');
              setAsc(true);
            }
          }}
        >
          <Text style={styles.sortText}>
            Index {sortType === 'index' ? arrow : '↑↓'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* FlashList */}
      <FlashList
        data={sorted}
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
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  sortText: { fontSize: 14, fontWeight: 'bold', color: '#333' },
});

export default PokemonContainer;
